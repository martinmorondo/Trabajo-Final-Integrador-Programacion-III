import Turno from '../models/turnoModel.js';
import pool from '../config/db.js'; // para buscar el id_paciente o id_medico del usuario logueado

// GET - Listar todos los turnos (Solo Admin)
export const getAllTurnos = async (req, res) => {
    try {
        const turnos = await Turno.getAll();
        res.json(turnos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener todos los turnos', error: error.message });
    }
};

// GET - Listar "Mis Turnos" (sirve tanto para el Médico como para el Paciente)
export const getMisTurnos = async (req, res) => {
    try {
        // Extraemos los datos del token
        const { id_usuario, rol } = req.usuario; 

        if (rol === 1) { // Es Médico
            const [medico] = await pool.query('SELECT id_medico FROM medicos WHERE id_usuario = ?', [id_usuario]);
            if (medico.length === 0) return res.status(404).json({ mensaje: 'Perfil de médico no encontrado' });
            
            const turnos = await Turno.getByMedicoId(medico[0].id_medico);
            return res.json(turnos);
        } 
        
        if (rol === 2) { // Es Paciente
            const [paciente] = await pool.query('SELECT id_paciente FROM pacientes WHERE id_usuario = ?', [id_usuario]);
            if (paciente.length === 0) return res.status(404).json({ mensaje: 'Perfil de paciente no encontrado' });
            
            const turnos = await Turno.getByPacienteId(paciente[0].id_paciente);
            return res.json(turnos);
        }

        res.status(403).json({ mensaje: 'Acceso denegado. El administrador debe usar la ruta general.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener tus turnos', error: error.message });
    }
};

// POST - Crear un nuevo turno (Admin o Paciente)
export const createTurno = async (req, res) => {
    try {
        const { id_medico, id_paciente, id_obra_social, fecha_hora } = req.body;
        const { id_usuario, rol } = req.usuario;

        // Validación de campos obligatorios
        if (!id_medico || !id_paciente || !id_obra_social || !fecha_hora) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios para registrar un turno' });
        }

        // SEGURIDAD EXTRA: Si es paciente, validamos que no intente sacar un turno a nombre de otro paciente
        if (rol === 2) {
            const [pacienteActual] = await pool.query('SELECT id_paciente FROM pacientes WHERE id_usuario = ?', [id_usuario]);
            if (pacienteActual[0].id_paciente !== parseInt(id_paciente)) {
                return res.status(403).json({ mensaje: 'No puedes crear un turno para otro paciente' });
            }
        }

        // Llamamos al modelo que ejecuta la Transacción MySQL y el cálculo matemático
        const result = await Turno.create({ id_medico, id_paciente, id_obra_social, fecha_hora });

        res.status(201).json({ 
            mensaje: 'Turno registrado exitosamente', 
            id_turno_reserva: result.insertId 
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al registrar el turno', error: error.message });
    }
};

// PUT - Marcar turno como atendido (Solo Médico)
export const marcarAtendido = async (req, res) => {
    try {
        const { id } = req.params; // id del turno
        const { id_usuario } = req.usuario;

        // Validamos que el turno le pertenezca a este médico antes de dejarlo marcarlo como atendido
        const [medico] = await pool.query('SELECT id_medico FROM medicos WHERE id_usuario = ?', [id_usuario]);
        const [turno] = await pool.query('SELECT id_medico FROM turnos_reservas WHERE id_turno_reserva = ?', [id]);

        if (turno.length === 0) return res.status(404).json({ mensaje: 'Turno no encontrado' });
        
        if (turno[0].id_medico !== medico[0].id_medico) {
            return res.status(403).json({ mensaje: 'No puedes modificar un turno que pertenece a otro profesional' });
        }

        const result = await Turno.marcarAtendido(id);
        res.json({ mensaje: 'Turno marcado como atendido correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el estado del turno', error: error.message });
    }
};

// DELETE - Cancelar turno (Soft Delete)
export const deleteTurno = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Turno.softDelete(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Turno no encontrado' });
        }

        res.json({ mensaje: 'Turno cancelado correctamente (Soft delete)' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al cancelar el turno', error: error.message });
    }
};