const mysql = require('mysql2/promise'); // Usamos la versión con promesas 
require('dotenv').config();

// Creamos un "Pool" de conexiones. 
// Esto es más eficiente que abrir y cerrar la conexión en cada petición.
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Hacemos una prueba rápida de conexión al iniciar
pool.getConnection()
    .then(connection => {
        console.log('Conectado a la base de datos MySQL');
        connection.release(); // Liberamos la conexión de vuelta al pool
    })
    .catch(error => {
        console.error('Error al conectar a la base de datos:', error.message);
    });

module.exports = pool;