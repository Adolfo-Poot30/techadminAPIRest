const { DataTypes } = require('sequelize');
const sequelize = require('../../core/database/connection');
const { User } = require('../users/user.model');

const Vehicle = sequelize.define('Vehicle', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  model: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  brand: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1900,
      max: new Date().getFullYear() + 1
    }
  },
  licensePlate: {
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: false,
    field: 'license_plate'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    },
    field: 'user_id'
  }
}, 
{
  tableName: 'vehicles',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  paranoid: true
});

Vehicle.associate = (models) => {
  Vehicle.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'owner'
  });
};

module.exports = { Vehicle }; 