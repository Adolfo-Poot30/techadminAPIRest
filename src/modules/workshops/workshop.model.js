const { DataTypes } = require('sequelize');
const sequelize = require('../../core/database/connection');

const Workshop = sequelize.define('Workshop', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  businessName: {
    type: DataTypes.STRING,
    field: 'business_name'
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
    validate: {
      is: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/ // Validación internacional
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true
    }
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false // Para filtrado obligatorio
  },
  state: {
    type: DataTypes.STRING(2), // Ej: 'NY'
    allowNull: false
  },
  street: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  number: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  zipCode: {
    type: DataTypes.STRING(10),
    field: 'zip_code'
  },
  country: {
    type: DataTypes.STRING(2), // Código ISO 3166-1 alpha-2
    allowNull: false,
    validate: {
      is: /^[A-Z]{2}$/
    }
  },
  adminId: {
    type: DataTypes.UUID,
    references: {
      model: 'users', // Nombre de tabla explícito
      key: 'id'
    }
  }
}, 
{
  tableName: 'workshops',
  timestamps: true,
  paranoid: true,
  indexes: [
    {
      fields: ['country', 'state', 'city']
    }
  ]
});

Workshop.associate = (models) => {
  Workshop.hasMany(models.Schedule, { 
    foreignKey: 'workshopId',
    as: 'schedules' 
  });
  Workshop.hasMany(models.User, { foreignKey: 'workshopId' });
  Workshop.hasMany(models.Appointment, { foreignKey: 'workshopId' });
  Workshop.belongsTo(models.User, {
    foreignKey: 'adminId',
    as: 'admin'
  });
};

module.exports = { Workshop }; 