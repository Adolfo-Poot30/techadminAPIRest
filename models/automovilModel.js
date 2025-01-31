const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { Usuario } = require('./usuarioModel');

const Automovil = sequelize.define('Automovil', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,  // Genera un UUID automáticamente
        primaryKey: true,
    },
    modelo: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    marca: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    anio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    placas: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    idusuario: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'Id'
        }
    }
}, {
    tableName: 'automoviles',
    timestamps: false
});

module.exports = { Automovil };


