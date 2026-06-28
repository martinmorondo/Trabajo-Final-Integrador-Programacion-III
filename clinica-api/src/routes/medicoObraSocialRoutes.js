import express from 'express';
import { body } from 'express-validator';
import {
    getObrasSocialesByMedico,
    asociarMedicoObraSocial,
    desasociarMedicoObraSocial
} from '../controllers/medicoObraSocialController.js';

import { verificarToken } from '../middlewares/authMiddleware.js';
import { permitirRoles } from '../middlewares/roleMiddleware.js';
import { validarCampos } from '../middlewares/validatorMiddleware.js';

const router = express.Router();

// Todas las rutas protegidas para el Administrador (Rol = 3)

// GET - Ver qué obras sociales tiene un médico específico
router.get('/medico/:id_medico', verificarToken, permitirRoles(3), getObrasSocialesByMedico);

// POST - Crear la asociación (Con EXPRESS-VALIDATOR)
router.post('/', 
    verificarToken, 
    permitirRoles(3),
    [
        body('id_medico').notEmpty().withMessage('El id_medico es obligatorio').isInt().withMessage('El id_medico debe ser un número entero'),
        body('id_obra_social').notEmpty().withMessage('El id_obra_social es obligatorio').isInt().withMessage('El id_obra_social debe ser un número entero'),
        validarCampos
    ], 
    asociarMedicoObraSocial
);

// DELETE - Dar de baja la asociación (Soft delete)
router.delete('/:id', verificarToken, permitirRoles(3), desasociarMedicoObraSocial);

export default router;