import MedicoObraSocial from '../models/medicoObraSocialModel.js';

// GET - Listar obras sociales de un médico
export const getObrasSocialesByMedico = async (req, res) => {
    try {
        const { id_medico } = req.params;
        const asociaciones = await MedicoObraSocial.getByMedicoId(id_medico);
        res.json(asociaciones);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las asociaciones', error: error.message });
    }
};

// POST - Asociar un médico con una obra social
export const asociarMedicoObraSocial = async (req, res) => {
    try {
        const { id_medico, id_obra_social } = req.body;
        
        const result = await MedicoObraSocial.create({ id_medico, id_obra_social });
        
        res.status(201).json({
            mensaje: 'Médico asociado a la obra social con éxito',
            id_medico_obra_social: result.insertId
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al asociar el médico con la obra social', error: error.message });
    }
};
// DELETE - Desasociar (Borrado lógico)
export const desasociarMedicoObraSocial = async (req, res) => {
    try {
        const { id } = req.params; // ---> Este es el id_medico_obra_social
        const result = await MedicoObraSocial.softDelete(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Asociación no encontrada o ya inactiva' });
        }

        res.json({ mensaje: 'Asociación dada de baja correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al desasociar', error: error.message });
    }
};