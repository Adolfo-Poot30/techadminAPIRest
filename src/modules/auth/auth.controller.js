const { User } = require('../users/user.model');
const authService = require('./auth.service');

const register = async (req, res) => {
  try {
    const userData = req.body;
    
    if (!userData.email || !userData.password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }
    
    userData.password = await authService.hashPassword(userData.password);
    const user = await User.create(userData);
    
    const userResponse = authService.sanitizeUser(user);
    
    res.status(201).json({
      user: userResponse,
      token: authService.generateToken(user)
    });
  } catch (error) {
    res.status(400).json({ error: 'Error en registro: ' + error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !await authService.comparePasswords(password, user.password)) {
      throw new Error('Credenciales inválidas');
    }

    res.json({
      user: authService.sanitizeUser(user),
      token: authService.generateToken(user)
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = { 
  register, 
  login 
}; 