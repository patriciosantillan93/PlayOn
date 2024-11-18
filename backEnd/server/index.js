// server/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const canchaRoutes = require('./routes/canchaRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const emailRoutes = require('./routes/emailRoutes');

const Cancha = require('./models/Cancha'); 
const Reserva = require('./models/Reserva'); 
const User = require('./models/User'); 

const app = express();

// Log incoming requests (This should be placed before the routes)
app.use((req, res, next) => {
    console.log(`${req.method} request made to: ${req.url}`);
    next(); // Continue processing the request
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes); 
app.use('/canchas', canchaRoutes);
app.use('/reservas', reservaRoutes);
app.use('/email', emailRoutes); // Usar la ruta de email

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
