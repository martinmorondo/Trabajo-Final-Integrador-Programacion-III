import express from 'express';
import {
    getAllEspecialidades,
    getEspecialidadById,
    createEspecialidad,
    updateEspecialidad,
    deleteEspecialidad
} from '../controllers/especialidadController.js';

import { verificarToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// BROWSE - Obtener todas las especialidades
router.get('/', getAllEspecialidades);

// READ - Obtener una especialidad por ID
router.get('/:id', getEspecialidadById);

// ADD, EDIT y DELETE - Las protegemos agregando verificarToken en el medio
// ADD - Crear una nueva especialidad
router.post('/', verificarToken, createEspecialidad);

// EDIT - Actualizar una especialidad existente
router.put('/:id', verificarToken, updateEspecialidad);

// DELETE - Eliminar (borrado lógico) una especialidad
router.delete('/:id', verificarToken, deleteEspecialidad);

export default router;