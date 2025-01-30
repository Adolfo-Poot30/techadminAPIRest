const { Usuario } = require('../models/usuarioModel');

//verificar que sea admin desde token
exports.getAllUsers = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener los usuarios.', error: err.message });
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        res.status(200).json(usuario);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener el usuario.', error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { nombres, apellidos, correo, idRol, idPermiso, idTaller } = req.body;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        await usuario.update({
            Nombres: nombres,
            Apellidos: apellidos,
            Correo: correo,
            IdRoles: idRol,
            IdPermisos: idPermiso,
            IdTaller: idTaller
        });

        res.status(200).json({ message: 'Usuario actualizado exitosamente.' });
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar el usuario.', error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        await usuario.destroy();
        res.status(200).json({ message: 'Usuario eliminado exitosamente.' });
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar el usuario.', error: err.message });
    }
};

