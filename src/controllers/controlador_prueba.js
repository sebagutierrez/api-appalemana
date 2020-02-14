const CasHiba = require('../models').CasHiba;
const HibaSnomed = require('../models').HibaSnomed;
const Transitiva = require('../models').Transitiva;

/*
const conceptosIds = await CasHiba.findAll({
    limit: 50,
});
*/


module.exports = {
    list(req, res) {
        return CasHiba.findAll({
            include: [{
                model: HibaSnomed,
                as: 'hiba_snomed'
                }, {
                model: Transitiva,
                as: 'transitiva'
                }],
        })
        .then((students) => res.status(200).send(students))
        .catch((error) => { res.status(400).send(error); });   
    }   
}


