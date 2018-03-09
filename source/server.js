const Hapi = require('hapi');
const Routes = require('./routes');

const server = new Hapi.Server();

server.connection({
  port: 8080,
  host: 'localhost',
});

server.route(Routes);

if (!module.parent) {
  server.start((err) => {
    if (err) {
      throw (err);
    }
    console.log(`Server started at ${server.info.uri}`);
  });
}

module.exports = server;
