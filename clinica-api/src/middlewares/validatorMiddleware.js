import { validationResult } from 'express-validator';

export const validarCampos = (req, res, next) => {
    // validationResult extrae todos los errores acumulados en la petición
    const errores = validationResult(req);
    
    if (!errores.isEmpty()) {
        // Si hay errores, frenamos todo y devolvemos un 400 Bad Request con el detalle
        return res.status(400).json({ 
            mensaje: 'Error en la validación de datos',
            errores: errores.array() 
        });
    }
    
    // Si está todo perfecto, sigue al controlador
    next();
};