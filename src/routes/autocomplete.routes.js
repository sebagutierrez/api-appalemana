const express = require('express');
const router = express.Router();
require('dotenv').config();

const autocompleteController = require('../controllers/autocomplete.controller');

/**
 * @swagger
 * /index:
 *    get:
 *      description: Initial endpoint
 */
router.get('/', autocompleteController.getTerminosAutocomplete);

module.exports = router;