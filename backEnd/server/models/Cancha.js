// server/models/Cancha.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Asegúrate de haber importado Sequelize desde database.js en config

const Cancha = sequelize.define("Cancha", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precioPorHora: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cantJugadores: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dimensiones: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Cancha;
