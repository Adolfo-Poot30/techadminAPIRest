const { DataTypes } = require('sequelize');
const { sequelize } = require('../../core/config/db');
const  Taller  = require('../garages/tallerModel');

const Servicio = sequelize.define('Servicio', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,  // Genera un UUID automáticamente
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    idtaller: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Taller,
            key: 'Id'
        }
    }
}, {

    tableName: 'servicios',
    timestamps: false

});

module.exports = { Servicio };
