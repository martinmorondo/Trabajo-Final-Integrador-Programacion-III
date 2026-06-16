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

### Backend



### Base de Datos



### Seguridad



### Documentación



### Gestión de Archivos



### Generación de Reportes



### Middlewares



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



## 2. Instalar dependencias



## 3. Configurar la Base de Datos



4. Ejecutar la importación.

Esto configurará:

* Estructura de tablas
* Stored Procedures
* Datos iniciales de prueba

---

## 4. Configurar variables de entorno


---

## 5. Levantar el servidor


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

Proyecto desarrollado con fines académicos.
