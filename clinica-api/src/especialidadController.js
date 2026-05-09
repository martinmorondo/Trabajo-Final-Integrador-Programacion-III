import Especialidad from '../models/especialidadModel.js';

// BROWSE - Listar todas
const getAllEspecialidades = async (req, res) => {
    try {
        const especialidades = await Especialidad.getAll();
        res.json(especialidades);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las especialidades', error: error.message });
    }
};

// READ - Obtener una sola
const getEspecialidadById = async (req, res) => {
    try {
        const { id } = req.params;
        const especialidad = await Especialidad.getById(id);
        
        if (!especialidad) {
            return res.status(404).json({ mensaje: 'Especialidad no encontrada o inactiva' });
        }
        res.json(especialidad);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener la especialidad', error: error.message });
    }
};

// ADD - Crear nueva
const createEspecialidad = async (req, res) => {
    try {
        const { nombre } = req.body;
        
        if (!nombre) {
            return res.status(400).json({ mensaje: 'El nombre es obligatorio' });
        }

        const result = await Especialidad.create({ nombre });
        res.status(201).json({ 
            mensaje: 'Especialidad creada con éxito', 
            id_especialidad: result.insertId,
            nombre 
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la especialidad', error: error.message });
    }
};

// EDIT - Actualizar
const updateEspecialidad = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        if (!nombre) {
            return res.status(400).json({ mensaje: 'El nombre es obligatorio para actualizar' });
        }

        const result = await Especialidad.update(id, { nombre });

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Especialidad no encontrada o inactiva' });
        }

        res.json({ mensaje: 'Especialidad actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar la especialidad', error: error.message });
    }
};

// DELETE - Borrado lógico
const deleteEspecialidad = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Especialidad.softDelete(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Especialidad no encontrada' });
        }

        res.json({ mensaje: 'Especialidad eliminada correctamente (Soft delete)' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la especialidad', error: error.message });
    }
};

export {
    getAllEspecialidades,
    getEspecialidadById,
    createEspecialidad,
    updateEspecialidad,
    deleteEspecialidad
};