module.exports = (sequelize, DataTypes) => {
    const Termino = sequelize.define('Termino', {
        concept_id_HIBA: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.BIGINT,
        },
        termino_preferido: {
            allowNull: true,
            type: DataTypes.STRING(300),
        }
    }, {
        tableName: 'termino',
    });

    return Termino;
};