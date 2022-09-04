const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const db = new Sequelize(
  process.env.DB_SCHEMA || "postgres",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "Jackobo97.",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: process.env.DB_SSL == "true",
    },
  }
);

module.exports = { db };
