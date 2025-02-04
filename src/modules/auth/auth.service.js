const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../users/user.model');

const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

const comparePasswords = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || '8h' }
  );
};

const sanitizeUser = (user) => {
  const userJson = user.toJSON ? user.toJSON() : user;
  const { password, deletedAt, ...userData } = userJson;
  return userData;
};

module.exports = {
  hashPassword,
  comparePasswords,
  generateToken,
  sanitizeUser
}; 