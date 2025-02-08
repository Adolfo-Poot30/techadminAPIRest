const { DataTypes } = require('sequelize');
const  sequelize  = require('../config/db');
const { Automovil } = require('./automovilModel');
const { Taller } = require('./tallerModel');

const Cita = sequelize.define('Cita', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,  // Genera un UUID automáticamente
        primaryKey: true,
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    idautomovil: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Automovil,
            key: 'id'
        }
    },
    idtaller: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Taller,
            key: 'id'
        }
    }
}, {

    tableName: 'citas',
    timestamps: false

});

module.exports = { Cita };

