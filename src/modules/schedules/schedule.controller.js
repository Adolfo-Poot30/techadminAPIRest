const { Schedule } = require('./schedule.model');

const createSchedule = async (req, res) => {
  try {
    const { workshopId } = req.params;
    const { day, timeSlots, isClosed } = req.body;

    if (isClosed && timeSlots?.length > 0) {
      return res.status(400).json({
        error: 'No se pueden agregar horarios si el día está cerrado'
      });
    }

    const scheduleData = {
      day,
      timeSlots: isClosed ? [] : timeSlots,
      isClosed,
      workshopId
    };

    const newSchedule = await Schedule.create(scheduleData);
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(400).json({
      error: 'Error creando horario',
      details: error.errors?.map(e => e.message) || error.message
    });
  }
};

const getWorkshopSchedules = async (req, res) => {
  try {
    const { workshopId } = req.params;
    const schedules = await Schedule.findAll({
      where: { workshopId },
      order: [['day', 'ASC']]
    });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo horarios' });
  }
};

module.exports = { createSchedule, getWorkshopSchedules }; 