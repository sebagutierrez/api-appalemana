// Junction table entre cohorte y termino.

module.exports = (sequelize, DataTypes) => {
    const CohorteTermino = sequelize.define('CohorteTermino', {
        id_cohorte: {
            allowNull: false,
            autoincrement: true,
            type: DataTypes.INTEGER,
            references: {
                model: 'Cohorte',
                key: 'id_cohorte'
            }
        },
        concept_id_HIBA: {
            allowNull: false,
            type: DataTypes.BIGINT,
            references: {
                model: 'Termino',
                key: 'concept_id_HIBA'
            }
        }
    }, {
        tableName: 'cohorte_termino',
    });

    return CohorteTermino;
};