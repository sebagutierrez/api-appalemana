/* BORRAR ESTO*/


const CasHiba = require('../models').CasHiba;
const HibaSnomed = require('../models').HibaSnomed;
const Transitiva = require('../models').Transitiva;

module.exports = {
    async list(req, res) {
        try {
            const cas_hiba_table = await CasHiba.findAll({
                attributes: ['concepto_id', 'description_nombre', 'description_id', 'concept_id_HIBA', 'tipo_termino', 'termino_preferido'],
                limit: 20
            });
            const hiba_snomed_table = await HibaSnomed.findAll({
                attributes: ['description_id', 'conceptid_HIBA', 'description_preferido_id', 'description_preferido', 'conceptidSN', 'descripcionConceptoSN'],
                limit:20
            });
            const transitiva_table = await Transitiva.findAll({
                attributes: ['hijo', 'padre', 'es_directo'],
                limit:20
            });
            res.json({
                data: [cas_hiba_table, hiba_snomed_table, transitiva_table]
            })
        } catch (error) {
            res.json({
                data: {},
                message: error
            })
        };
    }   
}