-- 1. LIMPIEZA Y CREACIÓN DE LA BASE DE DATOS
DROP DATABASE IF EXISTS clinica_db;
CREATE DATABASE clinica_db;
USE clinica_db;

-- 2. PERMISOS DEL USUARIO
CREATE USER IF NOT EXISTS 'clinica_user'@'localhost' IDENTIFIED BY 'lionelmessi10';
GRANT ALL PRIVILEGES ON clinica_db.* TO 'clinica_user'@'localhost';
FLUSH PRIVILEGES;

-- 3. CREACIÓN DE TABLAS (En estricto orden por las Claves Foráneas)

-- Tabla: Usuarios (Centraliza login y datos personales)
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    documento VARCHAR(20) NOT NULL UNIQUE,
    apellido VARCHAR(100) NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    contrasenia VARCHAR(255) NOT NULL,
    foto_path VARCHAR(255),
    rol TINYINT NOT NULL, -- 1: Médico, 2: Paciente, 3: Admin
    activo TINYINT DEFAULT 1
);

-- Tabla: Especialidades
CREATE TABLE especialidades (
    id_especialidad INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    activo TINYINT DEFAULT 1
);

-- Tabla: Obras Sociales
CREATE TABLE obras_sociales (
    id_obra_social INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    descripcion VARCHAR(255),
    porcentaje_descuento DECIMAL(9,2) DEFAULT 0.00,
    es_particular TINYINT DEFAULT 0,
    activo TINYINT DEFAULT 1
);

-- Tabla: Médicos (Extensión de usuarios)
CREATE TABLE medicos (
    id_medico INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_especialidad INT NOT NULL,
    matricula INT NOT NULL UNIQUE,
    descripcion TEXT,
    valor_consulta DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_especialidad) REFERENCES especialidades(id_especialidad)
);

-- Tabla: Pacientes (Extensión de usuarios)
CREATE TABLE pacientes (
    id_paciente INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_obra_social INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_obra_social) REFERENCES obras_sociales(id_obra_social)
);

-- Tabla Intermedia: Médicos - Obras Sociales
CREATE TABLE medicos_obras_sociales (
    id_medico_obra_social INT AUTO_INCREMENT PRIMARY KEY,
    id_medico INT NOT NULL,
    id_obra_social INT NOT NULL,
    activo TINYINT DEFAULT 1,
    FOREIGN KEY (id_medico) REFERENCES medicos(id_medico),
    FOREIGN KEY (id_obra_social) REFERENCES obras_sociales(id_obra_social)
);

-- Tabla: Turnos y Reservas
CREATE TABLE turnos_reservas (
    id_turno_reserva INT AUTO_INCREMENT PRIMARY KEY,
    id_medico INT NOT NULL,
    id_paciente INT NOT NULL,
    id_obra_social INT NOT NULL,
    fecha_hora DATETIME NOT NULL,
    valor_total DECIMAL(10,2),
    atendido TINYINT DEFAULT 0,
    activo TINYINT DEFAULT 1,
    FOREIGN KEY (id_medico) REFERENCES medicos(id_medico),
    FOREIGN KEY (id_paciente) REFERENCES pacientes(id_paciente),
    FOREIGN KEY (id_obra_social) REFERENCES obras_sociales(id_obra_social)
);