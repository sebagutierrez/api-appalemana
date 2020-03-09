const models = require('../models/index');



module.exports = {

    getCohortes: async (req, res) => {
        try {
            const query_cohortes = await models.sequelize.query(

                `SELECT * FROM cohorte 
                ORDER BY id_cohorte DESC;`,

                {
                    type: models.QueryTypes.SELECT
                }
            );

            const query_conceptos = await models.sequelize.query(
                `SELECT * FROM concepto
                ORDER BY termino_preferido ASC;`,
                {
                    type: models.QueryTypes.SELECT
                }
            )

            return res.status(200).json({
                data: {
                    query_cohortes,
                    query_conceptos
                },
                message: 'Cohortes obtenidas correctamente!',
            });
        } catch {
            return res.status(500).json({
                data: {},
                message: error.message,
            });

        }
    },

    postCohorte: async (req, res) => {
        try {
            const nombreCohorte = req.body.nombre;

            await models.sequelize.query(
                `INSERT INTO cohorte (nombre_cohorte)
                VALUES ('${nombreCohorte}');`,
                {
                    type: models.QueryTypes.INSERT
                }
            )

            req.body.terminos.forEach(async termino => {
                await models.sequelize.query(
                    `INSERT INTO concepto (concept_id_hiba, termino_preferido, id_cohorte)
                    VALUES ('${termino.concept_id_HIBA}', '${termino.termino_preferido}', (SELECT MAX(id_cohorte) FROM cohorte));`
                ),
                {
                    type: models.QueryTypes.INSERT
                }
            });

            return res.status(200).json({ message: 'Cohorte agregada correctamente a la base de datos!' });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}