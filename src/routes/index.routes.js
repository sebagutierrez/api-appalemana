const express = require('express');
const router = express.Router();
require('dotenv').config();

const indexController = require('../controllers/index.controller').controlador_prueba;

/**
 * @swagger
 * /index:
 *    get:
 *      description: Initial endpoint
 */
router.get('/', indexController.list);

module.exports = router;
