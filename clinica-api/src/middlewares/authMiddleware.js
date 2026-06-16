import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
    try {
        // 1. Obtener el token desde el header 'Authorization'
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(403).json({ mensaje: 'Acceso denegado. Token no proporcionado o formato inválido.' });
        }

        // 2. Extraer solo el token
        const token = authHeader.split(' ')[1];

        // 3. Verificar la validez del token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Guardar los datos del usuario dentro de la petición (req)
        // Así los controladores podrán saber qué usuario hizo la petición
        req.usuario = decoded;

        // 5. Todo está OK, dejar pasar al siguiente controlador
        next();
        
    } catch (error) {
        // Si el token expiró o fue modificado, jwt.verify tirará un error
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ mensaje: 'El token ha expirado. Por favor, inicie sesión nuevamente.' });
        }
        return res.status(401).json({ mensaje: 'Token inválido o corrupto.' });
    }
};