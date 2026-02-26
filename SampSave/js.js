let projects = [];

function showSection(sectionId) {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');
    
    // El menú principal desaparece en ciertas páginas según el PDF [cite: 291]
    if(sectionId === 'project-detail' || sectionId === 'add-audio') {
        document.getElementById('main-nav').classList.add('hidden');
    } else {
        document.getElementById('main-nav').classList.remove('hidden');
    }
}

function handleFileSelect(input) {
    if (input.files.length > 0) {
        document.getElementById('file-info').classList.remove('hidden');
        document.getElementById('file-name-display').innerText = "Archivo: " + input.files[0].name;
        const saveBtn = document.getElementById('save-btn');
        saveBtn.disabled = false;
        saveBtn.classList.add('active');
    }
}

function saveProject() {
    const name = document.getElementById('project-name').value;
    const version = document.getElementById('project-version').value;
    
    if(!name || !version) return alert("Pon nombre y versión");

    const project = {
        name: name,
        version: version,
        file: document.getElementById('file-input').files[0].name
    };

    projects.push(project);
    updateLibraryUI();
    showSection('library');
}

function updateLibraryUI() {
    const list = document.getElementById('projects-list');
    const emptyMsg = document.getElementById('empty-library');
    
    if(projects.length > 0) {
        emptyMsg.classList.add('hidden');
        list.innerHTML = projects.map((p, index) => `
            <div class="project-item">
                <div>
                    <strong>${p.name}</strong><br>
                    <small>${p.version}</small>
                </div>
                <button class="btn-open" onclick="openProject(${index})">Abrir</button>
            </div>
        `).join('');
    }
}

function openProject(index) {
    const p = projects[index];
    document.getElementById('current-project-title').innerText = p.name;
    document.getElementById('last-version-name').innerText = p.version;
    showSection('project-detail');
}
