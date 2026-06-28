import express from 'express';
import {
    getAllMedicos,
    getMedicoById,
    createMedico,
    updateMedico,
    deleteMedico
} from '../controllers/medicoController.js';

import { verificarToken } from '../middlewares/authMiddleware.js';
import { permitirRoles } from '../middlewares/roleMiddleware.js'; 

const router = express.Router();

// GETs - Accesibles para cualquier usuario logueado
router.get('/', verificarToken, getAllMedicos);
router.get('/:id', verificarToken, getMedicoById);

// Rutas protegidas - SOLO Administrador (Rol 3)
router.post('/', verificarToken, permitirRoles(3), createMedico);
router.put('/:id', verificarToken, permitirRoles(3), updateMedico);
router.delete('/:id', verificarToken, permitirRoles(3), deleteMedico);

export default router;