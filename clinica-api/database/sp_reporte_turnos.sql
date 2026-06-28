USE clinica_db;

DELIMITER //

DROP PROCEDURE IF EXISTS sp_reporte_turnos //

CREATE PROCEDURE sp_reporte_turnos()
BEGIN
    -- Este SELECT es exactamente el que tenías en Node.js, pero ahora vive y se ejecuta en MySQL
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
    ORDER BY t.fecha_hora DESC;
END //

DELIMITER ;