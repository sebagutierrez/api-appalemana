require('dotenv').config();
module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST_SEQUELIZE,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql',
  },
};
