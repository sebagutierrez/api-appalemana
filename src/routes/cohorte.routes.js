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
router.get('/get', cohorteController.getCohorte);
router.post('/new', cohorteController.postCohorte);
router.delete('/delete', cohorteController.removeCohorte);
router.patch('/patch', cohorteController.updateCohorte);


module.exports = router;
