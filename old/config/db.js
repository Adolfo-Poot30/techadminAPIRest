require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
        ssl: process.env.DB_SSL === 'true' ? {
            require: true,
            rejectUnauthorized: false
        } : false
    },
    logging: process.env.NODE_ENV === 'development' ? console.log : false
});

// Prueba de conexión
sequelize.authenticate()
    .then(() => console.log('Conexión a DB exitosa'))
    .catch(err => console.error('Error de conexión:', err));

module.exports = sequelize;

