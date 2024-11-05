
// server/routes/reservaRoutes.js
const express = require('express');
const { createReserva, getReservasByUser, getReservasByCancha, deleteReserva } = require('../controllers/reservaController');
const router = express.Router();

router.post('/', createReserva);
router.get('/usuario/:userId', getReservasByUser);
router.get('/cancha/:canchaId', getReservasByCancha);
router.delete('/:reservaId', deleteReserva);

module.exports = router;