import express from 'express';
import { register, login } from '../controllers/authController.js';
import { validacionRegistro, validacionLogin } from '../validators/authValidator.js';

const router = express.Router();

// Registro de usuario
router.post('/register', validacionRegistro, register);

// Inicio de sesión
router.post('/login', validacionLogin, login);

export default router;