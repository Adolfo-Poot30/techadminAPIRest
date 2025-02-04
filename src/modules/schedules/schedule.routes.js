const express = require('express');
const router = express.Router();
const { createSchedule, getWorkshopSchedules } = require('./schedule.controller');
const { authenticateJWT, isAdmin } = require('../../core/middlewares/auth.middleware');

router.post('/:workshopId/schedules', authenticateJWT, isAdmin, createSchedule);
router.get('/:workshopId/schedules', getWorkshopSchedules);

module.exports = { scheduleRouter: router };