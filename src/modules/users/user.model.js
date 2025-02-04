const { DataTypes } = require('sequelize');
const sequelize = require('../../core/database/connection');
const { Workshop } = require('../workshops/workshop.model');


const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'first_name'
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'last_name'
    },
    phone: {
        type: DataTypes.STRING(20),
        validate: {
            is: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('customer', 'mechanic', 'admin'),
        allowNull: false,
        defaultValue: 'customer'
    },
    workshopId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: Workshop,
            key: 'id'
        },
        field: 'workshop_id'
    }
}, 
{
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true,
});

User.associate = (models) => {
  User.belongsTo(models.Workshop, {
    foreignKey: {
      name: 'workshopId',
      allowNull: true
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  });
  User.hasMany(models.Vehicle, {
    foreignKey: 'userId',
    as: 'vehicles'
  });
};

module.exports = { User };