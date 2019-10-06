const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const options = {
  swaggerDefinition: {
    info: {
      title: process.env.SWAGGER_TITLE,
      version: process.env.SWAGGER_VERSION,
      description: process.env.SWAGGER_DESCRIPTION,
    },
  },
  basePath: '/',
  apis: ['src/routes/index.routes.js', 'src/routes/users.routes.js'],
};
const specs = swaggerJsdoc(options);

module.exports.specs = specs;
module.exports.swaggerUi = swaggerUi;
