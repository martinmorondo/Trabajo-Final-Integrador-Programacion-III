import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

// Inicializamos la aplicación
const app = express();

// Importamos la conexión a la base de datos para que se ejecute
import './config/db.js';

// Importamos las rutas
import especialidadRoutes from './routes/especialidadRoutes.js';

// Middlewares 
app.use(cors()); // Habilita conexiones cruzadas 
app.use(morgan('dev')); // Registra las peticiones HTTP en la consola
app.use(express.json()); // Permite a Express entender el formato JSON en el body

// Ruta de prueba (Health check) para asegurar que el server responde
app.get('/api', (req, res) => {
    res.json({ mensaje: 'API de la Clínica Médica en funcionamiento' });
});

// Usamos las rutas de especialidades
// Todo lo que vaya a /api/especialidades será manejado por especialidadRoutes
app.use('/api/especialidades', especialidadRoutes);

export default app;