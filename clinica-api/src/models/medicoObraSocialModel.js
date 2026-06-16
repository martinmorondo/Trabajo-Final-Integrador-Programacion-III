import pool from '../config/db.js';

const MedicoObraSocial = {
    // Listar todas las obras sociales asociadas a un médico
    getByMedicoId: async (id_medico) => {
        const query = `
            SELECT mos.id_medico_obra_social, mos.id_obra_social, os.nombre AS obra_social_nombre, mos.activo
            FROM medicos_obras_sociales mos
            JOIN obras_sociales os ON mos.id_obra_social = os.id_obra_social
            WHERE mos.id_medico = ? AND mos.activo = 1 AND os.activo = 1
        `;
        const [rows] = await pool.query(query, [id_medico]);
        return rows;
    },

    // Crear la asociación entre un médico y una obra social
    create: async (data) => {
        const { id_medico, id_obra_social } = data;
        const [result] = await pool.query(
            'INSERT INTO medicos_obras_sociales (id_medico, id_obra_social) VALUES (?, ?)',
            [id_medico, id_obra_social]
        );
        return result;
    },

    // Dar de baja una asociación (Soft delete)
    softDelete: async (id_medico_obra_social) => {
        const [result] = await pool.query(
            'UPDATE medicos_obras_sociales SET activo = 0 WHERE id_medico_obra_social = ?',
            [id_medico_obra_social]
        );
        return result;
    }
};

export default MedicoObraSocial;