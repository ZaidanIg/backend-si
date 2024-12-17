const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addAspirationHandler = async (request, h) => {
  const { nama, kelas, prodi, deskripsi } = request.payload;

  try {
    const aspiration = await prisma.aspirasi.create({
      data: { nama, kelas, prodi, deskripsi },
    });

    return h.response(aspiration).code(201);
  } catch (error) {
    console.error(error);
    return h.response({ error: 'Failed to create aspiration' }).code(500);
  }
};

const getAllAspirationHandler = async (request, h) => {
  try {
    const aspirations = await prisma.aspirasi.findMany();
    return h.response(aspirations).code(200);
  } catch (error) {
    console.error(error);
    return h.response({ error: 'Failed to retrieve aspirations' }).code(500);
  }
};

const deleteAspirationHandler = async (request, h) => {
  const { id } = request.params;

  try {
    await prisma.aspirasi.delete({ where: { id: parseInt(id, 10) } });
    return h.response({ message: 'Aspiration deleted successfully' }).code(200);
  } catch (error) {
    console.error(error);
    return h.response({ error: 'Failed to delete aspiration' }).code(500);
  }
};

module.exports = {
  addAspirationHandler,
  getAllAspirationHandler,
  deleteAspirationHandler,
};
