// server/routes/canchaRoutes.js
const express = require('express');
const { getAllCanchas, getCanchaById, createCancha, updateCancha, deleteCancha } = require('../controllers/canchaController');
const router = express.Router();

router.get('/', getAllCanchas);
router.get('/:canchaId', getCanchaById);
router.post('/', createCancha);
router.put('/:canchaId', updateCancha);
router.delete('/:canchaId', deleteCancha);

module.exports = router;
