const models = require('../models/index');



module.exports = {

    getTerminosAutocomplete: async (req, res) => {
        try {

            const arrayWords = req.query.query.split(" ");
            var query = "";

            // Si el input tiene más de una palabra.
            if (arrayWords.length > 1) {

                query =

                    `SELECT termino_preferido 
                    FROM cas_hiba 
                    WHERE termino_preferido LIKE '%${arrayWords[0]}%'`;

                var endOfQuery =

                    `AND tipo_termino = 'Preferido'
                    LIMIT 500;`;

                var iteration = 0;

                arrayWords.forEach(function buildQuery(word) {
                    // Si no es la primera palabra del arreglo ni la palabra es white space(s).
                    if (iteration > 0 && word.trim() != '') {
                        query = query + `AND termino_preferido LIKE '%${word}%'`;
                    }
                    iteration++;
                });

                query = query + endOfQuery;

            } else if (arrayWords.length == 0) {

                query =

                    `SELECT termino_preferido 
                    FROM cas_hiba 
                    WHERE termino_preferido LIKE '%${arrayWords[0]}%'
                    AND tipo_termino = 'Preferido'
                    LIMIT 500;`;

            }

            const query_autocomplete = await models.sequelize.query(query, { type: models.QueryTypes.SELECT });

            return res.status(200).json({
                query_autocomplete
            });
        } catch {
            return res.status(500).json({
                message: error.message,
            });

        }
    }
}