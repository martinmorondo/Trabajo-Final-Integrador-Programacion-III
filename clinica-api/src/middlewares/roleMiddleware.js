export const permitirRoles = (...rolesPermitidos) => {
    return (req, res, next) => {
        // req.usuario fue cargado previamente por el verificarToken
        if (!req.usuario || !rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({ 
                mensaje: `Acceso denegado. Esta acción está permitida solo para los roles: ${rolesPermitidos.join(', ')}` 
            });
        }
        next(); // Tiene el rol correcto, pasa al controlador
    };
};