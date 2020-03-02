module.exports = (sequelize, DataTypes) => {
    const Concepto = sequelize.define('Concepto', {
        concept_id_HIBA: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.BIGINT,
        },
        termino_preferido: {
            allowNull: true,
            type: DataTypes.STRING(300),
        },
        id_cohorte: {
            allowNull: false,
            primaryKey: true,
            autoincrement: true,
            type: DataTypes.INTEGER,
            references: {
                model: 'Cohorte',
                key: 'id_cohorte'
            }
        }
    }, {
        tableName: 'concepto',
    });

    return Concepto;
};