import multer from 'multer';
import path from 'path';
import fs from 'fs';

// 1. Asegurarnos de que la carpeta exista
const dir = 'uploads/perfiles';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

// 2. Configurar dónde y cómo se guarda el archivo
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, dir); // Carpeta de destino
    },
    filename: (req, file, cb) => {
        // Generamos un nombre único: perfil-123.jpg
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, 'perfil-' + uniqueSuffix + ext);
    }
});

// 3. Filtro de seguridad (Solo aceptar imágenes)
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Error: Solo se permiten imágenes (jpeg, jpg, png, webp)'));
    }
};

// 4. Exportar el middleware configurado
export const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Límite estricto de 2MB <<<
    fileFilter
});