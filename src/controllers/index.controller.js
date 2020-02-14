/*
module.exports = {
  index: (req, res) => {
    return res.status(200).json({
      message: `API Boilerplate ${process.env.API_VERSION}`,
      currentLang: 'es_CL',
    });
  },
};
*/

const controlador_prueba = require('./controlador_prueba');

module.exports = {
  controlador_prueba,
};