
Built by https://www.blackbox.ai

---

# Consentimiento Informado

## Project Overview
El proyecto **Consentimiento Informado** proporciona una solución web para gestionar el consentimiento informado de pacientes que se someten a diversos procedimientos estéticos. Los usuarios pueden ingresar datos relevantes y generar un documento en formato PDF que incluye toda la información, firmada electrónicamente.

## Installation
Para ejecutar este proyecto localmente, sigue estos pasos:

1. **Clonar el repositorio**:
   ```bash
   git clone <url_del_repositorio>
   cd nombre_del_repositorio
   ```

2. **Abrir el archivo HTML**:
   Abre el archivo `index.html` en tu navegador web. Este archivo es la puerta de entrada a la aplicación.

## Usage
1. Completa el formulario con el nombre del paciente y selecciona el procedimiento.
2. Lee y acepta los riesgos, así como el aviso de privacidad.
3. Firma electrónicamente en el área proporcionada.
4. Haz clic en "Generar PDF" para obtener un documento con toda la información.

### Nota
Asegúrate de tener conexión a Internet para cargar las bibliotecas externas que son necesarias para el funcionamiento del formulario.

## Features
- Formulario interactivo para el ingreso de datos del paciente.
- Selección de procedimientos estéticos con información detallada sobre beneficios, riesgos y alternativas.
- Generación de un PDF firmado electrónicamente que se descarga automáticamente al completarse el formulario.
- Estilo atractivo y responsivo para su uso en dispositivos de diferentes tamaños.

## Dependencies
El proyecto utiliza las siguientes bibliotecas externas:

- **SignaturePad**: Para la captura de firmas electrónicas.
- **jsPDF**: Para la generación de documentos PDF.

Estas bibliotecas se cargan desde una red de entrega de contenido (CDN) a través de los siguientes enlaces en el archivo `index.html`:
```html
<script src="https://cdn.jsdelivr.net/npm/signature_pad@4.1.7/dist/signature_pad.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
```

## Project Structure
La estructura del proyecto es la siguiente:

```
/ConsentimientoInformado
│
├── index.html         # Archivo principal de la aplicación
├── style.css          # Estilos CSS para el diseño de la aplicación
└── main.js            # Lógica de la aplicación en JavaScript
```

Desglosando cada archivo:

- `index.html`: Contiene el formulario que los pacientes deben llenar, así como las configuraciones del documento HTML.
- `style.css`: Define los estilos visuales para el formulario y sus componentes.
- `main.js`: Implementa la lógica del formulario, maneja la generación del PDF y los eventos del usuario.

---

¡Gracias por usar **Consentimiento Informado**! Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue en el repositorio.