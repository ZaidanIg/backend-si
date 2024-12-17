const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('@hapi/jwt');

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET

const addRegisterAdminHandler = async (request, h) => {
 
  const { username, password } = request.payload;

  try {
    const existingAdmin = await prisma.admin.findUnique({
      where: { username },
    });

    if (existingAdmin) {
      return h.response({ error: 'Username already exists' }).code(409); // 409 Conflict
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await prisma.admin.create({
      data: { username, password: hashedPassword },
    });

    return h.response({ message: 'Admin registered successfully', data: newAdmin }).code(201);
  } catch (error) {
    console.error(error);
    return h.response({ error: 'Failed to register admin' }).code(500);
  }
};


const loginAdminHandler = async (request, h) => {

  const { username, password } = request.payload;

  try {
    const admin = await prisma.admin.findUnique({ where: { username } });

    if (!admin) {
      return h.response({ error: 'Invalid username or password' }).code(401);
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return h.response({ error: 'Invalid username or password' }).code(401);
    }

    const token = jwt.token.generate(
      { id: admin.id, username: admin.username },
      { key: SECRET_KEY, algorithm: 'HS256' }
    );

    console.log('Generated JWT Token:', token);

    return h.response({ message: 'Login successful', token }).code(200);
  } catch (error) {
    console.error(error);
    return h.response({ error: 'Failed to login admin' }).code(500);
  }
};

module.exports = { 
  loginAdminHandler, 
  addRegisterAdminHandler 
};