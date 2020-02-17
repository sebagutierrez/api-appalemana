const express = require('express');
const router = express.Router();
require('dotenv').config();

const buscarController = require('../controllers/buscar.controller');

/**
 * @swagger
 * /index:
 *    get:
 *      description: Initial endpoint
 */
router.get('/:termino', buscarController.buscarTerminoPreferido);

module.exports = router;
