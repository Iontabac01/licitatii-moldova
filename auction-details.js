// Auction details page functionality
document.addEventListener('DOMContentLoaded', function() {
    loadAuctionDetails();
    startCountdownTimer();
});

function loadAuctionDetails() {
    const auctionId = localStorage.getItem('selectedAuctionId');
    
    if (!auctionId) {
        showErrorMessage();
        return;
    }
    
    // In a real application, this would be an API call
    const auction = getAuctionById(parseInt(auctionId));
    
    if (!auction) {
        showErrorMessage();
        return;
    }
    
    renderAuctionDetails(auction);
}

function getAuctionById(id) {
    // Get auction data from the main script
    const auctionsData = window.auctionsData || [
        {
            id: 1,
            title: "Modernizarea sistemului de iluminat public în municipiul Chișinău",
            description: "Achiziționarea și instalarea unui sistem modern de iluminat public cu LED-uri pentru străzile principale din centrul capitalei.",
            fullDescription: `
                <p>Această licitație are ca obiectiv modernizarea completă a sistemului de iluminat public din municipiul Chișinău prin implementarea tehnologiei LED de ultimă generație.</p>
                
                <h4>Obiectivele proiectului:</h4>
                <ul>
                    <li>Reducerea consumului de energie cu până la 70%</li>
                    <li>Îmbunătățirea calității iluminatului public</li>
                    <li>Reducerea costurilor de întreținere</li>
                    <li>Creșterea siguranței cetățenilor</li>
                </ul>
                
                <h4>Zonele vizate:</h4>
                <p>Proiectul va acoperi aproximativ 15 km de străzi principale din centrul istoric al capitalei, incluzând:</p>
                <ul>
                    <li>Bulevardul Ștefan cel Mare și Sfânt</li>
                    <li>Strada 31 August 1989</li>
                    <li>Bulevardul Dacia</li>
                    <li>Piața Marii Adunări Naționale</li>
                </ul>
            `,
            category: "constructii",
            price: "2,500,000 MDL",
            deadline: "2024-01-15",
            status: "active",
            participants: 8,
            timeLeft: "5 zile",
            organizer: "Primăria municipiului Chișinău",
            contact: {
                name: "Ion Popescu",
                phone: "+373 22 22 22 22",
                email: "licitatii@chisinau.md"
            },
            requirements: [
                "Experiență de minimum 5 ani în domeniul iluminatului public",
                "Certificare ISO 9001:2015",
                "Echipa tehnică cu minimum 10 specialiști",
                "Garanție de minimum 5 ani pentru echipamente",
                "Respectarea standardelor europene de eficiență energetică"
            ],
            documents: [
                { name: "Caietul de sarcini.pdf", url: "#" },
                { name: "Specificații tehnice.pdf", url: "#" },
                { name: "Planul zonei.dwg", url: "#" },
                { name: "Regulamentul licitației.pdf", url: "#" }
            ],
            timeline: [
                { date: "10.12.2023", event: "Publicarea licitației", completed: true },
                { date: "20.12.2023", event: "Sesiunea de clarificări", completed: true },
                { date: "15.01.2024", event: "Data limită pentru depunerea ofertelor", current: true },
                { date: "20.01.2024", event: "Evaluarea ofertelor", completed: false },
                { date: "25.01.2024", event: "Anunțarea câștigătorului", completed: false }
            ]
        }
        // Add more detailed auction data as needed
    ];
    
    return auctionsData.find(auction => auction.id === id);
}

function renderAuctionDetails(auction) {
    const auctionDetail = document.getElementById('auctionDetail');
    
    auctionDetail.innerHTML = `
        <div class="auction-main">
            <div class="auction-title-section">
                <h1 class="auction-title-main">${auction.title}</h1>
                <div class="auction-meta">
                    <span class="auction-category-large">${getCategoryText(auction.category)}</span>
                    <span class="auction-id">ID: #${auction.id.toString().padStart(6, '0')}</span>
                    <div class="auction-status-large ${getStatusIndicator(auction.status)}">
                        <span class="status-indicator ${getStatusIndicator(auction.status)}"></span>
                        ${getStatusText(auction.status)}
                    </div>
                </div>
            </div>
            
            <div class="auction-description-full">
                ${auction.fullDescription || `<p>${auction.description}</p>`}
            </div>
            
            <div class="auction-section">
                <h3>Cerințe de participare</h3>
                <ul class="requirements-list">
                    ${auction.requirements ? auction.requirements.map(req => `<li>${req}</li>`).join('') : '<li>Informațiile vor fi actualizate în curând</li>'}
                </ul>
            </div>
            
            <div class="auction-section">
                <h3>Documente anexe</h3>
                <ul class="documents-list">
                    ${auction.documents ? auction.documents.map(doc => `
                        <li><a href="${doc.url}" target="_blank">${doc.name}</a></li>
                    `).join('') : '<li>Nu sunt documente disponibile</li>'}
                </ul>
            </div>
            
            <div class="auction-section">
                <h3>Cronologia licitației</h3>
                <div class="timeline">
                    ${auction.timeline ? auction.timeline.map(item => `
                        <div class="timeline-item ${item.completed ? 'completed' : ''} ${item.current ? 'current' : ''}">
                            <div class="timeline-date">${item.date}</div>
                            <div class="timeline-event">${item.event}</div>
                        </div>
                    `).join('') : '<div class="timeline-item">Cronologia va fi actualizată în curând</div>'}
                </div>
            </div>
        </div>
        
        <div class="auction-sidebar">
            <div class="sidebar-card price-card">
                <div class="price-amount">${auction.price}</div>
                <div class="price-label">Valoarea estimată</div>
            </div>
            
            <div class="sidebar-card countdown-card">
                <div class="countdown-timer" id="countdownTimer">${auction.timeLeft}</div>
                <div class="countdown-label">Timp rămas</div>
            </div>
            
            <div class="sidebar-card info-card">
                <h4>Informații generale</h4>
                <div class="info-item">
                    <span class="info-label">Organizator</span>
                    <span class="info-value">${auction.organizer || 'Nespecificat'}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Participanți</span>
                    <span class="info-value">${auction.participants}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Data limită</span>
                    <span class="info-value">${formatDate(auction.deadline)}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Status</span>
                    <span class="info-value">${getStatusText(auction.status)}</span>
                </div>
            </div>
            
            <div class="sidebar-card participation-card">
                <button class="btn btn-primary participation-button" onclick="participateInAuction(${auction.id})">
                    ${auction.status === 'active' ? 'Participă la Licitație' : 'Vezi Statusul'}
                </button>
                <div class="participation-info">
                    ${auction.status === 'active' ? 
                        'Ofertele pot fi depuse până la data limită.' : 
                        'Licitația nu este încă activă.'
                    }
                </div>
            </div>
            
            ${auction.contact ? `
                <div class="sidebar-card contact-card">
                    <h4>Contact</h4>
                    <div class="contact-info">
                        <strong>${auction.contact.name}</strong>
                        Telefon: ${auction.contact.phone}<br>
                        Email: ${auction.contact.email}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

function showErrorMessage() {
    const auctionDetail = document.getElementById('auctionDetail');
    auctionDetail.innerHTML = `
        <div class="error-message" style="text-align: center; padding: 3rem; grid-column: 1 / -1;">
            <h2>Licitația nu a fost găsită</h2>
            <p>Licitația solicitată nu există sau a fost eliminată.</p>
            <a href="index.html" class="btn btn-primary" style="margin-top: 1rem;">Înapoi la Lista de Licitații</a>
        </div>
    `;
}

function startCountdownTimer() {
    // Simple countdown timer - in a real app this would be more sophisticated
    const timer = document.getElementById('countdownTimer');
    if (!timer) return;
    
    // This is a simplified version - would need real countdown logic
    setInterval(() => {
        // Update timer display
        // For demo purposes, we'll just keep the static text
    }, 1000);
}

function participateInAuction(auctionId) {
    const auction = getAuctionById(auctionId);
    if (!auction) return;
    
    if (auction.status !== 'active') {
        alert('Această licitație nu este încă activă.');
        return;
    }
    
    const confirmParticipation = confirm(`Doriți să participați la licitația "${auction.title}"?\n\nVeți fi redirecționat către formularul de participare.`);
    
    if (confirmParticipation) {
        // In a real application, this would redirect to a participation form
        alert('Funcționalitatea de participare va fi implementată în curând.\n\nPentru moment, vă rugăm să contactați organizatorul direct.');
    }
}

// Utility functions (reuse from main script)
function getStatusText(status) {
    const statusMap = {
        'active': 'Activă',
        'in-curand': 'În Curând',
        'finalizate': 'Finalizată'
    };
    return statusMap[status] || status;
}

function getStatusIndicator(status) {
    const indicatorMap = {
        'active': 'active',
        'in-curand': 'upcoming',
        'finalizate': 'ending-soon'
    };
    return indicatorMap[status] || 'active';
}

function getCategoryText(category) {
    const categoryMap = {
        'constructii': 'Construcții',
        'servicii': 'Servicii',
        'bunuri': 'Bunuri',
        'tehnologie': 'Tehnologie'
    };
    return categoryMap[category] || category;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ro-RO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}