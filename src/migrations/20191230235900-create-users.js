module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'users',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fb_uid: {
        type: Sequelize.STRING(150),
        allowNull: false,
        defaultValue: '',
      },
      name: {
        type: Sequelize.STRING(80),
        allowNull: false,
        defaultValue: '',
      },
      lastname_f: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: '',
      },
      lastname_m: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: '',
      },
      is_enabled: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    },
    { charset: 'utf8' },
  ),
  down: (queryInterface) => queryInterface.dropTable('users'),
};
