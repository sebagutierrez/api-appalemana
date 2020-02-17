const models = require('../models/index');

// Barra de búsqueda principal.
// A través de un término, se busca en la tabla cas_hiba el primer término preferido.
// Debe retornar un objeto con arreglos de padres e hijos del término buscado, además del mismo término y sus id.
module.exports = {
    buscarTerminoPreferido: async (req, res) => {
        try {
            const query_termino_preferido = await models.CasHiba.findAll({ // Búsqueda de término preferido.
                attributes: [
                    'termino_preferido',
                    'concept_id_HIBA',
                ],
                where: {
                    termino_preferido: req.params.termino.toUpperCase(),
                    tipo_termino: 'Preferido'
                },
                limit: 1
            });
            if (query_termino_preferido.length === 0) { // Si el arreglo retornado por findAll() está vacío, se retorna el mensaje not found.
                res.json({
                    data: {},
                    message: 'Término no encontrado en la base de datos',
                });
                return;
            } 

            const query_padres_termino_preferido = await models.sequelize.query( //Búsqueda de padres del término preferido

               `SELECT DISTINCT termino_preferido, "concept_id_HIBA" 
                FROM cas_hiba, hiba_snomed, (SELECT DISTINCT padre 
                                            FROM cas_hiba, hiba_snomed, transitiva 
                                            WHERE termino_preferido='${ req.params.termino.toUpperCase() }' 
                                            AND "concept_id_HIBA"="conceptid_HIBA" 
                                            AND "conceptidSN"=hijo 
                                            AND es_directo=true) 
                AS tabla_id_p 
                WHERE padre="conceptidSN" 
                AND "concept_id_HIBA"="conceptid_HIBA" 
                AND tipo_termino='Preferido'`,

                { 
                    type: models.QueryTypes.SELECT 
                }
            );

            const query_hijos_termino_preferido = await models.sequelize.query(

               `SELECT DISTINCT termino_preferido, "concept_id_HIBA" 
                FROM cas_hiba, hiba_snomed, (SELECT DISTINCT hijo
                                             FROM cas_hiba, hiba_snomed, transitiva 
                                             WHERE termino_preferido='${ req.params.termino.toUpperCase() }' 
                                             AND "concept_id_HIBA"="conceptid_HIBA" 
                                             AND "conceptidSN"=padre 
                                             AND es_directo=true) 
                                             AS tabla_id_h 
                WHERE hijo="conceptidSN" 
                AND "concept_id_HIBA"="conceptid_HIBA" 
                AND tipo_termino='Preferido'`,

                {
                    type: models.QueryTypes.SELECT
                }
            );
            
            return res.status(200).json({
                data: {
                    query_padres_termino_preferido,
                    query_termino_preferido,
                    query_hijos_termino_preferido
                },
                message: 'Busqueda realizada correctamente!',
            });
        } catch (error) {
            return res.status(500).json({
                data: {},
                message: error.message,
            });
        }
    }
};
