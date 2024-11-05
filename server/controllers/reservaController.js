// server/controllers/reservaController.js
const Reserva = require('server/models/Reserva');
const Cancha = require('server/models/Cancha');
const User = require('server/models/User');

exports.createReserva = async (req, res) => {
    try {
        const { userId, canchaId, fecha, horaInicio, horaFin } = req.body;

        const reserva = await Reserva.create({ userId, canchaId, fecha, horaInicio, horaFin });
        res.status(201).json(reserva);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la reserva' });
    }
};

exports.getReservasByUser = async (req, res) => {
    try {
        const reservas = await Reserva.findAll({ where: { userId: req.params.userId } });
        res.json(reservas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las reservas' });
    }
};

exports.getReservasByCancha = async (req, res) => {
    try {
        const reservas = await Reserva.findAll({ where: { canchaId: req.params.canchaId, fecha: req.query.fecha } });
        res.json(reservas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las reservas' });
    }
};

exports.deleteReserva = async (req, res) => {
    try {
        const reserva = await Reserva.findByPk(req.params.reservaId);
        if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });

        await reserva.destroy();
        res.json({ message: 'Reserva cancelada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al cancelar la reserva' });
    }
};
