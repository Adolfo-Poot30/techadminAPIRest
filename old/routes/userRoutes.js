const express = require('express');
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware'); // Middleware de autenticación
const router = express.Router();

/**
 * Ruta para obtener todos los usuarios
 * Ruta: GET /api/usuarios
 */
router.get('/', authenticate, getAllUsers);

/**
 * Ruta para obtener un usuario por su ID
 * Ruta: GET /api/usuarios/:id
 */
router.get('/:id', authenticate, getUserById);

/**
 * Ruta para actualizar un usuario
 * Ruta: PUT /api/usuarios/:id
 */
router.put('/:id', authenticate, updateUser);

/**
 * Ruta para eliminar un usuario
 * Ruta: DELETE /api/usuarios/:id
 */
router.delete('/:id', authenticate, deleteUser);

module.exports = router;

