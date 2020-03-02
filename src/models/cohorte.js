module.exports = (sequelize, DataTypes) => {
    const Cohorte = sequelize.define('Cohorte', {
        id_cohorte: {
            allowNull: false,
            primaryKey: true,
            autoincrement: true,
            type: DataTypes.INTEGER,
        },
        nombre_cohorte: {
            allowNull: false,
            type: DataTypes.STRING(150)
        }
    }, {
        tableName: 'cohorte',
    });

    return Cohorte;
};