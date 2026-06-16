import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Definición de la información básica de la API
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API Clínica Médica',
        version: '1.0.0',
        description: 'Documentación oficial de la API REST para el sistema de gestión de la Clínica Médica.',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Servidor de Desarrollo Local'
        }
    ],
    // Configuración para que Swagger sepa que usamos JWT
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            }
        }
    },
    security: [{
        bearerAuth: []
    }]
};

const options = {
    swaggerDefinition,
    // Le decimos a Swagger que lea todos los archivos de rutas para armar la interfaz
    apis: ['./src/routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app) => {
    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('Documentación de Swagger disponible en http://localhost:3000/api/v1/docs');
};