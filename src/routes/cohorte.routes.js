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

router.get('', cohorteController.getCohortes);
router.post('/new', cohorteController.postCohorte);
router.delete('/delete', cohorteController.removeCohorte);


module.exports = router;