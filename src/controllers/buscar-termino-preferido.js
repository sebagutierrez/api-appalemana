const { CasHiba } = require('../models');

// Barra de búsqueda principal.
// A través de un término, se busca en la tabla cas_hiba el primer término preferido.
// Debe retornar un objeto con arreglos de padres e hijos del término buscado, además del mismo término y sus id.
module.exports = {
  async buscar_termino_preferido(req, res) {
    try {
      const query_termino_preferido = await CasHiba.findAll({
        attributes: [
          'termino_preferido',
          'concept_id_HIBA',
        ],
        where: {
          termino_preferido: req.params.termino.toUpperCase(),
        },
        limit: 1,
      });
      if (query_termino_preferido.length === 0) { // Si el arreglo retornado por findAll() está vacío, se retorna el mensaje not found.
        res.json({
          data: {},
          message: 'Término no encontrado en la base de datos',
        });
        return;
      }
      res.json({
        data: [query_termino_preferido],
        message: 'Busqueda realizada correctamente!',
      });
    } catch (error) {
      res.json({
        data: {},
        message: error,
      });
    }
  },
};
