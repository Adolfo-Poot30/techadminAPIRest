const { Usuario } = require('../models/usuarioModel');

const roleMiddleware = (requiredRole) => {
    return async (req, res, next) => {
        try {
            const userId = req.userId;  // Asumimos que el userId está en el request después de pasar por authMiddleware
            const user = await Usuario.findByPk(userId);

            if (!user || user.IdRoles !== requiredRole) {
                return res.status(403).json({ message: 'Acceso denegado: rol insuficiente.' });
            }

            next();  // Si tiene el rol necesario, sigue al siguiente middleware o controlador
        } catch (err) {
            res.status(500).json({ message: 'Error al verificar rol.', error: err.message });
        }
    };
};

module.exports = roleMiddleware;

