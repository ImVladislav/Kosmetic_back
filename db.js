const { Sequelize } = require("sequelize");

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

module.exports = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: "mysql", //"mariadb",
  host: DB_HOST,
  port: DB_PORT,
  // dialectOptions: {
  //   charset: "utf8mb4",
  // },
});
