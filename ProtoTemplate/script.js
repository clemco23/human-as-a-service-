// Données des chats
const catsData = [
    {
        id: 1,
        name: "Whiskers",
        age: "2 ans",
        ageCategory: "jeune",
        personality: "joueur",
        description: "Je suis un chat très énergique qui adore jouer avec des balles et grimper partout !",
        lookingFor: "Je cherche un humain actif qui aime jouer et qui a du temps pour moi. Idéalement quelqu'un qui travaille à domicile.",
        emoji: "🐱"
    },
    {
        id: 2,
        name: "Luna",
        age: "5 ans",
        ageCategory: "adulte",
        personality: "calme",
        description: "Chat tranquille qui apprécie les moments de détente et les caresses douces.",
        lookingFor: "Je recherche une personne calme qui aime lire et regarder des films. Un foyer paisible serait parfait.",
        emoji: "🌙"
    },
    {
        id: 3,
        name: "Simba",
        age: "8 mois",
        ageCategory: "chaton",
        personality: "affectueux",
        description: "Petit chaton très câlin qui ronronne dès qu'on s'approche de lui.",
        lookingFor: "Je veux un humain qui me donne beaucoup d'amour et d'attention. J'adore dormir sur les genoux !",
        emoji: "😻"
    },
    {
        id: 4,
        name: "Shadow",
        age: "4 ans",
        ageCategory: "adulte",
        personality: "independant",
        description: "Chat indépendant qui aime observer le monde depuis sa fenêtre préférée.",
        lookingFor: "Je cherche quelqu'un qui respecte mon espace personnel mais qui est là quand j'ai besoin de compagnie.",
        emoji: "🖤"
    },
    {
        id: 5,
        name: "Mimi",
        age: "10 ans",
        ageCategory: "senior",
        personality: "calme",
        description: "Chatte senior très sage qui apprécie la routine et les petits plaisirs de la vie.",
        lookingFor: "Je souhaite un foyer tranquille avec un humain patient qui comprend mes besoins de senior.",
        emoji: "👵"
    },
    {
        id: 6,
        name: "Tiger",
        age: "3 ans",
        ageCategory: "jeune",
        personality: "joueur",
        description: "Chat tigré plein d'énergie qui adore chasser les jouets et explorer.",
        lookingFor: "Je veux un humain aventurier qui m'emmènera peut-être en promenade et qui a un grand espace à explorer.",
        emoji: "🐅"
    },
    {
        id: 7,
        name: "Bella",
        age: "6 ans",
        ageCategory: "adulte",
        personality: "affectueux",
        description: "Chatte très sociable qui aime rencontrer de nouvelles personnes et recevoir des câlins.",
        lookingFor: "Je recherche une famille aimante, peut-être avec des enfants doux qui sauront me câliner.",
        emoji: "💕"
    },
    {
        id: 8,
        name: "Smokey",
        age: "7 ans",
        ageCategory: "adulte",
        personality: "independant",
        description: "Chat gris très élégant qui préfère observer plutôt que participer activement.",
        lookingFor: "Je veux un humain qui apprécie ma présence silencieuse et qui me laisse venir vers lui naturellement.",
        emoji: "🌫️"
    }
];

// Variables globales
let filteredCats = [...catsData];
let currentPage = 'home';

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeFilters();
    renderCats();
    initializeForms();
    initializeMobileMenu();
});

// Navigation SPA
function initializeNavigation() {
    // Gestion des liens de navigation
    const navLinks = document.querySelectorAll('[data-page]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            navigateToPage(targetPage);
        });
    });

    // Gestion du bouton retour du navigateur
    window.addEventListener('popstate', function(e) {
        const page = e.state ? e.state.page : 'home';
        navigateToPage(page, false);
    });

    // Initialiser l'état de l'historique
    history.replaceState({ page: 'home' }, '', '#home');
}

function navigateToPage(pageName, addToHistory = true) {
    // Masquer toutes les pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Afficher la page cible
    const targetPage = document.getElementById(pageName);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageName;
        
        // Mettre à jour les liens de navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageName) {
                link.classList.add('active');
            }
        });
        
        // Ajouter à l'historique du navigateur
        if (addToHistory) {
            history.pushState({ page: pageName }, '', `#${pageName}`);
        }
        
        // Fermer le menu mobile si ouvert
        closeMobileMenu();
        
        // Faire défiler vers le haut
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Système de filtrage
function initializeFilters() {
    const ageFilter = document.getElementById('age-filter');
    const personalityFilter = document.getElementById('personality-filter');
    const searchInput = document.getElementById('search-input');
    
    if (ageFilter) {
        ageFilter.addEventListener('change', applyFilters);
    }
    
    if (personalityFilter) {
        personalityFilter.addEventListener('change', applyFilters);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(applyFilters, 300));
    }
}

function applyFilters() {
    const ageFilter = document.getElementById('age-filter').value;
    const personalityFilter = document.getElementById('personality-filter').value;
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    filteredCats = catsData.filter(cat => {
        const matchesAge = !ageFilter || cat.ageCategory === ageFilter;
        const matchesPersonality = !personalityFilter || cat.personality === personalityFilter;
        const matchesSearch = !searchTerm || 
            cat.name.toLowerCase().includes(searchTerm) ||
            cat.description.toLowerCase().includes(searchTerm) ||
            cat.lookingFor.toLowerCase().includes(searchTerm);
        
        return matchesAge && matchesPersonality && matchesSearch;
    });
    
    renderCats();
}

// Rendu des cartes de chats
function renderCats() {
    const catsGrid = document.getElementById('cats-grid');
    if (!catsGrid) return;
    
    if (filteredCats.length === 0) {
        catsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: var(--text-light); margin-bottom: 1rem;"></i>
                <h3>Aucun chat trouvé</h3>
                <p>Essayez de modifier vos critères de recherche.</p>
            </div>
        `;
        return;
    }
    
    catsGrid.innerHTML = filteredCats.map(cat => `
        <div class="cat-card" data-cat-id="${cat.id}">
            <div class="cat-image">
                <span style="font-size: 4rem;">${cat.emoji}</span>
            </div>
            <div class="cat-info">
                <h3 class="cat-name">${cat.name}</h3>
                <p class="cat-age">${cat.age}</p>
                <span class="cat-personality">${capitalizeFirst(cat.personality)}</span>
                <p class="cat-description">${cat.description}</p>
                <div class="cat-looking-for">
                    <h4>Ce que je recherche :</h4>
                    <p>${cat.lookingFor}</p>
                </div>
            </div>
        </div>
    `).join('');
    
    // Ajouter des animations d'apparition
    const catCards = catsGrid.querySelectorAll('.cat-card');
    catCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Gestion des formulaires
function initializeForms() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactForm();
        });
    }
}

function handleContactForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simulation d'envoi de formulaire
    if (name && email && message) {
        // Animation de succès
        const submitBtn = document.querySelector('.contact-form .btn-primary');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = 'Message envoyé ! ✓';
            submitBtn.style.background = '#27ae60';
            
            // Reset du formulaire
            setTimeout(() => {
                document.querySelector('.contact-form').reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
        }, 1000);
    }
}

// Menu mobile
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            toggleMobileMenu();
        });
        
        // Fermer le menu quand on clique sur un lien
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }
}

function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animation du hamburger
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        
        // Afficher le menu
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.background = 'var(--white)';
        navMenu.style.boxShadow = 'var(--shadow)';
        navMenu.style.padding = '1rem';
        navMenu.style.gap = '1rem';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
        
        // Masquer le menu
        navMenu.style.display = '';
        navMenu.style.flexDirection = '';
        navMenu.style.position = '';
        navMenu.style.top = '';
        navMenu.style.left = '';
        navMenu.style.right = '';
        navMenu.style.background = '';
        navMenu.style.boxShadow = '';
        navMenu.style.padding = '';
        navMenu.style.gap = '';
    }
}

function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
        
        // Réinitialiser les styles du menu
        navMenu.style.display = '';
        navMenu.style.flexDirection = '';
        navMenu.style.position = '';
        navMenu.style.top = '';
        navMenu.style.left = '';
        navMenu.style.right = '';
        navMenu.style.background = '';
        navMenu.style.boxShadow = '';
        navMenu.style.padding = '';
        navMenu.style.gap = '';
    }
}

// Fonctions utilitaires
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

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

// Animations au scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    const animatedElements = document.querySelectorAll('.feature-card, .cat-card, .contact-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Initialiser les animations au scroll après le chargement
window.addEventListener('load', initializeScrollAnimations);

// Gestion des erreurs
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
});

// Messages de bienvenue amusants
const welcomeMessages = [
    "Miaou ! Bienvenue sur PawMatch ! 🐱",
    "Un chat vous a peut-être déjà repéré... 👀",
    "Prêt à être choisi par un félin ? 😸",
    "Les chats sont en train d'examiner votre profil... 🕵️‍♀️"
];

// Afficher un message de bienvenue aléatoire
function showWelcomeMessage() {
    const message = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
    
    // Créer une notification temporaire
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-hover);
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animer l'apparition
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Supprimer après 4 secondes
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Afficher le message de bienvenue après un court délai
setTimeout(showWelcomeMessage, 1500);
