const express = require('express');
const { authenticate } = require('../../core/middlewares/authMiddleware');
const {createAutomovil} = require('./automovilController');
const router = express.Router();


/**
 *Ruta para crear un automóvil
 *Ruta: POST /api/automoviles
 */
router.post('/register-automovil', authenticate, createAutomovil);


module.exports = router;

