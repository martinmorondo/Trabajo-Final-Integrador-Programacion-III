const express = require('express');
import {
    getAllEspecialidades,
    getEspecialidadById,
    createEspecialidad,
    updateEspecialidad,
    deleteEspecialidad
} from '../controllers/especialidadController.js';

const router = express.Router();

// BROWSE - Obtener todas las especialidades
router.get('/', getAllEspecialidades);

// READ - Obtener una especialidad por ID
router.get('/:id', getEspecialidadById);

// ADD - Crear una nueva especialidad
router.post('/', createEspecialidad);

// EDIT - Actualizar una especialidad existente
router.put('/:id', updateEspecialidad);

// DELETE - Eliminar (borrado lógico) una especialidad
router.delete('/:id', deleteEspecialidad);

export default router;