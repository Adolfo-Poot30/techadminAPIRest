const { ClienteSinCuenta } = require('./usersWithoutAccountModel');

exports.createClienteSinCuenta = async (req, res) => {
    const { nombres, apellidos, telefono, descripcion_auto, idtaller } = req.body;
    try {
        const nuevoCliente = await ClienteSinCuenta.create({
            nombres,
            apellidos,
            telefono,
            descripcion_auto,
            idtaller
        });
        res.status(201).json(nuevoCliente);
    } catch (err) {
        res.status(500).json({ message: 'Error al crear el cliente.', error: err.message });
    }
};

exports.getClientesSinCuentaByTaller = async (req, res) => {
    const { idtaller } = req.params;
    try {
        const clientes = await ClienteSinCuenta.findAll({ where: { idtaller } });
        res.status(200).json(clientes);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener los clientes del taller.', error: err.message });
    }
};

exports.updateClienteSinCuenta = async (req, res) => {
    const { id } = req.params;
    const { nombres, apellidos, telefono, descripcion_auto, idtaller } = req.body;
    try {
        const cliente = await ClienteSinCuenta.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado.' });
        }

        await cliente.update({
            nombres,
            apellidos,
            telefono,
            descripcion_auto,
            idtaller
        });

        res.status(200).json({ message: 'Cliente actualizado exitosamente.' });
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar el cliente.', error: err.message });
    }
};

exports.deleteClienteSinCuenta = async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await ClienteSinCuenta.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado.' });
        }

        await cliente.destroy();
        res.status(200).json({ message: 'Cliente eliminado exitosamente.' });
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar el cliente.', error: err.message });
    }
};
