// server/index.js
const express = require('express');
const cors = require('cors');


require('dotenv').config();

const sequelize = require('server/config/database');
const authRoutes = require('server/routes/authRoutes');
const canchaRoutes = require('server/routes/canchaRoutes');
const reservaRoutes = require('server/routes/reservaRoutes');

const Cancha = require('server/models/Cancha'); 
const Reserva = require('server/models/Reserva'); 
const User = require('server/models/User'); 

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes); 
app.use('/canchas', canchaRoutes);
app.use('/reservas', reservaRoutes);

// Sincronizar modelos con la base de datos
sequelize.sync()
    .then(() => console.log('Modelos sincronizados con la base de datos'))
    .catch(error => console.error('Error al sincronizar modelos:', error));

// Rutas
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

// Ruta para obtener todas las canchas
app.get('/canchas', async (req, res) => {
    try {
        const canchas = await Cancha.findAll();
        res.json(canchas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener canchas' });
    }
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
