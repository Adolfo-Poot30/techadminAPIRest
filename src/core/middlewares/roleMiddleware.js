const roleMiddleware = async (req, res, next) => {
    try {
        const userId = req.usuarioId;
        const user = await Usuario.findByPk(userId);
        const requiredRole = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';

        if (!user || user.idroles !== requiredRole) {
            return res.status(403).json({ message: 'Acceso denegado: rol insuficiente.' });
        }

        next();
    } catch (err) {
        res.status(500).json({ message: 'Error al verificar rol.', error: err.message });
    }
};

module.exports = { roleMiddleware };

