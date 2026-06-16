import express from 'express';
import { uploadPerfil } from '../controllers/usuarioController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/uploadMiddleware.js';

/**
 * @swagger
 * tags:
 *   - name: Usuarios
 *     description: Gestión de usuarios y perfiles
 */

const router = express.Router();

/**
 * @swagger
 * /api/v1/usuarios/foto-perfil:
 *   put:
 *     summary: Sube o actualiza la foto de perfil del usuario logueado
 *     tags: [Usuarios]
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *
 *             properties:
 *               foto:
 *                 type: string
 *                 format: binary
 *                 description: Imagen de perfil (jpeg, jpg, png, webp)
 *
 *     responses:
 *       200:
 *         description: Foto subida exitosamente.
 *
 *       400:
 *         description: Error de validación o archivo no permitido.
 */


// PUT - Actualizar foto de perfil
// Cualquiera que esté logueado puede subir su propia foto
// El campo en el form-data debe llamarse 'foto' (upload.single('foto'))
router.put('/foto-perfil', verificarToken, upload.single('foto'), uploadPerfil);

export default router;