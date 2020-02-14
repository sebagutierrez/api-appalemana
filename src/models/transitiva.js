module.exports = (sequelize, DataTypes) => {
    const Transitiva = sequelize.define('Transitiva', {
        hijo: {
            allowNull: false,
            type: DataTypes.BIGINT,
        },
        padre: {
            allowNull: false,
            type: DataTypes.BIGINT,
        },
        es_directo: {
            allowNull: true,
            type: DataTypes.BOOLEAN
        }
    }, {
        tableName: 'transitiva',
    });

    return Transitiva;
};