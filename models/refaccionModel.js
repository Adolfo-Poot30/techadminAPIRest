const { DataTypes } = require('sequelize');
const  sequelize  = require('../config/db');
const { Taller } = require('./tallerModel');

const Refaccion = sequelize.define('Refaccion', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    preciocompra: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    precioventa: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idtaller: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Taller,
            key: 'id'
        }
    }
}, {

    tableName: 'refacciones',
    timestamps: false


});

module.exports = { Refaccion };

