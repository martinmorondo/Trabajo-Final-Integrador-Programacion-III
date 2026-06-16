import express from 'express';
import { getEstadisticas } from '../controllers/estadisticaController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';
import { permitirRoles } from '../middlewares/roleMiddleware.js';

const router = express.Router();

// GET - Ver estadísticas (Exclusivo Admin)
// Endpoint final: GET /api/v1/estadisticas
router.get('/', verificarToken, permitirRoles(3), getEstadisticas);

export default router;