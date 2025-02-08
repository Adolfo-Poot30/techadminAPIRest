const { DataTypes } = require('sequelize');
const  sequelize  = require('../config/db');
const { Servicio } = require('./servicioModel');
const { Cita } = require('./citasModel');
const { Usuario } = require('./usuarioModel');
const { Refaccion } = require('./refaccionModel');

const Historial = sequelize.define('Historial', {
    idhistorial: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,  // Genera un UUID automáticamente
        primaryKey: true,
    },
    estado: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            isIn: [['pendiente', 'en proceso', 'completado', 'cancelado']]
        }
    },
    montosubtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    idservicios: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Servicio,
            key: 'id'
        }
    },
    idcitas: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Cita,
            key: 'id'
        }
    },
    idusuariotecnico: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    idrefaccion: {
        type: DataTypes.UUID,
        references: {
            model: Refaccion,
            key: 'id'
        }
    }
}, {
    tableName: 'historial',
    timestamps: false
});

module.exports = { Historial };

