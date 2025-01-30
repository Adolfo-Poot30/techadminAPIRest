const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuarioId = decoded.id;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Token no válido.' });
    }
};

module.exports = {authenticate};
