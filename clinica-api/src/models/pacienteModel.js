import pool from '../config/db.js';

const Paciente = {
    // Browse: Listar pacientes cruzando datos con usuarios y obras sociales
    getAll: async () => {
        const query = `
            SELECT p.id_paciente, u.id_usuario, u.documento, u.nombres, u.apellido, u.email, 
                   p.id_obra_social, os.nombre AS obra_social_nombre
            FROM pacientes p
            JOIN usuarios u ON p.id_usuario = u.id_usuario
            JOIN obras_sociales os ON p.id_obra_social = os.id_obra_social
            WHERE u.activo = 1
        `;
        const [rows] = await pool.query(query);
        return rows;
    },

    // Read: Obtener uno por ID
    getById: async (id) => {
        const query = `
            SELECT p.id_paciente, u.id_usuario, u.documento, u.nombres, u.apellido, u.email, 
                   p.id_obra_social, os.nombre AS obra_social_nombre
            FROM pacientes p
            JOIN usuarios u ON p.id_usuario = u.id_usuario
            JOIN obras_sociales os ON p.id_obra_social = os.id_obra_social
            WHERE p.id_paciente = ? AND u.activo = 1
        `;
        const [rows] = await pool.query(query, [id]);
        return rows[0];
    },

    // Add: Crear nuevo paciente (vinculando un id_usuario y un id_obra_social)
    create: async (data) => {
        const { id_usuario, id_obra_social } = data;
        const [result] = await pool.query(
            'INSERT INTO pacientes (id_usuario, id_obra_social) VALUES (?, ?)',
            [id_usuario, id_obra_social]
        );
        return result;
    },

    // Edit: Modificar datos propios del paciente (ej. cambiar de obra social)
    update: async (id, data) => {
        const { id_obra_social } = data;
        const [result] = await pool.query(
            'UPDATE pacientes SET id_obra_social = ? WHERE id_paciente = ?',
            [id_obra_social, id]
        );
        return result;
    },

    // Delete: Borrado lógico apuntando a la tabla usuarios
    softDelete: async (id_paciente) => {
        // Primero buscamos a qué usuario pertenece este paciente
        const [pacienteRows] = await pool.query('SELECT id_usuario FROM pacientes WHERE id_paciente = ?', [id_paciente]);
        
        if (pacienteRows.length > 0) {
            const idUsuario = pacienteRows[0].id_usuario;
            // Desactivamos al usuario
            const [result] = await pool.query('UPDATE usuarios SET activo = 0 WHERE id_usuario = ?', [idUsuario]);
            return result;
        }
        return { affectedRows: 0 };
    }
};

export default Paciente;