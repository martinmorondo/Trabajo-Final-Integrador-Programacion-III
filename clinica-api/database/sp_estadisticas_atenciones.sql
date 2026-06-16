USE clinica_db;

-- Cambiamos el delimitador para que MySQL no corte la ejecución en el primer punto y coma
DELIMITER //

-- Eliminamos el SP si ya existe para evitar errores
DROP PROCEDURE IF EXISTS sp_estadisticas_atenciones //

CREATE PROCEDURE sp_estadisticas_atenciones()
BEGIN
    SELECT 
        COUNT(id_turno_reserva) AS total_turnos,
        SUM(CASE WHEN atendido = 1 THEN 1 ELSE 0 END) AS turnos_atendidos,
        SUM(CASE WHEN atendido = 0 THEN 1 ELSE 0 END) AS turnos_pendientes,
        IFNULL(SUM(CASE WHEN atendido = 1 THEN valor_total ELSE 0 END), 0) AS recaudacion_total
    FROM turnos_reservas
    WHERE activo = 1;
END //

-- Volvemos al delimitador normal
DELIMITER ;