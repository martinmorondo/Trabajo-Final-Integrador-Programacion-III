import pool from '../config/db.js';

const Estadistica = {
    getResumenAtenciones: async () => {
        // Ejecutamos el Stored Procedure usando la sintaxis CALL de MySQL
        const [rows] = await pool.query('CALL sp_estadisticas_atenciones()');
        
        // rows[0] contiene el resultado del SELECT, y le pedimos la primera fila (el objeto con los totales)
        return rows[0][0];
    }
};

export default Estadistica;