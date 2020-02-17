const express = require('express');
const router = express.Router();
require('dotenv').config();

const indexController = require('../controllers/index.controller').buscar_termino_preferido;

/**
 * @swagger
 * /index:
 *    get:
 *      description: Initial endpoint
 */
router.get('/search/:termino', indexController.buscar_termino_preferido);

module.exports = router;
