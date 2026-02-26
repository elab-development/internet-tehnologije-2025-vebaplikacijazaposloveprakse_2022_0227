import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Next Swagger API Example",
      version: "0.1.0",
    },
  },
  apis: ["./src/app/api/**/*.ts"], 
};

export const swaggerSpec = swaggerJsdoc(options);