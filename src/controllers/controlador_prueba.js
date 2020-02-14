const CasHiba = require('../models').CasHiba;
const HibaSnomed = require('../models').HibaSnomed;
const Transitiva = require('../models').Transitiva;

/*
const conceptosIds = await CasHiba.findAll({
    limit: 50,
});
*/


module.exports = {
    async list(req, res) {
        try {
            const cas_hiba_table = await CasHiba.findAll({
                attributes: ['concepto_id', 'description_nombre', 'description_id', 'concept_id_HIBA', 'tipo_termino', 'termino_preferido'],
                limit: 10
            });
            res.json({
                data: cas_hiba_table
            })
        } catch (error) {
            res.json({
                data: {},
                message: error
            })
        };
    }   
}


