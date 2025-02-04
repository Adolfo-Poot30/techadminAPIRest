const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true' ? {
        require: true,
        rejectUnauthorized: false
      } : false
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: process.env.NODE_ENV === 'development' ? console.log : false
  }
);

module.exports = sequelize;

const createTables = async () => {
  await sequelize.sync({ force: true }); // ⚠️ Usar solo en desarrollo
  console.log('✅ Tablas creadas exitosamente');
};

// Ejecutar solo si no existen las tablas
sequelize.authenticate()
  .then(() => createTables())
  .catch(err => console.error('Error:', err));
