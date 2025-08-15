# Generador de Credenciales RTM

Una aplicación web moderna para generar credenciales comerciales de proyectos enviando datos a un webhook de n8n.

## Características

- **Formulario intuitivo**: Interfaz limpia y moderna con validación de campos
- **Carga de archivos**: Soporte para archivos PDF, PPT y PPTX
- **Drag & Drop**: Funcionalidad de arrastrar y soltar archivos
- **Integración con webhook**: Envío automático de datos al webhook especificado
- **Visualización de resultados**: Muestra estructurada de la respuesta del webhook
- **Diseño responsivo**: Optimizado para dispositivos móviles y de escritorio

## Estructura del Proyecto

```
formulario-kevin/
├── index.html          # Página principal con el formulario
├── styles.css          # Estilos CSS modernos y responsivos
├── script.js           # Lógica JavaScript para manejo del formulario
└── README.md           # Este archivo
```

## Cómo usar

1. **Abrir la aplicación**: Abre `index.html` en tu navegador web
2. **Completar el formulario**:
   - Ingresa el nombre del cliente
   - Especifica el tema del proyecto
   - Sube la documentación (PDF, PPT o PPTX)
3. **Generar credencial**: Haz clic en "GENERAR CREDENCIAL COMERCIAL"
4. **Ver resultados**: La aplicación mostrará la credencial generada con:
   - Título del proyecto
   - Problema identificado
   - Solución implementada
   - Resultados cuantitativos y cualitativos

## Funcionalidades Técnicas

### Envío de Datos
- **Método**: POST
- **URL del webhook**: `https://n8n.dytiacademy.com/webhook/2934c10b-ec41-4e43-951a-83e6b57d60e3`
- **Formato**: FormData (multipart/form-data)
- **Campos enviados**:
  - `cliente`: Nombre del cliente
  - `tema`: Tema del proyecto
  - `documentacion`: Archivo subido

### Respuesta Esperada
El webhook responde con un JSON que contiene:
```json
{
  "Titulo_Proyecto": "Implementación del ZBB+",
  "Problema": "Descripción del problema...",
  "Solucion": "Descripción de la solución...",
  "Resultados_Cuantitativo": "Resultados cuantitativos",
  "Resultados_Cualitativo": "Resultados cualitativos"
}
```

## Características de la Interfaz

### Header
- Logo RTM con "Real Time Management"
- Título principal "Generador de Credenciales"
- Descripción del objetivo

### Formulario
- Campos de entrada con validación
- Botón de carga de archivos estilizado
- Indicador de archivo seleccionado
- Botón de envío con efectos visuales

### Resultados
- Sección que se muestra después del envío exitoso
- Tarjetas organizadas para cada sección de la credencial
- Diseño limpio y profesional

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con gradientes y animaciones
- **JavaScript ES6+**: Lógica de formulario y comunicación con webhook
- **Fetch API**: Para comunicación HTTP
- **FormData**: Para envío de archivos

## Compatibilidad

- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- Soporte para dispositivos móviles
- Funcionalidad offline para la interfaz (requiere conexión para el webhook)

## Instalación y Uso

1. Descarga todos los archivos en una carpeta
2. Abre `index.html` en tu navegador web
3. ¡Listo para usar!

No se requieren dependencias adicionales ni configuración de servidor.
