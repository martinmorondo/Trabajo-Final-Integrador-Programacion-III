// Importamos dotenv para cargar las variables de entorno antes de que la app inicie
import 'dotenv/config';

import app from './app.js';

// Obtenemos el puerto de las variables de entorno o usamos el 3000 por defecto
const PORT = process.env.PORT || 3000;

// Levantamos el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Accede a http://localhost:${PORT}/api para probar la conexión.`);
});