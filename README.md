# 🏥 API Clínica Médica – Trabajo Final Integrador

Proyecto final para la cátedra de **Programación III** de la **Tecnicatura Universitaria en Desarrollo Web**
**Facultad de Ciencias de la Administración – UNER**

Este proyecto consiste en el desarrollo del lado del servidor (**Backend**) para un sistema de gestión de una clínica médica, mediante el diseño e implementación de una **API REST** con procesamiento de reglas de negocio en tiempo real.

---

# 👥 Equipo de Desarrollo

* Martín Morondo
* Griselda Eggs
* Dylan Morales
* Sergio Valdivienzo

---

# 🛠️ Stack Tecnológico

Este proyecto se utiliza las siguientes tecnologías y herramientas para su funcionamiento:


### Backend

* **Node.js** (configurado con ES Modules)
* **Express**

### Base de Datos

* **MySQL**

  * Promesas
  * Transacciones
  * Stored Procedures

### Seguridad

* **JWT (JSON Web Tokens)** para la autenticación y autorización basada en roles:

  * Admin
  * Médico
  * Paciente

### Documentación

* **Swagger (OpenAPI 3.0)**

### Gestión de Archivos

* **Multer** (`multipart/form-data`)

### Generación de Reportes

* **PDFKit**

### Middlewares

* `cors`
* `morgan`
* `express-validator`

---

# 🚀 Funcionalidades Completadas

* ✅ Configuración del servidor y variables de entorno.

* ✅ Conexión mediante **Pool** a MySQL.

* ✅ CRUD/BREAD completo para entidades principales:

  * `especialidades`
  * `obras_sociales`
  * `usuarios`
  * `medicos`
  * `pacientes`

* ✅ Implementación de **Soft Delete** (borrado lógico).

* ✅ **Motor de Turnos**

  * Uso de transacciones SQL.
  * Cálculo dinámico del valor final del turno.
  * Aplicación automática de descuentos según cobertura.

* ✅ **Panel de Control**

  * Stored Procedures.
  * Estadísticas en tiempo real:

    * Turnos pendientes
    * Turnos atendidos
    * Recaudación

* ✅ **Reportes Automáticos**

  * Exportación de turnos en formato PDF.

* ✅ **Personalización de Perfil**

  * Subida y validación de imágenes de perfil.

* ✅ **Documentación Interactiva**

  * Interfaz gráfica para visualizar y probar todos los endpoints.

---

# ⚙️ Instalación y Configuración Local

## 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd clinica-api
```

## 2. Instalar dependencias

```bash
npm install
```

---

## 3. Configurar la Base de Datos

Abrí tu gestor MySQL (ejemplo: **MySQL Workbench**).

Pasos:

1. Ir a **Server → Data Import**
2. Seleccionar **Import from Dump Project Folder**
3. Elegir la carpeta:

```plaintext
Base_de_Datos/
```

4. Ejecutar la importación.

Esto configurará:

* Estructura de tablas
* Stored Procedures
* Datos iniciales de prueba

---

## 4. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto.

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña_de_mysql
DB_NAME=clinica_db

JWT_SECRET=una_clave_super_secreta_para_clinica
```

---

## 5. Levantar el servidor

Modo desarrollo:

```bash
npm run dev
```

---

# 📖 Uso y Documentación (Swagger)

Una vez iniciado el servidor:

```plaintext
http://localhost:3000/api/v1/docs
```

Desde Swagger podrás:

* Explorar endpoints
* Probar solicitudes
* Visualizar respuestas

## Autenticación

Para utilizar rutas protegidas:

1. Ejecutar:

```http
POST /api/v1/auth/login
```

2. Copiar el token recibido.
3. Presionar **Authorize** (arriba a la derecha en Swagger).
4. Pegar el token.

---

# 📄 Licencia

Proyecto desarrollado únicamente con fines académicos.
