import express from 'express';
import {
    getAllPacientes,
    getPacienteById,
    createPaciente,
    updatePaciente,
    deletePaciente
} from '../controllers/pacienteController.js';

import { verificarToken } from '../middlewares/authMiddleware.js';
import { permitirRoles } from '../middlewares/roleMiddleware.js';

const router = express.Router();

// BROWSE y READ - SOLO Administrador (Rol 3)
router.get('/', verificarToken, permitirRoles(3), getAllPacientes);
router.get('/:id', verificarToken, permitirRoles(3), getPacienteById);

// ADD y EDIT - SOLO Administrador (Rol 3)
router.post('/', verificarToken, permitirRoles(3), createPaciente);
router.put('/:id', verificarToken, permitirRoles(3), updatePaciente);

// DELETE - SOLO Administrador (Rol 3)
router.delete('/:id', verificarToken, permitirRoles(3), deletePaciente);

export default router;