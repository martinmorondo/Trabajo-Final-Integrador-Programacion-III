# API Clínica Médica - Trabajo Final Integrador

Proyecto final para la cátedra de **Programación III** de la **Tecnicatura Universitaria en Desarrollo Web**  
(Facultad de Ciencias de la Administración - UNER).

Este proyecto consiste en el desarrollo del lado del servidor (**Backend**) para el sistema de gestión de una clínica médica, mediante el diseño e implementación de una API basada en arquitectura REST.

---

## 👥 Equipo de Desarrollo

- Martín Morondo
- Griselda Eggs
- Dylan Morales
- Gabriela de los Angeles Camacho
- Sergio Valdivienzo

---

## 🛠️ Stack Tecnológico

El proyecto hace uso de las siguientes tecnologías y herramientas:

- **Entorno:** Node.js (configurado con ES Modules)
- **Framework:** Express
- **Base de Datos:** MySQL (con uso de Promesas y Transacciones)
- **Seguridad:** JWT (JSON Web Tokens) para autenticación y autorización por roles.
- **Middlewares:**
  - `cors`
  - `morgan`
  - `express-validator`

---

## 🚀 Estado Actual (Primer Entregable)

- [x] Configuración inicial del servidor y variables de entorno.
- [x] Conexión mediante un Pool a la base de datos MySQL.
- [x] BREAD completo para la entidad `especialidades`.
- [x] Implementación de *Soft Delete* (Borrado Lógico) mediante el campo `activo`.

---

## ⚙️ Instalación y Configuración Local

Sigue estos pasos para levantar el entorno de desarrollo en tu computadora.

### 1️⃣ Clonar el repositorio e instalar dependencias

```bash
git clone <URL_DEL_REPOSITORIO>
cd clinica-api
npm install
```

### 2️⃣ Configurar la Base de Datos

Abrí tu gestor de base de datos MySQL (por ejemplo, MySQL Workbench) y ejecutá el script de inicialización ubicado en:

```bash
/database/init.sql
```

### 3️⃣ Configurar las variables de entorno

Creá un archivo `.env` en la raíz del proyecto (al mismo nivel que `package.json`) y agregá las siguientes variables:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña_de_mysql
DB_NAME=clinica_db
JWT_SECRET=TU_SECRET_AQUI
```

### 4️⃣ Levantar el servidor en modo desarrollo

```bash
npm run dev
```

---

## 📌 Funcionalidades Implementadas

- Arquitectura REST.
- CRUD/BREAD de especialidades.
- Validaciones de datos.
- Manejo centralizado de errores.
- Soft Delete.
- Autenticación con JWT.
- Uso de middlewares personalizados.

---

## 📄 Licencia

Proyecto desarrollado con fines académicos.