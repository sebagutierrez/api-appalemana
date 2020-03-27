const models = require('../models/index');



module.exports = {

    getCohortes: async (req, res) => {
        try {

            query_cohortes = {};
            query_conceptos = {};

            cohortes = [];

            await models.sequelize.query(

                `SELECT * FROM cohorte 
                ORDER BY id_cohorte DESC;`,

                {
                    type: models.QueryTypes.SELECT
                }
            ).then(cohortes => query_cohortes = cohortes);

            await models.sequelize.query(
                `SELECT * FROM concepto
                ORDER BY termino_preferido ASC;`,
                {
                    type: models.QueryTypes.SELECT
                }
            ).then(conceptos => {
                query_conceptos = conceptos;
                console.log(query_conceptos.length); // el problema es antes de esto
            });

            try {
                query_cohortes.forEach(cohorte => {

                    objetoCohorte = {
                        cohorte: {},
                        conceptos: []
                    };

                    objetoCohorte.cohorte = cohorte;

                    query_conceptos.forEach(concepto => {
                        if (concepto.id_cohorte === cohorte.id_cohorte) {
                            objetoCohorte.conceptos.push(concepto);
                        }
                    });

                    cohortes.push(objetoCohorte);
                });
            } catch (err) {
                console.log(err);
            }

            return res.status(200).json({
                data: {
                    cohortes
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

    getCohorte: async (req, res) => {
        try {

            cohorte = {};
            conceptos = {};

            await models.sequelize.query(

                `SELECT * FROM cohorte 
                WHERE id_cohorte = '${req.query.id_cohorte}';`,

                {
                    type: models.QueryTypes.SELECT
                }
            ).then(data => cohorte = data);

            await models.sequelize.query(
                `SELECT * FROM concepto
                WHERE id_cohorte = '${req.query.id_cohorte}'
                ORDER BY termino_preferido ASC;`,

                {
                    type: models.QueryTypes.SELECT
                }
            ).then(data => conceptos = data);

            return res.status(200).json({
                data: {
                    cohorte,
                    conceptos
                },
                message: 'Cohorte obtenida correctamente!',
            });
        } catch (error) {
            return res.status(500).json({
                data: {},
                message: error.message,
            });
        }
    },

    postCohorte: async (req, res) => {
        try {
            const nombreCohorte = req.body.nombre;

            console.log("req.body.terminos.length = " + req.body.terminos.length); // el problema es despues de esto

            await models.sequelize.query(
                `INSERT INTO cohorte (nombre_cohorte)
                VALUES ('${nombreCohorte}');`,
                {
                    type: models.QueryTypes.INSERT
                }
            );

            req.body.terminos.forEach(async termino => {
                await models.sequelize.query(
                    `INSERT INTO concepto (concept_id_hiba, termino_preferido, id_cohorte)
                    VALUES ('${termino.concept_id_HIBA}', '${termino.termino_preferido}', (SELECT MAX(id_cohorte) FROM cohorte));`,
                    {
                        type: models.QueryTypes.INSERT
                    }
                );
            });

            return res.status(201).json({ message: 'Cohorte agregada correctamente a la base de datos!' });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    removeCohorte: async (req, res) => {
        try {
            const id_cohorte = req.body.id_cohorte;

            await models.sequelize.query(
                `DELETE FROM concepto
                WHERE id_cohorte = ${id_cohorte};`,
                {
                    type: models.QueryTypes.DELETE
                }
            );

            await models.sequelize.query(
                `DELETE FROM cohorte
                WHERE id_cohorte = ${id_cohorte};`,
                {
                    type: models.QueryTypes.DELETE
                }
            );

            return res.status(200).json({ message: 'Cohorte eliminada correctamente desde la base de datos!' })
        } catch {
            return res.status(500).json({ message: error.message });
        }
    },

    updateCohorte: async (req, res) => {
        try {
            req.body.cohorteActual.forEach(async termino => {
                await models.sequelize.query(
                    `INSERT INTO concepto (concept_id_hiba, termino_preferido, id_cohorte)
                    VALUES ('${termino.concept_id_HIBA}', '${termino.termino_preferido}', '${req.body.id_cohorte}')
                    ON CONFLICT DO NOTHING;`,

                    {
                        type: models.QueryTypes.UPDATE
                    }
                )
                console.log(termino);
            });

            return res.status(201).json({ message: 'Cohorte modificada exitosamente!' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    modifyNombreCohorte: async (req, res) => {
        try {
            console.log(req.body);

            await models.sequelize.query(
                `UPDATE cohorte 
                SET nombre_cohorte = '${req.body.nombreCohorte}' 
                WHERE id_cohorte = '${req.body.id_cohorte}';`,

                {
                    type: models.QueryTypes.UPDATE
                }
            );

            return res.status(201).json({ message: 'Nombre de cohorte modificado exitosamente!' });
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    },

    modifyConceptosCohorte: async (req, res) => {
        try {

            req.body.arrayConceptos.forEach(async concepto => {

                if (concepto.checked == false) {
                    await models.sequelize.query(
                        `DELETE FROM concepto
                        WHERE id_cohorte = '${concepto.id_cohorte}'
                        AND concept_id_HIBA = '${concepto.concept_id_hiba}';`,

                        {
                            type: models.QueryTypes.DELETE
                        }
                    );

                    console.log("concepto removed --> " + concepto.termino_preferido);
                }
            });

            return res.status(201).json({ message: 'Conceptos de la cohorte modificados exitosamente!' });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}