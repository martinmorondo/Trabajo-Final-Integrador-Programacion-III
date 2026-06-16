import express from 'express';
import { register, login } from '../controllers/authController.js';
import { validacionRegistro, validacionLogin } from '../validators/authValidator.js';

const router = express.Router();

// Intercalamos el validador justo antes del controlador
router.post('/register', validacionRegistro, register);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Inicia sesión en el sistema
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@clinica.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: mi_password_super_seguro
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso. Devuelve el token JWT.
 *       401:
 *         description: Credenciales inválidas.
 */

// LOGIN - Iniciar sesión y obtener el Token JWT
router.post('/login', validacionLogin, login);

export default router;