// server/models/Cancha.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Asegúrate de haber importado Sequelize desde database.js en config

const Cancha = sequelize.define('Cancha', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Cancha;