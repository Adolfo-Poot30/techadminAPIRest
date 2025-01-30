const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const { Automovil } = require('./automovilModel');
const { Taller } = require('./tallerModel');

const Cita = sequelize.define('Cita', {
    Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,  // Genera un UUID automáticamente
        primaryKey: true,
    },
    Fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    Hora: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    IdAutomovil: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Automovil,
            key: 'Id'
        }
    },
    IdTaller: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Taller,
            key: 'Id'
        }
    }
});

module.exports = { Cita };

