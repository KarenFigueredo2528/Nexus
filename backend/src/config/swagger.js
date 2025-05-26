// src/config/swagger.js
import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API de Nómina",
    version: "1.0.0",
    description: "Documentación Swagger del sistema de nómina",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Servidor local",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/modules/**/*.js"], // Ajusta a tu estructura
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
