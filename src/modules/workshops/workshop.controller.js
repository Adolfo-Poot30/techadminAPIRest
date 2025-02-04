const { Workshop } = require('./workshop.model');

const createWorkshop = async (req, res) => {
  try {
    const { name, businessName, phone, email, city, state, street, number, zipCode, country } = req.body;
    
    // Validación mejorada
    const requiredFields = ['name', 'city', 'state', 'street', 'number', 'country', 'zipCode'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Campos requeridos faltantes',
        missing: missingFields
      });
    }

    const newWorkshop = await Workshop.create({
      ...req.body,
      adminId: req.user.id,
      state: state.toUpperCase(),
      country: country.toUpperCase()
    });

    res.status(201).json(newWorkshop);
  } catch (error) {
    res.status(400).json({ 
      error: 'Error creando taller',
      details: error.errors?.map(e => e.message) || error.message 
    });
  }
};

module.exports = { createWorkshop }; 