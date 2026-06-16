import Medico from '../models/medicoModel.js';

// GET - Listar todos
export const getAllMedicos = async (req, res) => {
    try {
        const medicos = await Medico.getAll();
        res.json(medicos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los médicos', error: error.message });
    }
};

// GET - Obtener por ID
export const getMedicoById = async (req, res) => {
    try {
        const medico = await Medico.getById(req.params.id);
        if (!medico) {
            return res.status(404).json({ mensaje: 'Médico no encontrado o inactivo' });
        }
        res.json(medico);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el médico', error: error.message });
    }
};

// POST - Crear médico
export const createMedico = async (req, res) => {
    try {
        const { id_usuario, id_especialidad, matricula, descripcion, valor_consulta } = req.body;

        if (!id_usuario || !id_especialidad || !matricula || !valor_consulta) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
        }

        const result = await Medico.create({ id_usuario, id_especialidad, matricula, descripcion, valor_consulta });
        
        res.status(201).json({ 
            mensaje: 'Médico registrado con éxito en la clínica', 
            id_medico: result.insertId 
        });
    } catch (error) {
        // Capturamos el error si la matrícula ya existe
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ mensaje: 'La matrícula ingresada ya pertenece a otro médico' });
        }
        res.status(500).json({ mensaje: 'Error al registrar el médico', error: error.message });
    }
};

// PUT - Actualizar
export const updateMedico = async (req, res) => {
    try {
        const { id_especialidad, matricula, descripcion, valor_consulta } = req.body;
        
        const result = await Medico.update(req.params.id, { id_especialidad, matricula, descripcion, valor_consulta });
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Médico no encontrado' });
        }
        res.json({ mensaje: 'Datos del médico actualizados correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar', error: error.message });
    }
};

// DELETE - Borrado Lógico
export const deleteMedico = async (req, res) => {
    try {
        const result = await Medico.softDelete(req.params.id);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Médico no encontrado' });
        }
        res.json({ mensaje: 'Médico dado de baja exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al dar de baja', error: error.message });
    }
};