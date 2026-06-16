import Usuario from '../models/usuarioModel.js';

export const uploadPerfil = async (req, res) => {
    try {
        // Multer deja el archivo procesado dentro de req.file
        if (!req.file) {
            return res.status(400).json({ mensaje: 'Por favor, sube una imagen válida' });
        }

        // El middleware verificarToken nos deja los datos del usuario acá
        const { id_usuario } = req.usuario; 
        
        // Formateamos la ruta para que use barras normales (/) en lugar de las de Windows (\)
        const foto_path = req.file.path.replace(/\\/g, '/'); 

        // Guardamos la ruta en la base de datos
        await Usuario.updateFoto(id_usuario, foto_path);

        res.json({
            mensaje: 'Foto de perfil actualizada con éxito',
            foto_path: foto_path
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al subir la imagen', error: error.message });
    }
};