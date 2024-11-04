// server/models/Reserva.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cancha = require('./Cancha');
const User = require('./User');

const Reserva = sequelize.define('Reserva', {
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    horaInicio: {
        type: DataTypes.TIME,
        allowNull: false
    },
    horaFin: {
        type: DataTypes.TIME,
        allowNull: false
    }
});

Reserva.belongsTo(Cancha, { foreignKey: 'canchaId', allowNull: false });
Reserva.belongsTo(User, { foreignKey: 'userId', allowNull: false });

module.exports = Reserva;