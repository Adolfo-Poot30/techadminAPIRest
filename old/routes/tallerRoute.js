const express = require('express');
const { getTalleres } = require('../controllers/tallerController');
const router = express.Router();

// Ruta para obtener talleres con paginación
// GET /api/talleres?page=2&limit=5

router.get('/', getTalleres);

module.exports = router;

