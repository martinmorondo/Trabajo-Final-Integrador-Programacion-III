import PDFDocument from 'pdfkit';
import Turno from '../models/turnoModel.js';

export const generarReporteTurnosPDF = async (req, res) => {
    try {
        // Traemos todos los turnos 
        const turnos = await Turno.getAll();

        // Configuramos los headers para que el navegador sepa que está recibiendo un PDF
        // 'attachment' fuerza la descarga.
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=reporte_turnos.pdf');

        // Creamos el documento PDF
        const doc = new PDFDocument({ margin: 50 });

        // Conectamos el documento directamente a la respuesta HTTP 
        doc.pipe(res);

        // --- DIBUJAMOS EL CONTENIDO DEL PDF ---

        // Título principal
        doc.fontSize(20).text('Reporte General de Turnos - Clínica Médica', { align: 'center' });
        doc.moveDown(2); // Salto de línea

        // Resumen inicial
        doc.fontSize(14).text(`Total de turnos registrados: ${turnos.length}`, { underline: true });
        doc.moveDown();

        // Iteramos sobre los turnos para mostrarlos
        turnos.forEach(turno => {
            const fechaFormateada = new Date(turno.fecha_hora).toLocaleString('es-AR');
            const estado = turno.atendido ? 'Atendido' : 'Pendiente';

            doc.fontSize(12).font('Helvetica-Bold').text(`Turno ID: ${turno.id_turno_reserva} - Fecha: ${fechaFormateada}`);
            doc.font('Helvetica').fontSize(10).text(`Paciente: ${turno.paciente_nombres} ${turno.paciente_apellido}`);
            doc.text(`Obra Social: ${turno.obra_social}`);
            doc.text(`Médico: Dr/a. ${turno.medico_nombres} ${turno.medico_apellido}`);
            doc.text(`Estado: ${estado} | Valor de consulta: $${turno.valor_total}`);
            
            // Línea separadora
            doc.moveDown(0.5);
            doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
            doc.moveDown(0.5);
        });

        // Finalizamos el documento (envía el archivo al cliente)
        doc.end();

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al generar el reporte PDF', error: error.message });
    }
};