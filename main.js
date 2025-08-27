document.addEventListener("DOMContentLoaded", () => {
  // Verificar que las librerías estén cargadas
  if (typeof SignaturePad === 'undefined' || typeof window.jspdf === 'undefined') {
    alert('Error: Las librerías necesarias no se han cargado correctamente. Por favor, recarga la página.');
    return;
  }

  // Inicializar fecha
  const currentDateSpan = document.getElementById('currentDate');
  const consentDateInput = document.getElementById('consentDate');
  const today = new Date();
  const displayDate = today.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  currentDateSpan.textContent = displayDate;
  consentDateInput.value = today.toISOString().split('T')[0];

  // Inicializar SignaturePad
  const canvas = document.getElementById('signature-pad');
  const signaturePad = new SignaturePad(canvas, {
    backgroundColor: 'rgb(255, 255, 255)',
    penColor: 'rgb(0, 0, 0)',
    velocityFilterWeight: 0.7,
    minWidth: 0.5,
    maxWidth: 2.5,
    throttle: 16,
    minPointDistance: 3
  });

  // Ajustar el canvas para alta resolución
  function resizeCanvas() {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
    signaturePad.clear();
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // Botón limpiar firma
  document.getElementById('clearSignature').addEventListener('click', () => {
    signaturePad.clear();
  });

  // Información detallada de procedimientos
  const infoProcedimientos = {
    Botox: `<strong>Botox (Toxina Botulínica)</strong><br><br>
            <strong>Beneficios:</strong> El Botox relaja temporalmente los músculos responsables de las arrugas faciales, mejorando la apariencia de líneas de expresión. También se utiliza para tratar migrañas, hiperhidrosis (sudoración excesiva) y vejiga hiperactiva.<br><br>
            <strong>Riesgos y efectos secundarios:</strong> Puede causar dolor, hinchazón, enrojecimiento o moretones en el lugar de la inyección, síntomas similares a la gripe, dolor de cabeza, dolor de cuello, malestar estomacal, caída temporal del párpado e irritación ocular. En casos raros, puede haber dificultad para tragar o hablar.<br><br>
            <strong>Alternativas:</strong> Otros rellenos dérmicos, procedimientos láser, radiofrecuencia, o tratamientos tópicos antienvejecimiento.`,

    Radiesse: `<strong>Radiesse (Hidroxiapatita de Calcio)</strong><br><br>
               <strong>Beneficios:</strong> Proporciona resultados inmediatos y duraderos (más de un año). Su composición biocompatible reduce el riesgo de reacciones alérgicas y puede mezclarse con lidocaína para mayor comodidad. Estimula la producción natural de colágeno y requiere menos sesiones de retoque.<br><br>
               <strong>Riesgos y efectos secundarios:</strong> Puede producir enrojecimiento, hinchazón, picazón, moretones, sensibilidad, irritación, dolor de cabeza o náusea. En casos raros se pueden formar nódulos que requieren tratamiento con esteroides o intervención quirúrgica.<br><br>
               <strong>Alternativas:</strong> Otros rellenos dérmicos como ácido hialurónico, Sculptra, tratamientos láser o procedimientos de lifting no quirúrgico.`,

    HIFU: `<strong>HIFU (Ultrasonido Focalizado de Alta Intensidad)</strong><br><br>
           <strong>Beneficios:</strong> El ultrasonido focalizado de alta intensidad tensa la piel, disminuye la flacidez y reduce las arrugas sin necesidad de cirugía. Mejora la elasticidad y textura de la piel, y los resultados pueden durar aproximadamente un año. Es un procedimiento no invasivo.<br><br>
           <strong>Riesgos y efectos secundarios:</strong> Puede causar molestias durante el tratamiento, enrojecimiento o hinchazón temporales, hormigueo, entumecimiento o moretones que suelen desaparecer en pocas semanas. Raramente puede causar quemaduras superficiales.<br><br>
           <strong>Alternativas:</strong> Otros tratamientos no quirúrgicos como radiofrecuencia, láser, tratamientos con hilos tensores o lifting quirúrgico tradicional.`,

    Sculptra: `<strong>Sculptra (Ácido Poli-L-Láctico)</strong><br><br>
               <strong>Beneficios:</strong> Es un bioestimulador que estimula la producción natural de colágeno, mejora gradualmente la apariencia de las arrugas y proporciona resultados naturales que pueden durar más de dos años. Es ideal para restaurar volumen facial perdido.<br><br>
               <strong>Riesgos y efectos secundarios:</strong> Puede provocar hinchazón, moretones, decoloración temporal de la piel, molestias en el sitio de inyección, picazón o formación de pequeños bultos bajo la piel que generalmente se resuelven con masajes.<br><br>
               <strong>Alternativas:</strong> Rellenos de ácido hialurónico, Radiesse, tratamientos láser, radiofrecuencia u otros procedimientos de rejuvenecimiento facial.`,

    Facial: `<strong>Facial Personalizado Avanzado</strong><br><br>
             <strong>Beneficios:</strong> Este tratamiento facial personalizado puede incluir microdermabrasión con punta de diamante, terapia con luz LED, peeling enzimático, aplicación de exosomas PDRN y limpieza profunda con extracción de comedones. Mejora significativamente la textura de la piel, reduce manchas y poros dilatados, y promueve la regeneración celular.<br><br>
             <strong>Riesgos y efectos secundarios:</strong> La microdermabrasión puede causar enrojecimiento temporal, sensibilidad o sequedad; la terapia LED raramente causa irritación; los peelings enzimáticos pueden causar enrojecimiento leve o descamación; los exosomas pueden causar enrojecimiento o hinchazón mínima.<br><br>
             <strong>Alternativas:</strong> Tratamientos faciales básicos, peelings químicos superficiales, procedimientos con láser fraccional, radiofrecuencia o microagujas.`,

    AcidoHialuronico: `<strong>Ácido Hialurónico</strong><br><br>
                       <strong>Beneficios:</strong> Es un relleno dérmico que restaura volumen, mejora la hidratación de la piel y suaviza arrugas y pliegues. Sus resultados son inmediatos y pueden durar de 6 a 18 meses según el producto y la zona tratada. Es ideal para labios, surcos nasogenianos, pómulos y ojeras.<br><br>
                       <strong>Riesgos y efectos secundarios:</strong> Pueden presentarse enrojecimiento, hinchazón, moretones, sensibilidad o pequeños nódulos en el sitio de aplicación. En casos muy raros, pueden ocurrir complicaciones vasculares que requieren atención inmediata.<br><br>
                       <strong>Alternativas:</strong> Bioestimuladores como Sculptra o Radiesse, toxina botulínica, láser o procedimientos combinados de rejuvenecimiento facial.`,

    DepilacionLaser: `<strong>Depilación Láser</strong><br><br>
                      <strong>Beneficios:</strong> Reduce de manera progresiva y duradera el vello no deseado. La piel se vuelve más suave, disminuyen los problemas de foliculitis y los resultados son visibles desde las primeras sesiones. Se puede aplicar en rostro y cuerpo.<br><br>
                      <strong>Riesgos y efectos secundarios:</strong> Puede ocasionar enrojecimiento temporal, ligera inflamación o sensación de ardor, los cuales suelen desaparecer en pocas horas. En pieles sensibles puede existir riesgo de cambios en la pigmentación o irritación prolongada.<br><br>
                      <strong>Alternativas:</strong> Depilación con cera, rasurado, cremas depilatorias o depilación con luz pulsada (IPL).`,

    AparatologiaCorporal: `<strong>Tratamientos Corporales con Aparatología</strong><br><br>
                           <strong>Beneficios:</strong> Incluyen tecnologías como radiofrecuencia, cavitación, ultrasonido focalizado y presoterapia. Ayudan a reducir grasa localizada, mejorar la flacidez, estimular el drenaje linfático y mejorar la apariencia de la celulitis. Los resultados son progresivos y mejoran la silueta corporal sin cirugía.<br><br>
                           <strong>Riesgos y efectos secundarios:</strong> Enrojecimiento, calor localizado, pequeñas molestias o hinchazón transitoria. Con un uso adecuado y supervisión médica, los riesgos son mínimos.<br><br>
                           <strong>Alternativas:</strong> Liposucción, lipoescultura no quirúrgica, masajes reductivos, dieta y ejercicio supervisados.`
  };

  // Evento para mostrar información del procedimiento
  document.getElementById('procedureName').addEventListener('change', function() {
    const selected = this.value;
    const infoDiv = document.getElementById('infoProcedimiento');
    const risksLabel = document.getElementById('risksLabel');

    if (selected && infoProcedimientos[selected]) {
      infoDiv.innerHTML = infoProcedimientos[selected];
      infoDiv.classList.remove('hidden');
      risksLabel.classList.remove('hidden');
    } else {
      infoDiv.classList.add('hidden');
      risksLabel.classList.add('hidden');
    }
  });

  // Función para validar el formulario
  function validateForm() {
    const patientName = document.getElementById('patientName').value.trim();
    const procedureName = document.getElementById('procedureName').value;
    const acceptRisks = document.getElementById('acceptRisks');
    const acceptPrivacy = document.getElementById('acceptPrivacy').checked;

    if (!patientName) {
      alert('Por favor, ingrese el nombre del paciente.');
      return false;
    }

    if (!procedureName) {
      alert('Por favor, seleccione un procedimiento.');
      return false;
    }

    if (acceptRisks && !acceptRisks.checked) {
      alert('Debe aceptar los riesgos, beneficios y alternativas del procedimiento.');
      return false;
    }

    if (!acceptPrivacy) {
      alert('Debe aceptar el Aviso de Privacidad.');
      return false;
    }

    if (signaturePad.isEmpty()) {
      alert('Por favor, firme antes de generar el PDF.');
      return false;
    }

    return true;
  }

  // Función para generar PDF
  function generatePDF(formData) {
    try {
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Configuración de márgenes y espaciado
      const margin = 20;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const contentWidth = pageWidth - (margin * 2);
      let currentY = margin;

      // Función para agregar nueva página si es necesario
      function checkPageBreak(neededHeight) {
        if (currentY + neededHeight > pageHeight - margin) {
          pdf.addPage();
          currentY = margin;
        }
      }

      // Encabezado
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.text('CONSENTIMIENTO INFORMADO', pageWidth / 2, currentY, { align: 'center' });
      currentY += 15;

      // Línea separadora
      pdf.setDrawColor(59, 130, 246);
      pdf.setLineWidth(0.5);
      pdf.line(margin, currentY, pageWidth - margin, currentY);
      currentY += 10;

      // Información básica
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      
      const basicInfo = [
        `Fecha: ${formData.displayDate}`,
        `Paciente: ${formData.patientName}`,
        `Procedimiento: ${formData.procedureName}`,
        `Doctor: ${formData.doctorName}`,
        `Cédula Profesional: ${formData.doctorLicense}`
      ];

      basicInfo.forEach(info => {
        checkPageBreak(8);
        pdf.text(info, margin, currentY);
        currentY += 8;
      });

      currentY += 5;

      // Información del procedimiento
      checkPageBreak(15);
      pdf.setFont('helvetica', 'bold');
      pdf.text('INFORMACIÓN DEL PROCEDIMIENTO:', margin, currentY);
      currentY += 8;

      pdf.setFont('helvetica', 'normal');
      // Convertir HTML a texto plano y dividir en líneas
      const procedureText = formData.procedureInfo
        .replace(/<br><br>/g, '\n\n')
        .replace(/<br>/g, '\n')
        .replace(/<strong>/g, '')
        .replace(/<\/strong>/g, '')
        .replace(/&nbsp;/g, ' ');

      const lines = pdf.splitTextToSize(procedureText, contentWidth);
      
      lines.forEach(line => {
        checkPageBreak(6);
        pdf.text(line, margin, currentY);
        currentY += 6;
      });

      currentY += 10;

      // Consentimientos
      checkPageBreak(25);
      pdf.setFont('helvetica', 'bold');
      pdf.text('CONSENTIMIENTOS:', margin, currentY);
      currentY += 8;

      pdf.setFont('helvetica', 'normal');
      const consents = [
        `✓ Acepta riesgos y alternativas: ${formData.acceptRisks ? 'SÍ' : 'NO'}`,
        `✓ Autoriza uso de imágenes: ${formData.acceptImages ? 'SÍ' : 'NO'}`,
        `✓ Acepta Aviso de Privacidad: ${formData.acceptPrivacy ? 'SÍ' : 'NO'}`
      ];

      consents.forEach(consent => {
        checkPageBreak(6);
        pdf.text(consent, margin, currentY);
        currentY += 6;
      });

      currentY += 10;

      // Firma
      checkPageBreak(70);
      pdf.setFont('helvetica', 'bold');
      pdf.text('FIRMA DEL PACIENTE:', margin, currentY);
      currentY += 10;

      // Agregar imagen de la firma
      try {
        const signatureImg = formData.signature;
        const imgWidth = 80;
        const imgHeight = 40;
        
        pdf.addImage(signatureImg, 'PNG', margin, currentY, imgWidth, imgHeight);
        currentY += imgHeight + 5;
        
        // Línea para la firma
        pdf.setDrawColor(0, 0, 0);
        pdf.setLineWidth(0.3);
        pdf.line(margin, currentY, margin + imgWidth, currentY);
        currentY += 5;
        
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        pdf.text('Firma del Paciente', margin, currentY);
        currentY += 8;
        
        // Texto adicional debajo de la firma
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'italic');
        const disclaimerText = 'Al firmar este documento acepta haber leído y resuelto todas sus dudas, y acepta los riesgos y beneficios.';
        const wrappedText = pdf.splitTextToSize(disclaimerText, contentWidth);
        wrappedText.forEach(line => {
          pdf.text(line, margin, currentY);
          currentY += 5;
        });
      } catch (imgError) {
        console.error('Error al agregar la firma:', imgError);
        pdf.text('Error al cargar la firma', margin, currentY);
        currentY += 10;
      }

      // Pie de página
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'italic');
      pdf.text(`Documento generado el ${new Date().toLocaleString('es-MX')}`, 
               pageWidth / 2, pageHeight - 10, { align: 'center' });

      // Guardar el PDF
      const fileName = `Consentimiento_${formData.patientName.replace(/\s+/g, '_')}_${formData.procedureName}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);

      return true;
    } catch (error) {
      console.error('Error generando PDF:', error);
      alert('Error al generar el PDF. Por favor, inténtelo de nuevo.\nDetalle: ' + error.message);
      return false;
    }
  }

  // Evento de envío del formulario
  document.getElementById('consent-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Recopilar datos del formulario
    const formData = {
      timestamp: new Date().toISOString(),
      displayDate: displayDate,
      patientName: document.getElementById('patientName').value.trim(),
      procedureName: document.getElementById('procedureName').value,
      doctorName: document.getElementById('doctorName').value,
      doctorLicense: document.getElementById('doctorLicense').value,
      consentDate: consentDateInput.value,
      acceptRisks: document.getElementById('acceptRisks') ? document.getElementById('acceptRisks').checked : false,
      acceptImages: document.querySelector('input[name="acceptImages"]:checked').value === 'yes',
      acceptPrivacy: document.getElementById('acceptPrivacy').checked,
      procedureInfo: document.getElementById('infoProcedimiento').innerHTML,
      signature: signaturePad.toDataURL('image/png', 1.0)
    };

    // Mostrar indicador de carga
    const submitButton = document.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Generando PDF...';
    submitButton.disabled = true;

    // Generar PDF
    const success = generatePDF(formData);

    if (success) {
      // Resetear formulario
      document.getElementById('consent-form').reset();
      signaturePad.clear();
      document.getElementById('infoProcedimiento').classList.add('hidden');
      document.getElementById('risksLabel').classList.add('hidden');
      
      // Restaurar fecha
      currentDateSpan.textContent = displayDate;
      consentDateInput.value = today.toISOString().split('T')[0];

      alert('¡PDF generado exitosamente! El archivo se ha descargado automáticamente.');
    }

    // Restaurar botón
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  });

  console.log('Aplicación de Consentimiento Informado inicializada correctamente.');
});
