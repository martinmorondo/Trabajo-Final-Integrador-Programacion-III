import pool from '../config/db.js';

const Medico = {
    // Browse: Listar médicos cruzando datos con usuarios y especialidades
    getAll: async () => {
        const query = `
            SELECT m.id_medico, u.id_usuario, u.documento, u.nombres, u.apellido, u.email, 
                   m.matricula, m.id_especialidad, e.nombre AS especialidad_nombre, 
                   m.descripcion, m.valor_consulta
            FROM medicos m 
            JOIN usuarios u ON m.id_usuario = u.id_usuario 
            JOIN especialidades e ON m.id_especialidad = e.id_especialidad 
            WHERE u.activo = 1
        `;
        const [rows] = await pool.query(query);
        return rows;
    },

    // Read: Obtener uno por ID
    getById: async (id) => {
        const query = `
            SELECT m.id_medico, u.id_usuario, u.documento, u.nombres, u.apellido, u.email, 
                   m.matricula, m.id_especialidad, e.nombre AS especialidad_nombre, 
                   m.descripcion, m.valor_consulta
            FROM medicos m 
            JOIN usuarios u ON m.id_usuario = u.id_usuario 
            JOIN especialidades e ON m.id_especialidad = e.id_especialidad 
            WHERE m.id_medico = ? AND u.activo = 1
        `;
        const [rows] = await pool.query(query, [id]);
        return rows[0];
    },

    // Add: Crear nuevo médico (el id_usuario ya debe existir)
    create: async (data) => {
        const { id_usuario, id_especialidad, matricula, descripcion, valor_consulta } = data;
        const [result] = await pool.query(
            'INSERT INTO medicos (id_usuario, id_especialidad, matricula, descripcion, valor_consulta) VALUES (?, ?, ?, ?, ?)',
            [id_usuario, id_especialidad, matricula, descripcion, valor_consulta]
        );
        return result;
    },

    // Edit: Modificar datos propios del médico
    update: async (id, data) => {
        const { id_especialidad, matricula, descripcion, valor_consulta } = data;
        const [result] = await pool.query(
            'UPDATE medicos SET id_especialidad = ?, matricula = ?, descripcion = ?, valor_consulta = ? WHERE id_medico = ?',
            [id_especialidad, matricula, descripcion, valor_consulta, id]
        );
        return result;
    },

    // Delete: Borrado lógico apuntando a la tabla usuarios
    softDelete: async (id_medico) => {
        // Primero buscamos a qué usuario pertenece este médico
        const [medicoRows] = await pool.query('SELECT id_usuario FROM medicos WHERE id_medico = ?', [id_medico]);
        
        if (medicoRows.length > 0) {
            const idUsuario = medicoRows[0].id_usuario;
            // Desactivamos al usuario
            const [result] = await pool.query('UPDATE usuarios SET activo = 0 WHERE id_usuario = ?', [idUsuario]);
            return result;
        }
        return { affectedRows: 0 };
    }
};

export default Medico;