const express = require('express');
const router = express.Router();
const especialidadController = require('../controllers/especialidadController');

// BROWSE - Obtener todas las especialidades
router.get('/', especialidadController.getAllEspecialidades);

// READ - Obtener una especialidad por ID
router.get('/:id', especialidadController.getEspecialidadById);

// ADD - Crear una nueva especialidad
router.post('/', especialidadController.createEspecialidad);

// EDIT - Actualizar una especialidad existente
router.put('/:id', especialidadController.updateEspecialidad);

// DELETE - Eliminar (borrado lógico) una especialidad
router.delete('/:id', especialidadController.deleteEspecialidad);

module.exports = router;