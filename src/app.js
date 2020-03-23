const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('./config/environment');

// Importación de rutas
const indexRouter = require('./routes/index.routes');
const buscarRouter = require('./routes/buscar.routes');
const cohorteRouter = require('./routes/cohorte.routes');
const autocompleteRouter = require('./routes/autocomplete.routes')

// Importación de modulos personalizados
const swaggerUi = require('./core/swagger');

const app = express();

// HABILITA CORS
app.use(cors());



// Middlewares
app.use('/api-docs', swaggerUi.swaggerUi.serve, swaggerUi.swaggerUi.setup(swaggerUi.specs));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(helmet());

// Declaración de rutas
app.use('/', indexRouter);
app.use('/results', buscarRouter);
app.use('/cohortes', cohorteRouter);
app.use('/autocomplete', autocompleteRouter)

module.exports = app;
