import express from 'express';
import {
    getObrasSocialesByMedico,
    asociarMedicoObraSocial,
    desasociarMedicoObraSocial
} from '../controllers/medicoObraSocialController.js';

import { verificarToken } from '../middlewares/authMiddleware.js';
import { permitirRoles } from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Todas las rutas protegidas para el Administrador (Rol = 3)

// GET - Ver qué obras sociales tiene un médico específico
// Endpoint: GET /api/v1/medicos-obras-sociales/medico/:id_medico  <-
router.get('/medico/:id_medico', verificarToken, permitirRoles(3), getObrasSocialesByMedico);

// POST - Crear la asociación
// Endpoint: POST /api/v1/medicos-obras-sociales
router.post('/', verificarToken, permitirRoles(3), asociarMedicoObraSocial);

// DELETE - Dar de baja la asociación (Soft delete)
// Endpoint: DELETE /api/v1/medicos-obras-sociales/:id
router.delete('/:id', verificarToken, permitirRoles(3), desasociarMedicoObraSocial);

export default router;