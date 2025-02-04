require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const sequelize = require('./src/core/database/connection');

// Importar rutas
const authRoutes = require('./src/modules/auth/auth.routes');
const { workshopRouter } = require('./src/modules/workshops/workshop.routes');
const { scheduleRouter } = require('./src/modules/schedules/schedule.routes');
const { vehicleRouter } = require('./src/modules/vehicles/vehicle.routes');

const app = express();

// Middlewares básicos
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
}));
app.use(morgan('dev'));

// Conectar a la base de datos y sincronizar modelos // esto es para pruebas en desarrollo cuando se vaya a usar para produccion se debe quitar 
sequelize.authenticate()
  .then(async () => {
    console.log('✅ Conexión a DB exitosa');
    
    // Deshabilitar restricciones FK temporalmente
    await sequelize.query('SET session_replication_role = replica;');
    
    await sequelize.sync({ force: true }); 
    
    // Reactivar restricciones
    await sequelize.query('SET session_replication_role = DEFAULT;');
    
    console.log('🔄 Modelos sincronizados');
  })
  .catch(err => console.error('❌ Error de conexión a DB:', err));

// Rutas principales
app.use('/api/auth', authRoutes);
app.use('/api/workshops', workshopRouter);
app.use('/api/schedules', scheduleRouter);
app.use('/api/vehicles', vehicleRouter);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo centralizado de errores
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.stack);
  res.status(500).json({ 
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Añadir al final de los middlewares:
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('¡Error inesperado!');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
});