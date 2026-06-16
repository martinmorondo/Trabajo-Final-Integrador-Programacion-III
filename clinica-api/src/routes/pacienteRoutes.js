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

// BROWSE - Obtener todos los pacientes activos
router.get('/', getAllPacientes);

// READ - Obtener un paciente por ID
router.get('/:id', getPacienteById);

// Cualquier usuario con token válido puede registrar o editar un paciente
// ADD - Registrar un nuevo paciente
router.post('/', verificarToken, createPaciente);

// EDIT - Actualizar los datos de un paciente
router.put('/:id', verificarToken, updatePaciente);

// ¡SOLO el Admin puede borrar un paciente de la base de datos
router.delete('/:id', verificarToken, permitirRoles(3), deletePaciente);

export default router;