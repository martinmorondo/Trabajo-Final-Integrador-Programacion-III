const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Inicializamos la aplicación
const app = express();

// Importamos la conexión a la base de datos para que se ejecute
require('./config/db');

// Middlewares 
app.use(cors()); // Habilita conexiones cruzadas 
app.use(morgan('dev')); // Registra las peticiones HTTP en la consola
app.use(express.json()); // Permite a Express entender el formato JSON en el body

// Ruta de prueba (Health check) para asegurar que el server responde
app.get('/api', (req, res) => {
    res.json({ mensaje: 'API de la Clínica Médica en funcionamiento' });
});

module.exports = app;