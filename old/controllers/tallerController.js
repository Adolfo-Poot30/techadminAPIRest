const { Taller } = require('../../../src/models/tallerModel');

exports.getTalleres = async (req, res) => {
    try {
        // Obtener parámetros de paginación de la query string (por ejemplo, ?page=1&limit=10)
        const page = parseInt(req.query.page) || 1;  // Por defecto, página 1
        const limit = parseInt(req.query.limit) || 10;  // Por defecto, 10 resultados por página
        const offset = (page - 1) * limit;

        // Obtener los talleres con paginación
        const talleres = await Taller.findAndCountAll({
            limit: limit,
            offset: offset,
            order: [['nombre', 'ASC']], 
        });

        // Enviar respuesta con los resultados y la paginación
        res.status(200).json({
            totalItems: talleres.count,
            totalPages: Math.ceil(talleres.count / limit),
            currentPage: page,
            itemsPerPage: limit,
            data: talleres.rows,  // Regresa los datos paginados
        });
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener los talleres', error: err.message });
    }
};

