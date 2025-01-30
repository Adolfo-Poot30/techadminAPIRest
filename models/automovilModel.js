const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const { Usuario } = require('./usuarioModel');

const Automovil = sequelize.define('Automovil', {
    Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,  // Genera un UUID automáticamente
        primaryKey: true,
    },
    Modelo: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    Marca: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    Anio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Placas: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false,
    },
    Color: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    IdUsuario: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'Id'
        }
    }
});

module.exports = { Automovil };

