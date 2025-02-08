const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Horario = sequelize.define('Horario', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    horaapertura: {
        type: DataTypes.TIME,
        allowNull: false,
        field: 'horaapertura',
    },
    horacierre: {
        type: DataTypes.TIME,
        allowNull: false,
        field: 'horacierre',
    },
    diaslaborales: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
        field: 'diaslaborales',
    },
}, {
    tableName: 'horarios',
    timestamps: false
});

module.exports = { Horario };

