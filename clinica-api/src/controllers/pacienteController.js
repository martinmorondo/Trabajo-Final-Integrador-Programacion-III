import Paciente from '../models/pacienteModel.js';

// GET - Listar todos
export const getAllPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.getAll();
        res.json(pacientes);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los pacientes', error: error.message });
    }
};

// GET - Obtener por ID
export const getPacienteById = async (req, res) => {
    try {
        const paciente = await Paciente.getById(req.params.id);
        if (!paciente) {
            return res.status(404).json({ mensaje: 'Paciente no encontrado o inactivo' });
        }
        res.json(paciente);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el paciente', error: error.message });
    }
};

// POST - Crear paciente
export const createPaciente = async (req, res) => {
    try {
        const { id_usuario, id_obra_social } = req.body;

        if (!id_usuario || !id_obra_social) {
            return res.status(400).json({ mensaje: 'El id_usuario y el id_obra_social son obligatorios' });
        }

        const result = await Paciente.create({ id_usuario, id_obra_social });
        
        res.status(201).json({ 
            mensaje: 'Paciente registrado con éxito en la clínica', 
            id_paciente: result.insertId 
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al registrar el paciente', error: error.message });
    }
};

// PUT - Actualizar (ej: cambio de obra social)
export const updatePaciente = async (req, res) => {
    try {
        const { id_obra_social } = req.body;
        
        if (!id_obra_social) {
            return res.status(400).json({ mensaje: 'El id_obra_social es obligatorio' });
        }

        const result = await Paciente.update(req.params.id, { id_obra_social });
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Paciente no encontrado' });
        }
        res.json({ mensaje: 'Obra social del paciente actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar', error: error.message });
    }
};

// DELETE - Borrado Lógico
export const deletePaciente = async (req, res) => {
    try {
        const result = await Paciente.softDelete(req.params.id);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Paciente no encontrado' });
        }
        res.json({ mensaje: 'Paciente dado de baja exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al dar de baja', error: error.message });
    }
};