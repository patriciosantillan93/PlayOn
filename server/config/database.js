// server/config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql', // Para MySQL o MariaDB
        logging: false,
    }
);

// Probar conexión
sequelize.authenticate()
    .then(() => console.log('Conexión exitosa a la base de datos'))
    .catch(error => console.error('Error al conectar con la base de datos:', error));

module.exports = sequelize;