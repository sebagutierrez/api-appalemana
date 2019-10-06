const express = require('express');
const router = express.Router();
require('dotenv').config();

/**
 * @swagger
 * /index:
 *    get:
 *      description: Initial endpoint
 */
router.get('/', (req, res) => {
  return res.status(200).json({
    message: `API Boilerplate ${process.env.API_VERSION}`,
    currentLang: 'es_CL',
  });
});

module.exports = router;
