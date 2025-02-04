const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Horario = sequelize.define('Horario', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,  // Genera un UUID automáticamente
        primaryKey: true,
    },
    horaApertura: {
        type: DataTypes.TIME,
        allowNull: false,
        field: 'HoraApertura',  // Asegúrate de usar el nombre correcto de la columna en la base de datos
    },
    horaCierre: {
        type: DataTypes.TIME,
        allowNull: false,
        field: 'HoraCierre',  // Asegúrate de usar el nombre correcto de la columna en la base de datos
    },
    diasLaborales: {
        type: DataTypes.ARRAY(DataTypes.TEXT),  // Utiliza el tipo ARRAY para almacenar un arreglo de días laborales
        allowNull: false,
        field: 'DiasLaborales',
    },
}, {
    tableName: 'horarios',
    timestamps: false  // Si no estás utilizando columnas de fecha (createdAt, updatedAt), puedes dejar esto así
});

module.exports = { Horario };

