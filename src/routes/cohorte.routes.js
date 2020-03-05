const express = require('express');
const router = express.Router();
require('dotenv').config();

const cohorteController = require('../controllers/cohorte.controller');

/**
 * @swagger
 * /index:
 *    get:
 *      description: Initial endpoint
 */
router.post('/new', cohorteController.postCohorte);

module.exports = router;
