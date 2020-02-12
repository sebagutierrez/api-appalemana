const Sequelize = require('sequelize');

// TODO: Agregar separación de ambiente
const database = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    dialectOptions: {
      decimalNumbers: true,
    },
    // eslint-disable-next-line no-console
    logging: process.env.SEQUELIZE_LOGGING === 'enabled' ? console.log : false,
  },
);
module.exports = database;
