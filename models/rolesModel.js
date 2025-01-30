const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Rol = sequelize.define('Rol', {
    Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,  // Genera un UUID automáticamente
        primaryKey: true,
    },
    Titulo: {
        type: DataTypes.STRING(100),
        allowNull: false,
    }
});

module.exports = { Rol };

