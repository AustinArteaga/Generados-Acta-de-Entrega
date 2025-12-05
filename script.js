// Establecer fecha actual por defecto
document.getElementById('fecha').valueAsDate = new Date();

// Manejar envío del formulario
document.getElementById('actaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    generarPDF();
});

function limpiarFormulario() {
    document.getElementById('actaForm').reset();
    document.getElementById('fecha').valueAsDate = new Date();
    document.getElementById('previewContainer').classList.remove('active');
}

function formatearFecha(fechaStr) {
    const fecha = new Date(fechaStr + 'T00:00:00');
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return fecha.toLocaleDateString('es-EC', opciones);
}

function generarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Obtener valores del formulario
    const area = document.getElementById('area').value;
    const equipo = document.getElementById('equipo').value;
    const serie = document.getElementById('serie').value;
    const precio = document.getElementById('precio').value;
    const usuario = document.getElementById('usuario').value;
    const fecha = formatearFecha(document.getElementById('fecha').value);

    // Configuración de la página
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 25;
    const maxWidth = pageWidth - (margin * 2);
    let y = 30;

    // ============ PÁGINA 1: COMPROBANTE DE ENTREGA ============
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('COMPROBANTE DE ENTREGA', pageWidth / 2, y, { align: 'center' });
    
    y += 10;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Centro de Costos: ${area}`, pageWidth / 2, y, { align: 'center' });
    
    y += 7;
    doc.text(`Equipo asignado: ${equipo}`, pageWidth / 2, y, { align: 'center' });
    
    y += 7;
    doc.text(`Serie: ${serie}`, pageWidth / 2, y, { align: 'center' });
    
    y += 10;
    
    // Párrafo 1
    let texto = `1. Declaro recibir el equipo Laptop/desktop/teléfono en calidad de préstamo otorgado por mi empresa.`;
    let lineas = doc.splitTextToSize(texto, maxWidth);
    doc.text(lineas, margin, y);
    y += (lineas.length * 5) + 3;
    
    // Párrafo 2
    texto = `2. Los equipos recibidos me comprometo a devolver en óptimas condiciones a la empresa en caso de renuncia o desvinculación, antes de dejar las Instalaciones MARRIOTT S. A.`;
    lineas = doc.splitTextToSize(texto, maxWidth);
    doc.text(lineas, margin, y);
    y += (lineas.length * 5) + 3;
    
    // Párrafo 3
    texto = `3. Declaro estar en conocimiento y comprometerme a cumplir la Política de Uso de Equipos portátiles Laptop/desktop/teléfono.`;
    lineas = doc.splitTextToSize(texto, maxWidth);
    doc.text(lineas, margin, y);
    y += (lineas.length * 5) + 3;
    
    // Párrafo 4
    texto = `4. En caso de sustracción pérdida o daño total o parcial del equipo, autorizo a la Empresa a deducir de mis remuneraciones y asignaciones mensuales, o de los haberes finales del finiquito, la suma que al efecto corresponda por aplicación de lo dispuesto en la Política de Usos Laptop/desktop/teléfono de la empresa.`;
    lineas = doc.splitTextToSize(texto, maxWidth);
    doc.text(lineas, margin, y);
    y += (lineas.length * 5) + 3;
    
    // Párrafo 5
    texto = `5. El costo del valor del equipo: $${precio}`;
    doc.text(texto, margin, y);
    
    // Mover la firma al final de la página
    y = pageHeight - 50;
    
    // Línea de firma
    doc.line(margin, y, margin + 60, y);
    y += 6;
    
    // Nombre del usuario
    doc.text(usuario, margin, y);
    
    // Etiqueta [Usuario responsable]
    doc.text('[Usuario responsable]', margin, y + 5);

    // ============ PÁGINA 2: POLÍTICA DE USO ============
    doc.addPage();
    y = 30;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Política de Uso de Equipos de la Empresa', margin, y);
    
    y += 10;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');

    // Política 1
    texto = `1. La asignación de un Laptop/desktop/teléfono a un empleado está basada en la idea de facilitar el desempeño del rol y el desarrollo del negocio, debiendo los empleados tratar los activos de la compañía como si fuesen propios.`;
    lineas = doc.splitTextToSize(texto, maxWidth);
    doc.text(lineas, margin, y);
    y += (lineas.length * 5) + 3;

    // Política 2
    texto = `2. Dado que la Laptop/desktop/teléfono es un instrumento para desarrollar las funciones del empleado, es una obligación que lo lleve consigo durante la jornada laboral estipulada por el empleador. Por lo que se debe evitar dejar el equipo en lugares no apropiados y así evitar robo o pérdida.`;
    lineas = doc.splitTextToSize(texto, maxWidth);
    doc.text(lineas, margin, y);
    y += (lineas.length * 5) + 3;

    // Política 3
    texto = `3. Al momento de la recepción del equipo el empleado deberá firmar el documento "Comprobante de Entrega" (ver anexo1).`;
    lineas = doc.splitTextToSize(texto, maxWidth);
    doc.text(lineas, margin, y);
    y += (lineas.length * 5) + 3;

    // Política 4
    texto = `4. El empleado es totalmente responsable de la sustracción o pérdida del equipo, o del daño, total o parcial, que pueda experimentar y que provenga de su mal uso o negligencia. Si el notebook se pierde, o bien si se daña por las razones antes indicadas, el empleado debe pagar el 100% del costo total del producto o de su reparación.`;
    lineas = doc.splitTextToSize(texto, maxWidth);
    doc.text(lineas, margin, y);
    y += (lineas.length * 5) + 3;

    // Política 5
    texto = `5. Los equipos deben ser utilizados de acuerdo con lo dispuesto en la Política de Seguridad en el Manejo de los Sistemas Informáticos (ver anexo2), asegurando siempre la seguridad de la información.`;
    lineas = doc.splitTextToSize(texto, maxWidth);
    doc.text(lineas, margin, y);
    y += (lineas.length * 5) + 3;

    // Política 6
    texto = `6. Se prohíbe préstamo o alquiler del equipo y/o accesorios a terceros, instalación de software autorizado por escrito por el Dpto. de Sistemas. La tecnología y el equipo entregado es solo para uso con fines corporativos de Marriott S. A.`;
    lineas = doc.splitTextToSize(texto, maxWidth);
    doc.text(lineas, margin, y);
    y += (lineas.length * 5) + 10;

    // Firmas finales - Posicionar en la parte inferior de la página
    y = pageHeight - 50;
    
    // Líneas de firma
    doc.line(margin, y, margin + 60, y);
    doc.line(pageWidth - margin - 60, y, pageWidth - margin, y);
    
    y += 6;
    
    // Nombres
    doc.text(usuario, margin, y);
    doc.text('Tec. Carmen Velasco V.', pageWidth - margin - 60, y);
    
    y += 1;
    
    // Títulos centrados
    const usuarioLabel = 'Usuario';
    const usuarioLabelWidth = doc.getTextWidth(usuarioLabel);
    const usuarioLabelX = margin + (60 - usuarioLabelWidth) / 2;
    doc.text(usuarioLabel, usuarioLabelX, y + 5);
    
    const jefeLabel = 'Jefe de Sistemas';
    const jefeLabelWidth = doc.getTextWidth(jefeLabel);
    const jefeLabelX = (pageWidth - margin - 60) + (60 - jefeLabelWidth) / 2;
    doc.text(jefeLabel, jefeLabelX, y + 5);
    
    y += 10;
    
    // Fecha
    doc.text(fecha, margin, y);

    // Guardar el PDF
    const nombreArchivo = `Acta_Entrega_${usuario.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
    doc.save(nombreArchivo);

    // Mostrar mensaje de éxito
    const successMsg = document.getElementById('successMessage');
    successMsg.style.display = 'block';
    setTimeout(() => {
        successMsg.style.display = 'none';
    }, 3000);

    // Mostrar vista previa
    mostrarVistaPrevia();
}

function mostrarVistaPrevia() {
    const area = document.getElementById('area').value;
    const equipo = document.getElementById('equipo').value;
    const serie = document.getElementById('serie').value;
    const precio = document.getElementById('precio').value;
    const usuario = document.getElementById('usuario').value;
    const fecha = formatearFecha(document.getElementById('fecha').value);

    const preview = `
        <h3>COMPROBANTE DE ENTREGA</h3>
        <p><strong>Centro de Costos:</strong> ${area}</p>
        <p><strong>Equipo asignado:</strong> ${equipo}</p>
        <p><strong>Serie:</strong> ${serie}</p>
        <p><strong>Valor del equipo:</strong> $${precio}</p>
        <p><strong>Usuario responsable:</strong> ${usuario}</p>
        <p><strong>Fecha:</strong> ${fecha}</p>
    `;

    document.getElementById('previewContent').innerHTML = preview;
    document.getElementById('previewContainer').classList.add('active');
}
