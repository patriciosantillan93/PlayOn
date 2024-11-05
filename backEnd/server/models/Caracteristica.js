// server/models/Caracteristica.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Caracteristica = sequelize.define('Caracteristica', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

module.exports = Caracteristica;
