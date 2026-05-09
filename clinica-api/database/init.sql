-- Creamos la base de datos (si no existe) y la seleccionamos
CREATE DATABASE IF NOT EXISTS clinica_db;
USE clinica_db;

-- Creamos la tabla de especialidades según el modelo del PDF
CREATE TABLE IF NOT EXISTS especialidades (
    id_especialidad INT AUTO_INCREMENT PRIMARY KEY,  -- [cite: 84]
    nombre VARCHAR(120) NOT NULL,                    -- [cite: 85]
    activo TINYINT DEFAULT 1                         -- [cite: 86]
);

-- Insertamos un par de datos de prueba para tener algo que leer después
INSERT INTO especialidades (nombre, activo) VALUES 
('Cardiología', 1),
('Pediatría', 1),
('Traumatología', 1);