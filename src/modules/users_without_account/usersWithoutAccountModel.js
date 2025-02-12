const { Sequelize, DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid'); 
const sequelize = require('../../core/config/db');  
const Taller = require('../garages/tallerModel');

const ClienteSinCuenta = sequelize.define('ClienteSinCuenta', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    idtaller: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Taller,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    nombres: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    apellidos: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    descripcion_auto: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'clientesincuenta',
    timestamps: false
});

module.exports = {ClienteSinCuenta};
