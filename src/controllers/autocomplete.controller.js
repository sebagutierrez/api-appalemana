const models = require('../models/index');



module.exports = {

    getTerminosAutocomplete: async (req, res) => {
        try {
            console.log(req.query.query);
            const query_autocomplete = await models.sequelize.query(

                `SELECT termino_preferido 
                FROM cas_hiba 
                WHERE termino_preferido LIKE '%${req.query.query}%'
                AND tipo_termino = 'Preferido'
                LIMIT 500;`,

                {
                    type: models.QueryTypes.SELECT
                }
            );

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