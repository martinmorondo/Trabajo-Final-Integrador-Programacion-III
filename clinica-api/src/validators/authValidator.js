import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validatorMiddleware.js';

export const validacionRegistro = [
    // check('campo_del_body', 'Mensaje de error').regla1().regla2()
    
    check('documento', 'El documento es obligatorio').notEmpty(),
    check('documento', 'El documento debe contener solo números').isNumeric(),
    
    check('nombres', 'Los nombres son obligatorios').notEmpty(),
    check('apellido', 'El apellido es obligatorio').notEmpty(),
    
    check('email', 'El email es obligatorio').notEmpty(),
    check('email', 'Debe ser un formato de email válido (ej: correo@clinica.com)').isEmail(),
    
    check('password', 'La contraseña es obligatoria').notEmpty(),
    check('password', 'La contraseña debe tener al menos 6 caracteres para ser segura').isLength({ min: 6 }),
    
    check('rol', 'El rol es obligatorio').notEmpty(),
    check('rol', 'El rol debe ser 1 (Médico), 2 (Paciente) o 3 (Admin)').isIn([1, 2, 3]),

    // Al final de las reglas, llamamos a nuestro middleware para que actúe si alguna falló
    validarCampos
];

export const validacionLogin = [
    check('email', 'Debe ser un formato de email válido').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
];