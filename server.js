const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Importación de rutas
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

// Uso de las rutas
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', userRoutes); // Prefijo para las rutas de usuario

// Sincronización con la base de datos y ejecución del servidor
sequelize.sync().then(() => {
    console.log('Base de datos sincronizada');
    app.listen(process.env.PORT, () => {
        console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
    });
}).catch(err => {
    console.error('Error al conectar con la base de datos:', err);
});

