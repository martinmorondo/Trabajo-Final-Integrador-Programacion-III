import express from 'express';
import {
    getAllEspecialidades,
    getEspecialidadById,
    createEspecialidad,
    updateEspecialidad,
    deleteEspecialidad
} from '../controllers/especialidadController.js';

import { verificarToken } from '../middlewares/authMiddleware.js';
import { permitirRoles } from '../middlewares/roleMiddleware.js';

const router = express.Router();

// BROWSE - Obtener todas las especialidades (Accesible para cualquier logueado)
router.get('/', verificarToken, getAllEspecialidades);

// READ - Obtener una especialidad por ID (Accesible para cualquier logueado)
router.get('/:id', verificarToken, getEspecialidadById);

// ADD, EDIT y DELETE - SOLO Administrador (Rol 3)
router.post('/', verificarToken, permitirRoles(3), createEspecialidad);
router.put('/:id', verificarToken, permitirRoles(3), updateEspecialidad);
router.delete('/:id', verificarToken, permitirRoles(3), deleteEspecialidad);

export default router;