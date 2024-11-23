// server/controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registro de usuario
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Usuario ya registrado" });
    }

    // Crear nuevo usuario
    const user = await User.create({ username, email, password });
    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    res.status(500).json({
      error: "Error al registrar usuario",
      details: error.message, // Mensaje del error
      stack: error.stack, // Rastreo del error (útil para depuración)
    });
  }
};

// Inicio de sesión
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Intento de inicio de sesión con:", email);

  try {
    // Buscar el usuario por email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    // Crear token JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("Token generado:", token);
    res.json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user.id,
        name: user.username, // Or whatever field you want
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};
