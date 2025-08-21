document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('credentialForm');
    const fileInput = document.getElementById('documentacion');
    const fileName = document.getElementById('file-name');
    const loadingSection = document.getElementById('loading');
    const resultsSection = document.getElementById('results');
    const submitBtn = document.querySelector('.submit-btn');

    // Webhook URL
    const WEBHOOK_URL = 'https://n8n.dytiacademy.com/webhook/2934c10b-ec41-4e43-951a-83e6b57d60e3';

    // Update file name when file is selected
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            fileName.textContent = file.name;
        } else {
            fileName.textContent = 'Ningún archivo seleccionado';
        }
    });

    // Handle form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form data
        const cliente = document.getElementById('cliente').value.trim();
        const tema = document.getElementById('tema').value.trim();
        const duracion = document.getElementById('duracion').value.trim();
        const fecha = document.getElementById('fecha').value;
        const file = fileInput.files[0];

        // Validate form
        if (!cliente || !tema || !duracion || !fecha || !file) {
            alert('Por favor, completa todos los campos requeridos.');
            return;
        }

        // Show loading state
        showLoading();

        try {
            // Create FormData to send file and text data
            const formData = new FormData();
            formData.append('cliente', cliente);
            formData.append('tema', tema);
            formData.append('duracion', duracion);
            formData.append('fecha', fecha);
            formData.append('documentacion', file);

            // Send data to webhook
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Display results
            displayResults(data);

        } catch (error) {
            console.error('Error:', error);
            alert('Error al generar la credencial. Por favor, intenta nuevamente.');
            hideLoading();
        }
    });

    function showLoading() {
        loadingSection.style.display = 'block';
        resultsSection.style.display = 'none';
        submitBtn.disabled = true;
        submitBtn.textContent = 'GENERANDO...';
    }

    function hideLoading() {
        loadingSection.style.display = 'none';
        submitBtn.disabled = false;
        submitBtn.textContent = 'GENERAR CREDENCIAL COMERCIAL';
    }

    function displayResults(data) {
        // Populate result fields
        document.getElementById('titulo-proyecto').textContent = data.Titulo_Proyecto || 'No disponible';
        document.getElementById('problema').textContent = data.Problema || 'No disponible';
        document.getElementById('solucion').textContent = data.Solucion || 'No disponible';
        document.getElementById('resultados-cuantitativo').textContent = data.Resultados_Cuantitativo || 'No disponible';
        document.getElementById('resultados-cualitativo').textContent = data.Resultados_Cualitativo || 'No disponible';

        // Show results section
        resultsSection.style.display = 'block';
        hideLoading();

        // Scroll to results
        resultsSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }

    // Add some visual feedback for form interactions
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });

    // Add file drag and drop functionality
    const fileUploadContainer = document.querySelector('.file-upload-container');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        fileUploadContainer.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileUploadContainer.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileUploadContainer.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        fileUploadContainer.style.border = '2px dashed #2a5298';
        fileUploadContainer.style.backgroundColor = 'rgba(42, 82, 152, 0.1)';
    }

    function unhighlight(e) {
        fileUploadContainer.style.border = 'none';
        fileUploadContainer.style.backgroundColor = 'transparent';
    }

    fileUploadContainer.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length > 0) {
            const file = files[0];
            
            // Check if file type is allowed
            const allowedTypes = ['.pdf', '.ppt', '.pptx'];
            const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
            
            if (allowedTypes.includes(fileExtension)) {
                fileInput.files = files;
                fileName.textContent = file.name;
            } else {
                alert('Por favor, selecciona un archivo PDF, PPT o PPTX.');
            }
        }
    }
});
