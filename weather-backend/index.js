const Hapi = require('hapi');
const config = require('./config/config.json');
const routes = require('./routes/routes');


const server = Hapi.server({
    host: config.application.host,
    port: config.application.port,
    routes: {
        cors: true,
        json: {
            space: 4
        }
    }
});

for (var route in routes) {
    server.route(routes[route]);
}

async function start() {
    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
    console.log('Server running at:', server.info.uri);
};

start();