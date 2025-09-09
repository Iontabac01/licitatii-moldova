// Sample auction data
const auctionsData = [
    {
        id: 1,
        title: "Modernizarea sistemului de iluminat public în municipiul Chișinău",
        description: "Achiziționarea și instalarea unui sistem modern de iluminat public cu LED-uri pentru străzile principale din centrul capitalei.",
        category: "constructii",
        price: "2,500,000 MDL",
        deadline: "2024-01-15",
        status: "active",
        participants: 8,
        timeLeft: "5 zile"
    },
    {
        id: 2,
        title: "Servicii de consultanță IT pentru digitalizarea serviciilor publice",
        description: "Dezvoltarea unei platforme digitale pentru serviciile publice din Republica Moldova cu focus pe transparența și eficiența.",
        category: "tehnologie",
        price: "1,800,000 MDL",
        deadline: "2024-01-20",
        status: "active",
        participants: 12,
        timeLeft: "10 zile"
    },
    {
        id: 3,
        title: "Furnizarea echipamentelor medicale pentru spitalele raionale",
        description: "Achiziționarea de echipamente medicale moderne pentru îmbunătățirea serviciilor de sănătate în regiunile rurale.",
        category: "servicii",
        price: "3,200,000 MDL",
        deadline: "2024-01-25",
        status: "active",
        participants: 15,
        timeLeft: "15 zile"
    },
    {
        id: 4,
        title: "Construcția unui centru comunitar în satul Cricova",
        description: "Proiectarea și construcția unui centru comunitar multifuncțional pentru evenimente culturale și sociale.",
        category: "constructii",
        price: "900,000 MDL",
        deadline: "2024-02-01",
        status: "in-curand",
        participants: 0,
        timeLeft: "22 zile"
    },
    {
        id: 5,
        title: "Servicii de curățenie pentru instituțiile publice din Bălți",
        description: "Contract anual pentru servicii de curățenie și întreținere pentru clădirile administrative din municipiul Bălți.",
        category: "servicii",
        price: "450,000 MDL",
        deadline: "2024-01-12",
        status: "active",
        participants: 6,
        timeLeft: "2 zile"
    },
    {
        id: 6,
        title: "Achiziționarea materialelor de construcție pentru reparația drumurilor",
        description: "Furnizarea de asfalt, pietriș și alte materiale pentru reparația drumurilor naționale și locale.",
        category: "bunuri",
        price: "5,100,000 MDL",
        deadline: "2024-01-18",
        status: "active",
        participants: 20,
        timeLeft: "8 zile"
    }
];

// Global variables
let displayedAuctions = [];
let filteredAuctions = [];
let currentFilter = {
    category: '',
    status: '',
    search: ''
};
const auctionsPerPage = 6;
let currentPage = 1;

// DOM elements
const auctionsGrid = document.getElementById('auctionsGrid');
const categoryFilter = document.getElementById('categoryFilter');
const statusFilter = document.getElementById('statusFilter');
const searchInput = document.getElementById('searchInput');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const displayCount = document.getElementById('displayCount');
const totalCount = document.getElementById('totalCount');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    filteredAuctions = [...auctionsData];
    updateAuctionsDisplay();
    updateStats();
}

function setupEventListeners() {
    // Filter event listeners
    categoryFilter.addEventListener('change', handleFilterChange);
    statusFilter.addEventListener('change', handleFilterChange);
    searchInput.addEventListener('input', debounce(handleFilterChange, 300));
    
    // Load more button
    loadMoreBtn.addEventListener('click', loadMoreAuctions);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

function handleFilterChange() {
    currentFilter.category = categoryFilter.value;
    currentFilter.status = statusFilter.value;
    currentFilter.search = searchInput.value.toLowerCase();
    
    applyFilters();
    currentPage = 1;
    updateAuctionsDisplay();
}

function applyFilters() {
    filteredAuctions = auctionsData.filter(auction => {
        const matchesCategory = !currentFilter.category || auction.category === currentFilter.category;
        const matchesStatus = !currentFilter.status || auction.status === currentFilter.status;
        const matchesSearch = !currentFilter.search || 
            auction.title.toLowerCase().includes(currentFilter.search) ||
            auction.description.toLowerCase().includes(currentFilter.search);
        
        return matchesCategory && matchesStatus && matchesSearch;
    });
}

function updateAuctionsDisplay() {
    const startIndex = 0;
    const endIndex = currentPage * auctionsPerPage;
    displayedAuctions = filteredAuctions.slice(startIndex, endIndex);
    
    renderAuctions();
    updateLoadMoreButton();
    updateStats();
}

function renderAuctions() {
    if (displayedAuctions.length === 0) {
        auctionsGrid.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                <h3>Nu au fost găsite licitații</h3>
                <p>Încearcă să modifici filtrele pentru a vedea mai multe rezultate.</p>
            </div>
        `;
        return;
    }
    
    auctionsGrid.innerHTML = displayedAuctions.map(auction => createAuctionCard(auction)).join('');
    
    // Add click event listeners to auction cards
    document.querySelectorAll('.auction-card').forEach(card => {
        card.addEventListener('click', function() {
            const auctionId = this.dataset.auctionId;
            viewAuctionDetails(auctionId);
        });
    });
}

function createAuctionCard(auction) {
    const statusClass = auction.status.replace('-', '');
    const statusText = getStatusText(auction.status);
    const statusIndicator = getStatusIndicator(auction.status);
    
    return `
        <div class="auction-card" data-auction-id="${auction.id}">
            <div class="auction-header">
                <div>
                    <h4 class="auction-title">${auction.title}</h4>
                </div>
                <span class="auction-category">${getCategoryText(auction.category)}</span>
            </div>
            
            <p class="auction-description">${auction.description}</p>
            
            <div class="auction-details">
                <div class="auction-price">${auction.price}</div>
                <div class="auction-deadline">Termen: ${formatDate(auction.deadline)}</div>
            </div>
            
            <div class="auction-status">
                <span class="status-indicator ${statusIndicator}"></span>
                <span>${statusText} • ${auction.participants} participanți • ${auction.timeLeft}</span>
            </div>
            
            <div class="auction-actions">
                <button class="btn btn-primary" onclick="participateInAuction(${auction.id}); event.stopPropagation();">
                    ${auction.status === 'active' ? 'Participă' : 'Vezi Detalii'}
                </button>
                <button class="btn btn-outline" onclick="viewAuctionDetails(${auction.id}); event.stopPropagation();">
                    Detalii
                </button>
            </div>
        </div>
    `;
}

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

function loadMoreAuctions() {
    currentPage++;
    updateAuctionsDisplay();
}

function updateLoadMoreButton() {
    const hasMore = displayedAuctions.length < filteredAuctions.length;
    loadMoreBtn.style.display = hasMore ? 'block' : 'none';
}

function updateStats() {
    displayCount.textContent = displayedAuctions.length;
    totalCount.textContent = filteredAuctions.length;
}

function participateInAuction(auctionId) {
    const auction = auctionsData.find(a => a.id === auctionId);
    if (!auction) return;
    
    if (auction.status !== 'active') {
        alert('Această licitație nu este încă activă.');
        return;
    }
    
    // Simulate participation
    const confirmParticipation = confirm(`Doriți să participați la licitația "${auction.title}"?`);
    if (confirmParticipation) {
        alert('Participarea a fost înregistrată cu succes! Veți fi notificat despre actualizări.');
        // In a real application, this would make an API call
        auction.participants++;
        renderAuctions();
    }
}

function viewAuctionDetails(auctionId) {
    // Store auction ID in localStorage and navigate to details page
    localStorage.setItem('selectedAuctionId', auctionId);
    window.location.href = 'licitatie.html';
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function handleKeyboardNavigation(event) {
    // Add keyboard shortcuts for better accessibility
    if (event.ctrlKey && event.key === 'f') {
        event.preventDefault();
        searchInput.focus();
    }
}

// Export data for other pages
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { auctionsData };
} else {
    window.auctionsData = auctionsData;
}