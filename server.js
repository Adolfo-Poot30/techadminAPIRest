const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./src/core/config/db');

dotenv.config();

const app = express();
app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use(bodyParser.json());

// Importación de rutas
const authRoutes = require('./src/modules/auth/authRoutes');
const userRoutes = require('./src/modules/users/userRoutes');
const automovilRoutes = require('./src/modules/vehicles/automovilRoutes');
const tallerRoute = require('./src/modules/garages/tallerRoute');
const usersWithoutAccountRoutes = require('./src/modules/users_without_account/usersWithoutAccountRoutes');
// Uso de las rutas y definiendo endpoints
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/automoviles', automovilRoutes);
app.use('/api/talleres', tallerRoute);
app.use('/api/cliente_wa', usersWithoutAccountRoutes);

// Sincronización con la base de datos y ejecución del servidor
sequelize.sync().then(() => {
    console.log('Base de datos sincronizada');
    app.listen(process.env.PORT, () => {
        console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
    });
}).catch(err => {
    console.error('Error al conectar con la base de datos:', err);
});
