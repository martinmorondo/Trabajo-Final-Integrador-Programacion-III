import pool from '../config/db.js';

const ObraSocial = {
    // Browse: Listar todas las obras sociales activas
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM obras_sociales WHERE activo = 1');
        return rows;
    },

    // Read: Obtener una por ID
    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM obras_sociales WHERE id_obra_social = ? AND activo = 1', [id]);
        return rows[0];
    },

    // Add: Crear nueva obra social
    create: async (data) => {
        const { nombre, descripcion, porcentaje_descuento, es_particular } = data;
        
        // Si no mandan descuento o el flag de particular, les ponemos 0 por defecto
        const descuento = porcentaje_descuento || 0.00;
        const particular = es_particular || 0;

        const [result] = await pool.query(
            'INSERT INTO obras_sociales (nombre, descripcion, porcentaje_descuento, es_particular) VALUES (?, ?, ?, ?)',
            [nombre, descripcion, descuento, particular]
        );
        return result;
    },

    // Edit: Modificar datos
    update: async (id, data) => {
        const { nombre, descripcion, porcentaje_descuento, es_particular } = data;
        const [result] = await pool.query(
            'UPDATE obras_sociales SET nombre = ?, descripcion = ?, porcentaje_descuento = ?, es_particular = ? WHERE id_obra_social = ? AND activo = 1',
            [nombre, descripcion, porcentaje_descuento, es_particular, id]
        );
        return result;
    },

    // Delete: Borrado lógico
    softDelete: async (id) => {
        const [result] = await pool.query('UPDATE obras_sociales SET activo = 0 WHERE id_obra_social = ?', [id]);
        return result;
    }
};

export default ObraSocial;