const { DataTypes } = require('sequelize');
const  sequelize  = require('../config/db');
const { Servicio } = require('./servicioModel');
const { Cita } = require('./citasModel');
const { Usuario } = require('./usuarioModel');
const { Refaccion } = require('./refaccionModel');

const Historial = sequelize.define('Historial', {
    IdHistorial: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,  // Genera un UUID automáticamente
        primaryKey: true,
    },
    Estado: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            isIn: [['pendiente', 'en proceso', 'completado', 'cancelado']]
        }
    },
    MontoSubtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    IdServicios: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Servicio,
            key: 'Id'
        }
    },
    IdCitas: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Cita,
            key: 'Id'
        }
    },
    IdUsuarioTecnico: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'Id'
        }
    },
    IdRefaccion: {
        type: DataTypes.UUID,
        references: {
            model: Refaccion,
            key: 'Id'
        }
    }
});

module.exports = { Historial };

