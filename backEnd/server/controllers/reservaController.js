// server/controllers/reservaController.js
const Reserva = require("../models/Reserva");
const User = require("../models/User");
const Cancha = require("../models/Cancha");
const emailController = require("../controllers/emailController");
const logger = require("../config/logger");

exports.createReserva = async (req, res) => {
  try {
    const { userId, canchaId, fecha, horaInicio, horaFin } = req.body;
    // Fetch user and create reservation logic
    const user = await User.findByPk(userId);
    const field = await Cancha.findByPk(canchaId);
    const reserva = await Reserva.create({
      userId,
      canchaId,
      fecha,
      horaInicio,
      horaFin,
    });

    // Send email
    const emailData = {
      email: user.email,
      subject: "Booking Confirmation",
      message: `Your booking for ${field.nombre} on ${fecha} at ${horaInicio} - ${horaFin} is confirmed.`,
    };

    try {
      await emailController.sendEmailUtil(emailData);
    } catch (emailError) {
      logger.error(
        `Error al enviar el mail de confirmacion a: ${emailError.message}`
      );
    }

    // Respond to client
    res.status(201).json({
      message: "Reserva creada exitosamente.",
      reserva,
    });
  } catch (error) {
    logger.error(`Error creating reservation: ${error.message}`);
    res
      .status(500)
      .json({ message: "Error al crear la reserva", error: error.message });
  }
};

exports.getReservasByUser = async (req, res) => {
  try {
    const reservas = await Reserva.findAll({
      where: { userId: req.params.userId },
    });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las reservas" });
  }
};

exports.getReservasByCancha = async (req, res) => {
  try {
    const reservas = await Reserva.findAll({
      where: { canchaId: req.params.canchaId, fecha: req.query.fecha },
    });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las reservas" });
  }
};

exports.deleteReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findByPk(req.params.reservaId);
    const field = await Cancha.findByPk(reserva.canchaId);
    const user = await User.findByPk(reserva.userId);
    if (!reserva)
      return res.status(404).json({ error: "Reserva no encontrada" });

    await reserva.destroy();

    // Send email
    const emailData = {
      email: user.email,
      subject: "Booking Cancellation",
      message: `Your booking for ${field.nombre} on ${reserva.fecha} at ${reserva.horaInicio} - ${reserva.horaFin} is cancelled.`,
    };

    try {
      await emailController.sendEmailUtil(emailData);
    } catch (emailError) {
      logger.error(
        `Error al enviar el mail de cancelacion a: ${emailError.message}`
      );
    }

    res.json({ message: "Reserva cancelada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al cancelar la reserva" });
  }
};
