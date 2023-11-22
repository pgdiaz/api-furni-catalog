const swaggerJSDoc = require('swagger-jsdoc');
const config = require('./appConfig.json');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de catálogo de productos',
            version: '1.0.0',
            description: 'API para gestionar un catálogo de productos'
        },
        servers: [
            {
                url: `http://localhost:${config.server.port}/api/v1`,
                description: 'Development Server',
            },
        ],
        components: {
            schemas: {
                Producto: {
                    type: 'object',
                    properties: {
                        nombre: { type: 'string', example: 'Butaca Nórdica' },
                        descripcion: { type: 'string', example: 'Un diseño para el confort. Esta butaca está construida con maderas estacionadas, cinchas y resortes, garantiza su durabilidad y resistencia. Cuenta con una placa de supersoft de densidad variable que se adapta al confort de cada persona.  Las patas son de madera maciza, aportan calidez al diseño. En cuanto a los materiales de tapizado, son a elección del cliente, permitiendo seleccionar tejidos y tonos para  personalizarla según su estilo y decoración.' },
                        precio: { type: 'number', format: 'double', minimum: 0, example: 25600.51 },
                        marca: { type: 'string', example: 'Maverik' },
                        stock: { type: 'integer', minimum: 0, example: 45 }
                    },
                    required: ['nombre', 'descripcion', 'precio', 'marcar', 'stock'],
                },
                Comparador: {
                    type: 'string',
                    description: 'Operador de comparación',
                    default: 'EQ',
                    enum: ['LT', 'LTE', 'GT', 'GTE', 'EQ'],
                },
                Error: {
                    type: 'object',
                    properties: {
                        fecha: { type: 'string', format: 'date-time', example: '2023-09-01T13:49:17.151+00:00' },
                        error: { type: 'string', example: 'La solicitud no es correcta' }
                    },
                    required: ['fecha', 'mensaje'],
                },
            },
            securitySchemes: {
                bearerAuth: {
                    type: 'apiKey',
                    name: 'Authorization',
                    in: 'header',
                },
            },
        },
    },
    apis: ['./src/routers/*.js']
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = swaggerDocs;
