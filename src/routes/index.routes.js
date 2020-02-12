const express = require('express');
const router = express.Router();
require('dotenv').config();

const indexController = require('../controllers/index.controller');

/**
 * @swagger
 * /index:
 *    get:
 *      description: Initial endpoint
 */
router.get('/', indexController.index);

module.exports = router;
