import express from 'express';
import {
    getAllObrasSociales,
    getObraSocialById,
    createObraSocial,
    updateObraSocial,
    deleteObraSocial
} from '../controllers/obraSocialController.js';

import { verificarToken } from '../middlewares/authMiddleware.js';
import { permitirRoles } from '../middlewares/roleMiddleware.js';

/**
 * @swagger
 * tags:
 *   - name: Obras Sociales
 *     description: ABM de coberturas médicas para la clínica
 */

const router = express.Router();

/**
 * @swagger
 * /api/v1/obras-sociales:
 *   get:
 *     summary: Lista todas las obras sociales habilitadas (Exclusivo Admin)
 *     tags: [Obras Sociales]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Consulta exitosa. Devuelve el listado activo.
 */

/**
 * @swagger
 * /api/v1/obras-sociales:
 *   post:
 *     summary: Da de alta una nueva obra social en el sistema
 *     tags: [Obras Sociales]
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             required:
 *               - nombre
 *
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: OSDE
 *
 *               descripcion:
 *                 type: string
 *                 example: Plan 210 y 310
 *
 *               porcentaje_descuento:
 *                 type: number
 *                 format: float
 *                 example: 0.40
 *
 *               es_particular:
 *                 type: integer
 *                 description: 0 para Obra Social, 1 para Atención Particular
 *                 example: 0
 *
 *     responses:
 *       201:
 *         description: Obra social registrada con éxito.
 */

/**
 * @swagger
 * /api/v1/obras-sociales/{id}:
 *   delete:
 *     summary: Realiza un borrado lógico (soft delete) de la obra social
 *     tags: [Obras Sociales]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la obra social a eliminar
 *
 *     responses:
 *       200:
 *         description: Dada de baja correctamente.
 */


// Absolutamente todas las rutas de Obras Sociales quedan restringidas al Administrador (Rol = 3)
router.get('/', verificarToken, permitirRoles(3), getAllObrasSociales);
router.get('/:id', verificarToken, permitirRoles(3), getObraSocialById);
router.post('/', verificarToken, permitirRoles(3), createObraSocial);
router.put('/:id', verificarToken, permitirRoles(3), updateObraSocial);
router.delete('/:id', verificarToken, permitirRoles(3), deleteObraSocial);

export default router;