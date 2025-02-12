const jwt = require('jsonwebtoken');
const { Usuario } = require('../users/usuarioModel');
const { hashPassword, comparePassword } = require('../../core/utils/hashUtils');  // Importamos las funciones del hashUtils
const { validarContrasena } = require('../../core/utils/authUtils');  // Función para validar la contraseña

// Registro de usuario
exports.register = async (req, res) => {
    try {
        const { nombres, apellidos, correo, contrasena, idroles, idtaller } = req.body;

        // Validar contraseña
        if (!validarContrasena(contrasena)) {
            return res.status(400).json({ message: 'La contraseña no cumple con los requisitos.' });
        }

        // Encriptar la contraseña usando hashPassword
        const hashedPassword = await hashPassword(contrasena);

        const usuario = await Usuario.create({
            nombres: nombres,
            apellidos: apellidos,
            correo: correo,
            contrasena: hashedPassword,
            idroles: idroles,
            idtaller: idtaller
        });

        // Generación del token JWT para el usuario
        const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'Usuario registrado exitosamente.', token });
    } catch (err) {
        res.status(500).json({ message: 'Error al registrar el usuario.', error: err.message });
    }
};

// Login de usuario
exports.login = async (req, res) => {
    try {
        const { correo, contrasena, idroles } = req.body;
        const usuario = await Usuario.findOne({ where: { correo: correo },  attributes: ['id', 'idroles', 'contrasena', 'nombres', 'correo'] });

        if (!usuario) {
            return res.status(400).json({ message: 'Correo o contraseña incorrectos.' });
        }

        // Comparar la contraseña ingresada con la contraseña encriptada
        const isMatch = await comparePassword(contrasena, usuario.contrasena);

        if (!isMatch) {
            return res.status(400).json({ message: 'Correo o contraseña incorrectos.' });
        }

        // Generación del token JWT para el usuario
        const token = jwt.sign({ id: usuario.id, idroles: usuario.idroles, nombres: usuario.nombres, correo: usuario.correo  }, process.env.JWT_SECRET, { expiresIn: '5h' });
        res.status(200).json({ message: 'Inicio de sesión exitoso.', token, idroles: usuario.idroles, nombres: usuario.nombres, correo: usuario.correo });
    } catch (err) {
        res.status(500).json({ message: 'Error al iniciar sesión.', error: err.message });
    }
};

