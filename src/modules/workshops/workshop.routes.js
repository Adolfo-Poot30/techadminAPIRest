const express = require('express');
const router = express.Router();
const { createWorkshop } = require('./workshop.controller');
const { authenticateJWT, isAdmin } = require('../../core/middlewares/auth.middleware');

router.post('/create', authenticateJWT, isAdmin, createWorkshop);

module.exports = { workshopRouter: router };