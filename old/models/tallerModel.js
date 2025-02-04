const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { Horario } = require('./horarioModel');

const Taller = sequelize.define('Taller', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,  // Genera un UUID automáticamente
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'nombre'
    },
    razonsocial: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    direccion: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING(100),
        allowNull: false,
    }
}, {
    tableName: 'taller',
    timestamps: false
});

Taller.belongsTo(Horario, { foreignKey: 'idhorario', as: 'horario' });

module.exports = { Taller };


