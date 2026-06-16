import ObraSocial from '../models/obraSocialModel.js';

// BROWSE - Listar todas las obras sociales activas
export const getAllObrasSociales = async (req, res) => {
    try {
        const obrasSociales = await ObraSocial.getAll();
        res.json(obrasSociales);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las obras sociales', error: error.message });
    }
};

// READ - Obtener una por ID
export const getObraSocialById = async (req, res) => {
    try {
        const { id } = req.params;
        const obraSocial = await ObraSocial.getById(id);
        
        if (!obraSocial) {
            return res.status(404).json({ mensaje: 'Obra social no encontrada o inactiva' });
        }
        res.json(obraSocial);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener la obra social', error: error.message });
    }
};

// ADD - Registrar nueva obra social
export const createObraSocial = async (req, res) => {
    try {
        const { nombre, descripcion, porcentaje_descuento, es_particular } = req.body;
        
        // Validación: El nombre es el único campo estrictamente obligatorio
        if (!nombre) {
            return res.status(400).json({ mensaje: 'El nombre de la obra social es obligatorio' });
        }

        const result = await ObraSocial.create({ nombre, descripcion, porcentaje_descuento, es_particular });
        res.status(201).json({ 
            mensaje: 'Obra social registrada con éxito', 
            id_obra_social: result.insertId 
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al registrar la obra social', error: error.message });
    }
};

// EDIT - Modificar los datos
export const updateObraSocial = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, porcentaje_descuento, es_particular } = req.body;

        if (!nombre) {
            return res.status(400).json({ mensaje: 'El nombre es obligatorio para actualizar' });
        }

        const result = await ObraSocial.update(id, { nombre, descripcion, porcentaje_descuento, es_particular });

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Obra social no encontrada o inactiva' });
        }

        res.json({ mensaje: 'Datos de la obra social actualizados correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar la obra social', error: error.message });
    }
};

// DELETE - Eliminación lógica (Soft delete)
export const deleteObraSocial = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ObraSocial.softDelete(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Obra social no encontrada' });
        }

        res.json({ mensaje: 'Obra social dada de baja correctamente (Soft delete)' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al dar de baja la obra social', error: error.message });
    }
};