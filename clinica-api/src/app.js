import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { swaggerDocs } from './config/swagger.js';

// Inicializamos la aplicación
const app = express();

// Importamos la conexión a la base de datos para que se ejecute
import './config/db.js';

// Importamos las rutas
import especialidadRoutes from './routes/especialidadRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';
import medicoRoutes from './routes/medicoRoutes.js';
import authRoutes from './routes/authRoutes.js';
import obraSocialRoutes from './routes/obraSocialRoutes.js';
import medicoObraSocialRoutes from './routes/medicoObraSocialRoutes.js';
import turnoRoutes from './routes/turnoRoutes.js'
import estadisticaRoutes from './routes/estadisticaRoutes.js';
import reporteRoutes from './routes/reporteRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';

// Middlewares 
app.use(cors()); // Habilita conexiones cruzadas 
app.use(morgan('dev')); // Registra las peticiones HTTP en la consola
app.use(express.json()); // Permite a Express entender el formato JSON en el body
app.use('/uploads', express.static('uploads'));

// Ruta de prueba para asegurar que el server responde
app.get('/api', (req, res) => {
    res.json({ mensaje: 'API de la Clínica Médica en funcionamiento' });
});

// Usamos las rutas de especialidades
// Todo lo que vaya a /api/especialidades será manejado por especialidadRoutes
app.use('/api/v1/especialidades', especialidadRoutes);
app.use('/api/v1/pacientes', pacienteRoutes);
app.use('/api/v1/medicos', medicoRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/obras-sociales', obraSocialRoutes);
app.use('/api/v1/medicos-obras-sociales', medicoObraSocialRoutes);
app.use('/api/v1/turnos', turnoRoutes);
app.use('/api/v1/estadisticas', estadisticaRoutes);
app.use('/api/v1/reportes', reporteRoutes);
app.use('/api/v1/usuarios', usuarioRoutes);

swaggerDocs(app);

export default app;