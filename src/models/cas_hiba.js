module.exports = (sequelize, DataTypes) => {
    const CasHiba = sequelize.define('CasHiba', {
        concepto_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT,
        },
        description_nombre: {
            allowNull: true,
            type: DataTypes.STRING(300),            
        },
        description_id: {
            allowNull: false,
            type: DataTypes.BIGINT,
        },
        concept_id_HIBA: {
            allowNull: false,
            type: DataTypes.BIGINT,
        },
        tipo_termino: {
            allowNull: true,
            type: DataTypes.STRING(300),
        },
        termino_preferido: {
            allowNull: true,
            type: DataTypes.STRING(300),
        },
    }, {
        tableName: 'cas_hiba',
    });

    return CasHiba;
};