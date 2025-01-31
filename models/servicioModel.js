const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const  Taller  = require('./tallerModel');

const Servicio = sequelize.define('Servicio', {
    Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,  // Genera un UUID automáticamente
        primaryKey: true,
    },
    Nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    Descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
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

module.exports = { Servicio };

