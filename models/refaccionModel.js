const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const { Taller } = require('./tallerModel');

const Refaccion = sequelize.define('Refaccion', {
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
    PrecioCompra: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    PrecioVenta: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    Cantidad: {
        type: DataTypes.INTEGER,
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

module.exports = { Refaccion };

