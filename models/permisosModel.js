const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Permiso = sequelize.define('Permiso', {
    Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,  // Genera un UUID automáticamente
        primaryKey: true,
    },
    Titulo: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    Descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
});

module.exports = { Permiso };

