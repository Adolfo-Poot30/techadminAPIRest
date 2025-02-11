const { DataTypes } = require('sequelize');
const sequelize = require('../../core/config/db');
const { Usuario } = require('../users/usuarioModel');

const Automovil = sequelize.define('Automovil', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
            key: 'id'
        }
    }
}, {
    tableName: 'automoviles',
    timestamps: false
});

module.exports = { Automovil };


