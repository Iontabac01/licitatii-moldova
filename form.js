// Form functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    setupEventListeners();
    setMinDateTime();
});

function initializeForm() {
    // Character counter
    const descriptionTextarea = document.getElementById('description');
    const descriptionCount = document.getElementById('descriptionCount');
    
    if (descriptionTextarea && descriptionCount) {
        descriptionTextarea.addEventListener('input', function() {
            const count = this.value.length;
            descriptionCount.textContent = count;
            
            if (count > 500) {
                descriptionCount.style.color = 'var(--danger-color)';
            } else if (count > 400) {
                descriptionCount.style.color = 'var(--warning-color)';
            } else {
                descriptionCount.style.color = 'var(--text-secondary)';
            }
        });
    }
}

function setupEventListeners() {
    // File upload
    const fileUploadArea = document.getElementById('fileUploadArea');
    const fileInput = document.getElementById('fileInput');
    
    if (fileUploadArea && fileInput) {
        fileUploadArea.addEventListener('click', () => fileInput.click());
        fileUploadArea.addEventListener('dragover', handleDragOver);
        fileUploadArea.addEventListener('drop', handleFileDrop);
        fileInput.addEventListener('change', handleFileSelect);
    }
    
    // Form submission
    const form = document.getElementById('auctionForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    // Rich text editor
    setupRichTextEditor();
}

function setMinDateTime() {
    const deadlineInput = document.getElementById('deadline');
    const startDateInput = document.getElementById('startDate');
    
    if (deadlineInput) {
        const now = new Date();
        now.setDate(now.getDate() + 1); // Minimum 1 day from now
        const minDateTime = now.toISOString().slice(0, 16);
        deadlineInput.min = minDateTime;
    }
    
    if (startDateInput) {
        const today = new Date().toISOString().slice(0, 10);
        startDateInput.min = today;
    }
}

// Rich Text Editor Functions
function setupRichTextEditor() {
    const editor = document.getElementById('fullDescription');
    if (!editor) return;
    
    editor.addEventListener('keydown', function(e) {
        // Handle basic keyboard shortcuts
        if (e.ctrlKey) {
            switch(e.key) {
                case 'b':
                    e.preventDefault();
                    formatText('bold');
                    break;
                case 'i':
                    e.preventDefault();
                    formatText('italic');
                    break;
            }
        }
    });
    
    // Update toolbar buttons based on selection
    editor.addEventListener('selectionchange', updateToolbar);
    document.addEventListener('selectionchange', updateToolbar);
}

function formatText(command) {
    const editor = document.getElementById('fullDescription');
    if (!editor) return;
    
    editor.focus();
    document.execCommand(command, false, null);
    updateToolbar();
}

function updateToolbar() {
    const commands = ['bold', 'italic'];
    commands.forEach(command => {
        const button = document.querySelector(`[onclick="formatText('${command}')"]`);
        if (button) {
            if (document.queryCommandState(command)) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        }
    });
}

// Requirements Management
function addRequirement() {
    const container = document.getElementById('requirementsContainer');
    if (!container) return;
    
    const requirementItem = document.createElement('div');
    requirementItem.className = 'requirement-item';
    requirementItem.innerHTML = `
        <input type="text" class="requirement-input" placeholder="Introdu o cerință...">
        <button type="button" class="remove-requirement" onclick="removeRequirement(this)">×</button>
    `;
    
    container.appendChild(requirementItem);
    
    // Focus on the new input
    const newInput = requirementItem.querySelector('.requirement-input');
    newInput.focus();
}

function removeRequirement(button) {
    const container = document.getElementById('requirementsContainer');
    const requirementItem = button.parentElement;
    
    // Don't remove if it's the only requirement
    if (container.children.length > 1) {
        requirementItem.remove();
    } else {
        // Clear the input instead
        const input = requirementItem.querySelector('.requirement-input');
        input.value = '';
    }
}

// File Upload Functions
function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('dragover');
}

function handleFileDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('dragover');
    
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
}

function handleFileSelect(e) {
    const files = Array.from(e.target.files);
    processFiles(files);
}

function processFiles(files) {
    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    files.forEach(file => {
        if (!allowedTypes.includes(file.type)) {
            showMessage(`Fișierul "${file.name}" nu este de un tip acceptat.`, 'error');
            return;
        }
        
        if (file.size > maxSize) {
            showMessage(`Fișierul "${file.name}" este prea mare (max 10MB).`, 'error');
            return;
        }
        
        addFileToList(file);
    });
}

function addFileToList(file) {
    const uploadedFiles = document.getElementById('uploadedFiles');
    if (!uploadedFiles) return;
    
    const fileElement = document.createElement('div');
    fileElement.className = 'uploaded-file';
    fileElement.innerHTML = `
        <div class="file-info">
            <span class="file-icon">${getFileIcon(file.type)}</span>
            <div class="file-details">
                <span class="file-name">${file.name}</span>
                <span class="file-size">${formatFileSize(file.size)}</span>
            </div>
        </div>
        <button type="button" class="remove-file" onclick="removeFile(this)">×</button>
    `;
    
    uploadedFiles.appendChild(fileElement);
}

function getFileIcon(type) {
    if (type.includes('pdf')) return '📄';
    if (type.includes('word')) return '📝';
    if (type.includes('excel') || type.includes('sheet')) return '📊';
    return '📁';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function removeFile(button) {
    button.parentElement.remove();
}

// Form Validation
function validateForm() {
    const requiredFields = [
        'title',
        'category',
        'description',
        'estimatedValue',
        'deadline',
        'organizer',
        'contactName',
        'contactPhone',
        'contactEmail'
    ];
    
    let isValid = true;
    const errors = [];
    
    requiredFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (!field) return;
        
        removeFieldError(field);
        
        if (!field.value.trim()) {
            showFieldError(field, 'Acest câmp este obligatoriu');
            isValid = false;
        } else {
            // Specific validation
            switch(fieldName) {
                case 'contactEmail':
                    if (!isValidEmail(field.value)) {
                        showFieldError(field, 'Adresa de email nu este validă');
                        isValid = false;
                    }
                    break;
                case 'contactPhone':
                    if (!isValidPhone(field.value)) {
                        showFieldError(field, 'Numărul de telefon nu este valid');
                        isValid = false;
                    }
                    break;
                case 'estimatedValue':
                    if (parseFloat(field.value) <= 0) {
                        showFieldError(field, 'Valoarea trebuie să fie mai mare decât 0');
                        isValid = false;
                    }
                    break;
                case 'deadline':
                    const deadline = new Date(field.value);
                    const now = new Date();
                    if (deadline <= now) {
                        showFieldError(field, 'Data limită trebuie să fie în viitor');
                        isValid = false;
                    }
                    break;
            }
        }
    });
    
    // Validate requirements
    const requirements = getRequirements();
    if (requirements.length === 0 || requirements.every(req => !req.trim())) {
        const container = document.getElementById('requirementsContainer');
        showMessage('Adaugă cel puțin o cerință de participare', 'error');
        container.scrollIntoView({ behavior: 'smooth' });
        isValid = false;
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('invalid');
    
    let errorElement = field.parentElement.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        field.parentElement.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function removeFieldError(field) {
    field.classList.remove('invalid');
    const errorElement = field.parentElement.querySelector('.field-error');
    if (errorElement) {
        errorElement.classList.remove('show');
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^\+373\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/;
    return phoneRegex.test(phone);
}

// Form Submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        showMessage('Te rugăm să corectezi erorile din formular', 'error');
        return;
    }
    
    const formData = collectFormData();
    submitAuction(formData);
}

function collectFormData() {
    const formData = {
        title: document.getElementById('title').value,
        category: document.getElementById('category').value,
        description: document.getElementById('description').value,
        fullDescription: document.getElementById('fullDescription').innerHTML,
        estimatedValue: parseFloat(document.getElementById('estimatedValue').value),
        deadline: document.getElementById('deadline').value,
        startDate: document.getElementById('startDate').value,
        duration: document.getElementById('duration').value,
        requirements: getRequirements(),
        organizer: document.getElementById('organizer').value,
        contact: {
            name: document.getElementById('contactName').value,
            phone: document.getElementById('contactPhone').value,
            email: document.getElementById('contactEmail').value
        },
        settings: {
            public: document.getElementById('publicAuction').checked,
            emailNotifications: document.getElementById('emailNotifications').checked
        },
        files: getUploadedFiles()
    };
    
    return formData;
}

function getRequirements() {
    const inputs = document.querySelectorAll('.requirement-input');
    return Array.from(inputs)
        .map(input => input.value.trim())
        .filter(value => value.length > 0);
}

function getUploadedFiles() {
    const fileElements = document.querySelectorAll('.uploaded-file');
    return Array.from(fileElements).map(element => {
        const fileName = element.querySelector('.file-name').textContent;
        const fileSize = element.querySelector('.file-size').textContent;
        return { name: fileName, size: fileSize };
    });
}

function submitAuction(formData) {
    const form = document.getElementById('auctionForm');
    form.classList.add('form-loading');
    
    // Simulate API call
    setTimeout(() => {
        form.classList.remove('form-loading');
        
        // Simulate successful submission
        showMessage('Licitația a fost publicată cu succes!', 'success');
        
        // Reset form after successful submission
        setTimeout(() => {
            if (confirm('Licitația a fost publicată. Doriți să adăugați o nouă licitație?')) {
                resetForm();
            } else {
                window.location.href = 'index.html';
            }
        }, 2000);
    }, 2000);
}

function saveDraft() {
    const formData = collectFormData();
    
    // Save to localStorage as draft
    localStorage.setItem('auctionDraft', JSON.stringify(formData));
    showMessage('Ciorna a fost salvată cu succes!', 'success');
}

function loadDraft() {
    const draft = localStorage.getItem('auctionDraft');
    if (!draft) return;
    
    try {
        const formData = JSON.parse(draft);
        populateForm(formData);
        showMessage('Ciorna a fost încărcată!', 'success');
    } catch (error) {
        console.error('Error loading draft:', error);
    }
}

function populateForm(formData) {
    // Populate basic fields
    Object.keys(formData).forEach(key => {
        const field = document.getElementById(key);
        if (field && typeof formData[key] === 'string') {
            field.value = formData[key];
        }
    });
    
    // Populate contact fields
    if (formData.contact) {
        document.getElementById('contactName').value = formData.contact.name || '';
        document.getElementById('contactPhone').value = formData.contact.phone || '';
        document.getElementById('contactEmail').value = formData.contact.email || '';
    }
    
    // Populate settings
    if (formData.settings) {
        document.getElementById('publicAuction').checked = formData.settings.public !== false;
        document.getElementById('emailNotifications').checked = formData.settings.emailNotifications !== false;
    }
    
    // Populate requirements
    if (formData.requirements && formData.requirements.length > 0) {
        const container = document.getElementById('requirementsContainer');
        container.innerHTML = '';
        
        formData.requirements.forEach(requirement => {
            const requirementItem = document.createElement('div');
            requirementItem.className = 'requirement-item';
            requirementItem.innerHTML = `
                <input type="text" class="requirement-input" value="${requirement}">
                <button type="button" class="remove-requirement" onclick="removeRequirement(this)">×</button>
            `;
            container.appendChild(requirementItem);
        });
    }
}

function resetForm() {
    document.getElementById('auctionForm').reset();
    document.getElementById('uploadedFiles').innerHTML = '';
    document.getElementById('fullDescription').innerHTML = '';
    
    // Reset requirements to single empty item
    const container = document.getElementById('requirementsContainer');
    container.innerHTML = `
        <div class="requirement-item">
            <input type="text" class="requirement-input" placeholder="Ex: Experiență de minimum 5 ani">
            <button type="button" class="remove-requirement" onclick="removeRequirement(this)">×</button>
        </div>
    `;
    
    // Clear any error messages
    document.querySelectorAll('.field-error').forEach(error => error.remove());
    document.querySelectorAll('.invalid').forEach(field => field.classList.remove('invalid'));
    
    hideMessage();
}

function showMessage(text, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const message = document.createElement('div');
    message.className = `form-message ${type}`;
    message.textContent = text;
    message.style.display = 'block';
    
    const form = document.getElementById('auctionForm');
    form.parentElement.insertBefore(message, form);
    
    // Auto-hide success messages
    if (type === 'success') {
        setTimeout(() => {
            message.style.display = 'none';
        }, 5000);
    }
    
    // Scroll to message
    message.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function hideMessage() {
    const message = document.querySelector('.form-message');
    if (message) {
        message.style.display = 'none';
    }
}

// Check for draft on page load
window.addEventListener('load', function() {
    const hasDraft = localStorage.getItem('auctionDraft');
    if (hasDraft) {
        const loadDraftConfirm = confirm('S-a găsit o ciornă salvată. Doriți să o încărcați?');
        if (loadDraftConfirm) {
            loadDraft();
        }
    }
});