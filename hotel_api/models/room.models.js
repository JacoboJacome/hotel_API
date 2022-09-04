const { DataTypes } = require("sequelize");
const { db } = require("../utils/database");

const Room = db.define(
  "room",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    details: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(),
      defaultValue: "available",
    },
  },
  { timestamps: false }
);

module.exports = { Room };
