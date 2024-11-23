// server/controllers/canchaController.js
const Cancha = require("../models/Cancha");

exports.getAllCanchas = async (req, res) => {
  try {
    const canchas = await Cancha.findAll();
    res.json(canchas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las canchas" });
  }
};

exports.getCanchaById = async (req, res) => {
  try {
    const cancha = await Cancha.findByPk(req.params.canchaId);
    if (!cancha) return res.status(404).json({ error: "Cancha no encontrada" });
    res.json(cancha);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la cancha" });
  }
};

exports.createCancha = async (req, res) => {
  try {
    const {
      nombre,
      tipo,
      imagen,
      descripcion,
      precioPorHora,
      cantJugadores,
      dimensiones,
    } = req.body;
    const nuevaCancha = await Cancha.create({
      nombre,
      tipo,
      imagen,
      descripcion,
      precioPorHora,
      cantJugadores,
      dimensiones,
    });
    res.status(201).json(nuevaCancha);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la cancha" });
  }
};

exports.updateCancha = async (req, res) => {
  try {
    const cancha = await Cancha.findByPk(req.params.canchaId);
    if (!cancha) return res.status(404).json({ error: "Cancha no encontrada" });

    const { nombre, ubicacion, tipo } = req.body;
    cancha.nombre = nombre;
    await cancha.save();
    res.json(cancha);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la cancha" });
  }
};

exports.deleteCancha = async (req, res) => {
  try {
    const cancha = await Cancha.findByPk(req.params.canchaId);
    if (!cancha) return res.status(404).json({ error: "Cancha no encontrada" });

    await cancha.destroy();
    res.json({ message: "Cancha eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la cancha" });
  }
};
