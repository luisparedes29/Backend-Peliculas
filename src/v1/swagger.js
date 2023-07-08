const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Metadatos sobre nuestra API

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SAL Peliculas',
            version: '1.0.0',
        },
    },
    apis: ['./src/routes/*.js'], // Rutas válidas para tus archivos de definición de rutas
};

// Docs en formato JSON

const swaggerSpec = swaggerJSDoc(options);

// Funcion para generar el Swagger UI
const swaggerDocs = (app, port) => {
    app.use('/routes/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`Swagger Docs en http://localhost:${port}/routes/v1/docs`);
};



module.exports = { swaggerDocs };
