import pool from '../config/db.js';

const Usuario = {
    findByEmail: async (email) => {
        const query = 'SELECT * FROM usuarios WHERE email = ? AND activo = 1';
        const [rows] = await pool.query(query, [email]);
        return rows[0];
    },

    create: async (data) => {
        // Extraemos todos los campos que pide el diagrama de la bd
        const { documento, apellido, nombres, email, contrasenia, foto_path, rol } = data;
        
        const query = `
            INSERT INTO usuarios 
            (documento, apellido, nombres, email, contrasenia, foto_path, rol) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        
        const [result] = await pool.query(query, [
            documento, apellido, nombres, email, contrasenia, foto_path || null, rol
        ]);
        
        return result;
    },

    updateFoto: async (id_usuario, foto_path) => {
        const query = 'UPDATE usuarios SET foto_path = ? WHERE id_usuario = ?';
        const [result] = await pool.query(query, [foto_path, id_usuario]);
        return result;
    }
};

export default Usuario;