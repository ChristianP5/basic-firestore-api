const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const dotenv = require('dotenv');

dotenv.config();

const init = async () => {
    const server = Hapi.server({
        host: 'localhost',
        port: 9000,
    })

    server.ext('onPreResponse', (request, h)=>{
        const response = request.response;

        if(response instanceof Error){
            console.error(response.stack);
        }

        return h.continue;
    })

    server.route(routes);

    await server.start();
    console.log(`Server Started at ${server.info.uri}`);
}

init();