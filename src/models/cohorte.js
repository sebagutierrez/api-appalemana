module.exports = (sequelize, DataTypes) => {
    const Cohorte = sequelize.define('Cohorte', {
        id_cohorte: {
            allowNull: false,
            primaryKey: true,
            autoincrement: true,
            type: DataTypes.INTEGER,
        }
    }, {
        tableName: 'cohorte',
    });

    return Cohorte;
};