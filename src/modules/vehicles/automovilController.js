const { Automovil } = require('./automovilModel');

exports.createAutomovil = async (req, res) => {
    try {
        const { modelo, marca, anio, placas, color, idUsuario } = req.body;

        const auto = await Automovil.create({
        modelo: modelo,
        marca: marca,
        anio: anio,
        placas: placas,
        color: color,
        idusuario: idUsuario
        });

        res.status(201).json({ message: 'Automóvil registrado exitosamente.', auto});
    } catch (err) {
        res.status(500).json({ message: 'Error al registrar el auto.', error: err.message });
    }    
};
