require('dotenv').config();
const Hapi = require('@hapi/hapi');
const routes = require('./routes/routes.js')
const jwt = require('@hapi/jwt');


const init = async () => {
    const server = Hapi.server({
        port:5000,
        host:'localhost',
        routes: {
          cors: {
            origin: [ '*' ]
          }
        }
    });

    await server.register(jwt);

    server.auth.strategy('jwt', 'jwt', {
        keys: process.env.JWT_SECRET,
        validate: async (decoded) => {
          return { isValid: true, credentials: decoded };
        },
        verify: {
          aud: false,
          iss: false,
          sub: false,
        },
      });

    server.auth.default('jwt')

    server.route(routes);

    await server.start();
    console.log('Server running on %s', server.info.uri);

};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
  });
  
  init();

