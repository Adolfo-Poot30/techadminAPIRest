const express = require('express');
const {createAutomovil} = require('./automovilController');
const router = express.Router();


/**
 *Ruta para crear un automóvil
 *Ruta: POST /api/automoviles
 */
router.post('/register-automovil', createAutomovil);


module.exports = router;

