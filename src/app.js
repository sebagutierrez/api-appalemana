const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('./config/environment');

// Importación de rutas
const indexRouter = require('./routes/index.routes');

// Importación de modulos personalizados
const swaggerUi = require('./core/swagger');

const app = express();

// HABILITA CORS
app.use(cors());

// Middlewares
app.use('/api-docs', swaggerUi.swaggerUi.serve, swaggerUi.swaggerUi.setup(swaggerUi.specs));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

// Declaración de rutas
app.use('/', indexRouter);

module.exports = app;
