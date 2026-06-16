import Estadistica from '../models/estadisticaModel.js';

export const getEstadisticas = async (req, res) => {
    try {
        const estadisticas = await Estadistica.getResumenAtenciones();
        res.json(estadisticas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las estadísticas de atenciones', error: error.message });
    }
};