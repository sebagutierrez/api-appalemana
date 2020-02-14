const Sequelize = require('sequelize');

// TODO: Agregar separación de ambiente
const database = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    dialectOptions: {
      decimalNumbers: true,
    },
    // eslint-disable-next-line no-console
    logging: process.env.SEQUELIZE_LOGGING === 'enabled' ? console.log : false,
  }
);
module.exports = database;
