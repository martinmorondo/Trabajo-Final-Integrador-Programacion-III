import pool from '../config/db.js';

const Especialidad = {
    // Browse: Listar todas (solo las activas)
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM especialidades WHERE activo = 1');
        return rows;
    },

    // Read: Obtener una por su ID (siempre y cuando esté activa)
    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM especialidades WHERE id_especialidad = ? AND activo = 1', [id]);
        return rows[0]; // Retorna el objeto directo o undefined si no existe
    },

    // Add: Crear una nueva especialidad
    create: async (data) => {
        // Por defecto en la BD, activo = 1
        const [result] = await pool.query('INSERT INTO especialidades (nombre) VALUES (?)', [data.nombre]);
        return result;
    },

    // Edit: Actualizar el nombre
    update: async (id, data) => {
        const [result] = await pool.query('UPDATE especialidades SET nombre = ? WHERE id_especialidad = ? AND activo = 1', [data.nombre, id]);
        return result;
    },

    // Delete: Borrado lógico (Soft delete)
    softDelete: async (id) => {
        const [result] = await pool.query('UPDATE especialidades SET activo = 0 WHERE id_especialidad = ?', [id]);
        return result;
    }
};

export default Especialidad;