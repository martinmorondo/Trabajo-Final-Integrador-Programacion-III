import pool from '../config/db.js';

const Turno = {
    // Para el Admin: Listar todos los turnos
    getAll: async () => {
        const query = `
            SELECT t.id_turno_reserva, t.fecha_hora, t.valor_total, t.atendido, t.activo,
                   m.id_medico, u_medico.nombres AS medico_nombres, u_medico.apellido AS medico_apellido,
                   p.id_paciente, u_paciente.nombres AS paciente_nombres, u_paciente.apellido AS paciente_apellido,
                   os.nombre AS obra_social
            FROM turnos_reservas t
            JOIN medicos m ON t.id_medico = m.id_medico
            JOIN usuarios u_medico ON m.id_usuario = u_medico.id_usuario
            JOIN pacientes p ON t.id_paciente = p.id_paciente
            JOIN usuarios u_paciente ON p.id_usuario = u_paciente.id_usuario
            JOIN obras_sociales os ON t.id_obra_social = os.id_obra_social
            WHERE t.activo = 1
        `;
        const [rows] = await pool.query(query);
        return rows;
    },

    // Para el Médico: Ver sus propios turnos
    getByMedicoId: async (id_medico) => {
        const query = `
            SELECT t.id_turno_reserva, t.fecha_hora, t.valor_total, t.atendido, t.activo,
                   p.id_paciente, u_paciente.nombres AS paciente_nombres, u_paciente.apellido AS paciente_apellido,
                   os.nombre AS obra_social
            FROM turnos_reservas t
            JOIN pacientes p ON t.id_paciente = p.id_paciente
            JOIN usuarios u_paciente ON p.id_usuario = u_paciente.id_usuario
            JOIN obras_sociales os ON t.id_obra_social = os.id_obra_social
            WHERE t.id_medico = ? AND t.activo = 1
        `;
        const [rows] = await pool.query(query, [id_medico]);
        return rows;
    },

    // Para el Paciente: Ver sus propias reservas
    getByPacienteId: async (id_paciente) => {
        const query = `
            SELECT t.id_turno_reserva, t.fecha_hora, t.valor_total, t.atendido, t.activo,
                   m.id_medico, u_medico.nombres AS medico_nombres, u_medico.apellido AS medico_apellido,
                   os.nombre AS obra_social
            FROM turnos_reservas t
            JOIN medicos m ON t.id_medico = m.id_medico
            JOIN usuarios u_medico ON m.id_usuario = u_medico.id_usuario
            JOIN obras_sociales os ON t.id_obra_social = os.id_obra_social
            WHERE t.id_paciente = ? AND t.activo = 1
        `;
        const [rows] = await pool.query(query, [id_paciente]);
        return rows;
    },

    // CREAR TURNO CON TRANSACCIÓN Y CÁLCULO MATEMÁTICO
    create: async (data) => {
        const { id_medico, id_paciente, id_obra_social, fecha_hora } = data;
        
        // Pedimos una conexión dedicada al pool para hacer la transacción
        const connection = await pool.getConnection();

        try {
            // Iniciamos la transacción
            await connection.beginTransaction();

            // 1. Obtener el valor de consulta del médico
            const [medicoRows] = await connection.query('SELECT valor_consulta FROM medicos WHERE id_medico = ?', [id_medico]);
            if (medicoRows.length === 0) throw new Error('Médico no encontrado');
            const valorConsulta = parseFloat(medicoRows[0].valor_consulta);

            // 2. Obtener datos de la obra social (para saber si es particular y su descuento)
            const [obraRows] = await connection.query('SELECT porcentaje_descuento, es_particular FROM obras_sociales WHERE id_obra_social = ?', [id_obra_social]);
            if (obraRows.length === 0) throw new Error('Obra social no encontrada');
            const descuento = parseFloat(obraRows[0].porcentaje_descuento);
            const esParticular = obraRows[0].es_particular;

            // 3. Aplicar regla de negocio
            let valorTotal = valorConsulta;
            
            if (esParticular === 0) {
                // Cálculo: valor_consulta - (porcentaje_descuento * valor_consulta)
                // Asumimos que si el descuento es 20%, en la BD está guardado como 0.20
                valorTotal = valorConsulta - (descuento * valorConsulta);
            }

            // 4. Insertar el turno con el valor ya calculado
            const [result] = await connection.query(
                'INSERT INTO turnos_reservas (id_medico, id_paciente, id_obra_social, fecha_hora, valor_total) VALUES (?, ?, ?, ?, ?)',
                [id_medico, id_paciente, id_obra_social, fecha_hora, valorTotal]
            );

            // 5. Confirmar los cambios de forma permanente
            await connection.commit();
            return result;

        } catch (error) {
            // Si algo falló arriba, deshacemos todos los cambios
            await connection.rollback();
            throw error;
        } finally {
            // liberamos la conexión para que vuelva al pool
            connection.release();
        }
    },

    // Para el Médico: Marcar el turno como atendido
    marcarAtendido: async (id_turno_reserva) => {
        const [result] = await pool.query(
            'UPDATE turnos_reservas SET atendido = 1 WHERE id_turno_reserva = ? AND activo = 1',
            [id_turno_reserva]
        );
        return result;
    },

    // Para cancelar un turno (Soft Delete)
    softDelete: async (id_turno_reserva) => {
        const [result] = await pool.query(
            'UPDATE turnos_reservas SET activo = 0 WHERE id_turno_reserva = ?',
            [id_turno_reserva]
        );
        return result;
    }
};

export default Turno;