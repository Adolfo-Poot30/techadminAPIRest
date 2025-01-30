const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Taller = sequelize.define('Taller', {
    Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,  // Genera un UUID automáticamente
        primaryKey: true,
    },
    Nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    RazonSocial: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    Direccion: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Correo: {
        type: DataTypes.STRING(100),
        allowNull: false,
    }
});

module.exports = { Taller };

