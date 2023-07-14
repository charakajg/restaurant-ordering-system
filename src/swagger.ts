import swaggerJsDoc from 'swagger-jsdoc'

const swaggerOptions: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'User API Information',
    },
    servers: [
      {
        url: 'http://localhost:8080',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          // The name "bearerAuth" is arbitrary and can be anything
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['**/routes/*.ts'], // Path to the API docs
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

export default swaggerDocs
