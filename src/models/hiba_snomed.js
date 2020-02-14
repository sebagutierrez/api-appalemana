module.exports = (sequelize, DataTypes) => {
    const HibaSnomed = sequelize.define('HibaSnomed', {
        description_id: {
            allowNull: false,
            type: DataTypes.BIGINT,
        },
        conceptid_HIBA: {
            allowNull: false,
            type: DataTypes.BIGINT,
        },
        description_preferido_id: {
            allowNull: false,
            type: DataTypes.BIGINT,
        },
        description_preferido: {
            allowNull: true,
            type: DataTypes.STRING(300),
        },
        conceptidSN: {
            allowNull: false,
            type: DataTypes.BIGINT,
        },
        descripcionConceptoSN: {
            allowNull: true,
            type: DataTypes.STRING(300),
        },
    }, {
        tableName: 'hiba_snomed',
    });

    return HibaSnomed;
};