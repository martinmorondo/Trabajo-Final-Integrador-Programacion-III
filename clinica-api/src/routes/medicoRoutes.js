import express from 'express';
import {
    getAllMedicos,
    getMedicoById,
    createMedico,
    updateMedico,
    deleteMedico
} from '../controllers/medicoController.js';

import { verificarToken } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.get('/', getAllMedicos);
router.get('/:id', getMedicoById);

// Rutas protegidas
router.post('/', verificarToken, createMedico);
router.put('/:id', verificarToken, updateMedico);
router.delete('/:id', verificarToken, deleteMedico);

export default router;