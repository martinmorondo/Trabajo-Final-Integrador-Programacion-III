import express from 'express';
import { generarReporteTurnosPDF } from '../controllers/reporteController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';
import { permitirRoles } from '../middlewares/roleMiddleware.js';

/**
 * @swagger
 * tags:
 *   - name: Reportes
 *     description: Generación de documentos y exportación de datos
 */

const router = express.Router();

/**
 * @swagger
 * /api/v1/reportes/turnos-pdf:
 *   get:
 *     summary: Descarga un reporte en PDF de todos los turnos (Exclusivo Admin)
 *     tags: [Reportes]
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Archivo PDF generado correctamente.
 *
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 */

// GET - Generar y descargar PDF (Solo Admin)
// Endpoint: GET /api/v1/reportes/turnos-pdf
router.get('/turnos-pdf', verificarToken, permitirRoles(3), generarReporteTurnosPDF);

export default router;