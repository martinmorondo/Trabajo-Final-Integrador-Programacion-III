import express from 'express';
import {
    getAllTurnos,
    getMisTurnos,
    createTurno,
    marcarAtendido,
    deleteTurno
} from '../controllers/turnoController.js';

import { verificarToken } from '../middlewares/authMiddleware.js';
import { permitirRoles } from '../middlewares/roleMiddleware.js';

/**
 * @swagger
 * tags:
 *   - name: Turnos
 *     description: Gestión del núcleo de atenciones y reservas de la clínica
 */

const router = express.Router();


/**
 * @swagger
 * /api/v1/turnos:
 *   get:
 *     summary: Lista absolutamente todos los turnos registrados
 *     tags: [Turnos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Arreglo con la lista de turnos.
 *       403:
 *         description: Acceso denegado.
 */

/**
 * @swagger
 * /api/v1/turnos/mis-turnos:
 *   get:
 *     summary: Obtiene la agenda propia dependiendo del usuario logueado
 *     description: Si el token es de un Médico (Rol 1), devuelve los turnos que debe atender. Si es de un Paciente (Rol 2), devuelve sus reservas.
 *     tags: [Turnos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de turnos correspondientes al usuario.
 *       404:
 *         description: Perfil no encontrado.
 */

/**
 * @swagger
 * /api/v1/turnos:
 *   post:
 *     summary: Registra un nuevo turno médico aplicando reglas de negocio
 *     description: Ejecuta una transacción MySQL y calcula automáticamente el valor total basándose en la obra social.
 *     tags: [Turnos]
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_medico
 *               - id_paciente
 *               - id_obra_social
 *               - fecha_hora
 *
 *             properties:
 *               id_medico:
 *                 type: integer
 *                 example: 1
 *
 *               id_paciente:
 *                 type: integer
 *                 example: 3
 *
 *               id_obra_social:
 *                 type: integer
 *                 example: 2
 *
 *               fecha_hora:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-06-25T14:30:00"
 *
 *     responses:
 *       201:
 *         description: Turno registrado exitosamente.
 *
 *       400:
 *         description: Faltan datos obligatorios.
 */

/**
 * @swagger
 * /api/v1/turnos/{id}/atendido:
 *   put:
 *     summary: Cambia el estado de un turno a "Atendido"
 *     tags: [Turnos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del turno a modificar
 *
 *     responses:
 *       200:
 *         description: Estado actualizado correctamente.
 */

// ---------------------------------------------------------
// RUTAS PARA EL ADMINISTRADOR (Rol = 3)
// ---------------------------------------------------------
// Ver TODOS los turnos de la clínica
router.get('/', verificarToken, permitirRoles(3), getAllTurnos);


// ---------------------------------------------------------
// RUTAS COMPARTIDAS (Roles combinados)
// ---------------------------------------------------------
// Ver agenda propia. Sirve tanto para Médicos (1) como Pacientes (2)
router.get('/mis-turnos', verificarToken, permitirRoles(1, 2), getMisTurnos);

// Registrar un turno. Lo puede hacer el Paciente (2) o el Admin (3) 
router.post('/', verificarToken, permitirRoles(2, 3), createTurno);

// Cancelar un turno (Soft Delete). Lo permitimos para el Paciente (2) y el Admin (3)
router.delete('/:id', verificarToken, permitirRoles(2, 3), deleteTurno);


// ---------------------------------------------------------
// RUTAS EXCLUSIVAS DEL MÉDICO (Rol = 1)
// ---------------------------------------------------------
// Marcar turno como atendido 
router.put('/:id/atendido', verificarToken, permitirRoles(1), marcarAtendido);

export default router;