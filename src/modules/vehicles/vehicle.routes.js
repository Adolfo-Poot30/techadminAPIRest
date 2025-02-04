const express = require('express');
const router = express.Router();
const { createVehicle, getUserVehicles } = require('./vehicle.controller');
const { authenticateJWT } = require('../../core/middlewares/auth.middleware');

router.post('/create', authenticateJWT, createVehicle);
router.get('/', authenticateJWT, getUserVehicles);

module.exports = { vehicleRouter: router }; 