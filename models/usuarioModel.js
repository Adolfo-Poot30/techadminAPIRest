const { Sequelize, DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid'); 

const sequelize = require('../config/db');  

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.UUID,
        defaultValue: ()=> uuidv4(),
        primaryKey: true
    },
    nombres: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idroles: {
        type: DataTypes.UUID,
        allowNull: false
    },
    idpermisos: {
        type: DataTypes.UUID,
        allowNull: false
    },
    idtaller: {
        type: DataTypes.UUID,
        allowNull: true
    }
}, {
    tableName: 'usuarios',
    timestamps: false
});

module.exports = { Usuario };

