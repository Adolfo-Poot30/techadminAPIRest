const { DataTypes } = require('sequelize');
const sequelize = require('../../core/database/connection');
const { Workshop } = require('../workshops/workshop.model');

const Schedule = sequelize.define('Schedule', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  day: {
    type: DataTypes.ENUM('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'),
    allowNull: false
  },
  isClosed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_closed'
  },
  workshopId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Workshop,
      key: 'id'
    },
    field: 'workshop_id'
  },
  timeSlots: {
    type: DataTypes.JSONB,
    defaultValue: [],
    validate: {
      isValidTimeSlots(value) {
        if (!Array.isArray(value)) {
          throw new Error('Los horarios deben ser un array');
        }
        value.forEach(slot => {
          if (!slot.start || !slot.end) {
            throw new Error('Cada horario debe tener start y end');
          }
          if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(slot.start) || 
              !/^([01]\d|2[0-3]):([0-5]\d)$/.test(slot.end)) {
            throw new Error('Formato de hora inválido (usar HH:mm)');
          }
        });
      }
    }
  }
}, {
  tableName: 'schedules',
  timestamps: false
});

module.exports = { Schedule }; 