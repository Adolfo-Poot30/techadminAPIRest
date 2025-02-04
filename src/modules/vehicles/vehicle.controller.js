const { Vehicle } = require('./vehicle.model');

const createVehicle = async (req, res) => {
  try {
    const { model, brand, year, licensePlate, description } = req.body;
    
    const newVehicle = await Vehicle.create({
      model,
      brand,
      year,
      licensePlate,
      description,
      userId: req.user.id 
    });
    
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(400).json({
      error: 'Error creando vehículo',
      details: error.errors?.map(e => e.message) || error.message
    });
  }
};

const getUserVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({
      where: { userId: req.user.id }
    });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo vehículos' });
  }
};

module.exports = { createVehicle, getUserVehicles }; 