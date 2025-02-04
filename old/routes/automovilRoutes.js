const express = require('express');
const { authenticate } = require('../middlewares/authMiddleware');
const {createAutomovil} = require('../controllers/automovilController');
const router = express.Router();


/**
 *Ruta para crear un automóvil
 *Ruta: POST /api/automoviles
 */
router.post('/register-automovil', authenticate, createAutomovil);


module.exports = router;

