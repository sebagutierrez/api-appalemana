const models = require('../models/index');



module.exports = {
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
                    VALUES ('${termino.concept_id_HIBA}', '${termino.termino_preferido}', (select max(id_cohorte) from cohorte));`
                )
            });

        } catch (err) {
            res.status(400).json({ error: err.message });
            console.log("debug");
        }
    }
}