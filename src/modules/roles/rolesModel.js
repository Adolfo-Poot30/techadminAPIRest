const { DataTypes } = require('sequelize');
const  sequelize  = require('../../core/config/db');

const Rol = sequelize.define('Rol', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    titulo: {
        type: DataTypes.STRING(100),
        allowNull: false,
    }
}, {

    tableName: 'roles',
    timestamps: false

});

module.exports = { Rol };
