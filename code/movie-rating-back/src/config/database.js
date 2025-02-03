const { Sequelize } = require("sequelize");
require("dotenv").config();

// Use a different database for testing
const dbPath =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_DB_PATH
    : process.env.DB_PATH;

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: dbPath,
  logging: false, // Disable logging to keep test output clean
});

module.exports = sequelize;
