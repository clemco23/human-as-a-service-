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
let cart = [];
let cartTotal = 0;

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeFilters();
    renderCats();
    initializeForms();
    initializeMobileMenu();
    initializeCart();
    loadCartFromStorage();
});

// Navigation SPA
function initializeNavigation() {
    // Gestion des liens de navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const buttons = document.querySelectorAll('[data-page]');

    function showPage(pageId) {
        // Masquer toutes les pages
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Afficher la page demandée
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            currentPage = pageId;
        }
        
        // Mettre à jour les liens actifs
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[data-page="${pageId}"]`);
        if (activeLink && activeLink.classList.contains('nav-link')) {
            activeLink.classList.add('active');
        }
        
        // Fermer le menu mobile si ouvert
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.remove('active');
        
        // Actions spécifiques selon la page
        if (pageId === 'cart') {
            renderCartPage();
        } else if (pageId === 'checkout') {
            renderCheckoutPage();
        }
    }

    // Ajouter les écouteurs d'événements
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = button.getAttribute('data-page');
            showPage(pageId);
        });
    });
    
    // Exposer la fonction showPage globalement
    window.showPage = showPage;
    
    // Réattacher les événements après chaque rendu
    document.addEventListener('click', (e) => {
        if (e.target.matches('[data-page]')) {
            e.preventDefault();
            const pageId = e.target.getAttribute('data-page');
            showPage(pageId);
        }
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
                    <h4>Je recherche :</h4>
                    <p>${cat.lookingFor}</p>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${cat.id})">
                    <i class="fas fa-heart"></i> Adopter ce chat
                </button>
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

// Fonctions du panier
function initializeCart() {
    const cartIcon = document.getElementById('cart-icon');
    const cartDropdown = document.getElementById('cart-dropdown');
    const proceedCheckout = document.getElementById('proceed-checkout');
    const completeAdoption = document.getElementById('complete-adoption');
    
    // Toggle du dropdown du panier
    if (cartIcon) {
        cartIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            cartDropdown.classList.toggle('show');
        });
    }
    
    // Fermer le dropdown en cliquant ailleurs
    document.addEventListener('click', (e) => {
        if (cartIcon && cartDropdown && !cartIcon.contains(e.target) && !cartDropdown.contains(e.target)) {
            cartDropdown.classList.remove('show');
        }
    });
    
    // Bouton procéder au checkout
    if (proceedCheckout) {
        proceedCheckout.addEventListener('click', () => {
            showPage('checkout');
        });
    }
    
    // Bouton finaliser l'adoption
    if (completeAdoption) {
        completeAdoption.addEventListener('click', () => {
            completeAdoption.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Traitement...';
            completeAdoption.disabled = true;
            
            setTimeout(() => {
                alert('🎉 Félicitations ! Vos adoptions ont été finalisées. Vous recevrez bientôt un email avec les détails pour rencontrer vos nouveaux compagnons !');
                cart = [];
                saveCartToStorage();
                updateCartUI();
                showPage('home');
                completeAdoption.innerHTML = 'Finaliser l\'adoption';
                completeAdoption.disabled = false;
            }, 2000);
        });
    }
    
    // Gestion des méthodes de paiement
    const paymentMethods = document.querySelectorAll('.payment-method');
    const cardDetails = document.getElementById('card-details');
    
    paymentMethods.forEach(method => {
        method.addEventListener('click', () => {
            paymentMethods.forEach(m => m.classList.remove('active'));
            method.classList.add('active');
            
            const input = method.querySelector('input');
            input.checked = true;
            
            if (input.value === 'card') {
                cardDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
            }
        });
    });
}

function addToCart(catId) {
    const cat = catsData.find(c => c.id === catId);
    if (!cat) return;
    
    // Vérifier si le chat est déjà dans le panier
    const existingItem = cart.find(item => item.id === catId);
    if (existingItem) {
        showNotification('Ce chat est déjà dans votre panier d\'adoption !', 'warning');
        return;
    }
    
    // Ajouter le prix d'adoption
    const adoptionPrice = getAdoptionPrice(cat);
    const cartItem = {
        ...cat,
        adoptionPrice: adoptionPrice,
        vetFees: 50,
        starterKit: 30
    };
    
    cart.push(cartItem);
    saveCartToStorage();
    updateCartUI();
    showNotification(`${cat.name} a été ajouté à votre panier d'adoption !`, 'success');
    
    // Désactiver le bouton temporairement
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Ajouté !';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 2000);
}

function removeFromCart(catId) {
    cart = cart.filter(item => item.id !== catId);
    saveCartToStorage();
    updateCartUI();
    
    if (currentPage === 'cart') {
        renderCartPage();
    }
    if (currentPage === 'checkout') {
        renderCheckoutPage();
    }
    
    showNotification('Chat retiré du panier', 'info');
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartCount || !cartItems || !cartTotal) return;
    
    // Mettre à jour le compteur
    cartCount.textContent = cart.length;
    
    // Mettre à jour le dropdown
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-heart-broken"></i>
                <p>Votre panier d'adoption est vide</p>
            </div>
        `;
        cartTotal.textContent = 'Total: 0€';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.emoji}</div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.adoptionPrice}€</div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
        
        const total = calculateCartTotal();
        cartTotal.textContent = `Total: ${total}€`;
    }
}

function renderCartPage() {
    const cartItemsList = document.getElementById('cart-items-list');
    const adoptionFees = document.getElementById('adoption-fees');
    const vetFees = document.getElementById('vet-fees');
    const starterKit = document.getElementById('starter-kit');
    const totalAmount = document.getElementById('total-amount');
    
    if (!cartItemsList) return;
    
    if (cart.length === 0) {
        cartItemsList.innerHTML = `
            <div class="cart-empty" style="text-align: center; padding: 3rem;">
                <i class="fas fa-heart-broken" style="font-size: 3rem; color: var(--text-light); margin-bottom: 1rem;"></i>
                <h3>Votre panier d'adoption est vide</h3>
                <p>Découvrez nos adorables chats en attente d'adoption</p>
                <button class="btn btn-primary" data-page="cats" style="margin-top: 1rem;">Voir les chats</button>
            </div>
        `;
        return;
    }
    
    cartItemsList.innerHTML = cart.map(item => `
        <div class="cart-item-full">
            <div class="cart-item-full-image">${item.emoji}</div>
            <div class="cart-item-full-info">
                <div class="cart-item-full-name">${item.name}</div>
                <div class="cart-item-full-details">${item.age} • ${item.personality}</div>
                <div class="cart-item-full-price">Frais d'adoption: ${item.adoptionPrice}€</div>
            </div>
            <div class="cart-item-full-actions">
                <button class="btn btn-secondary" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i> Retirer
                </button>
            </div>
        </div>
    `).join('');
    
    // Calculer les totaux
    const totals = calculateDetailedTotal();
    if (adoptionFees) adoptionFees.textContent = `${totals.adoption}€`;
    if (vetFees) vetFees.textContent = `${totals.vet}€`;
    if (starterKit) starterKit.textContent = `${totals.starter}€`;
    if (totalAmount) totalAmount.textContent = `${totals.total}€`;
}

function renderCheckoutPage() {
    const checkoutCats = document.getElementById('checkout-cats');
    const checkoutTotal = document.getElementById('checkout-total');
    
    if (cart.length === 0) {
        showPage('cart');
        return;
    }
    
    if (checkoutCats) {
        checkoutCats.innerHTML = cart.map(item => `
            <div class="checkout-cat-item">
                <div class="checkout-cat-image">${item.emoji}</div>
                <div class="checkout-cat-info">
                    <div class="checkout-cat-name">${item.name}</div>
                    <div class="checkout-cat-price">${item.adoptionPrice}€</div>
                </div>
            </div>
        `).join('');
    }
    
    const total = calculateCartTotal();
    if (checkoutTotal) checkoutTotal.textContent = `${total}€`;
}

function getAdoptionPrice(cat) {
    // Prix basé sur l'âge et la personnalité
    let basePrice = 150;
    
    switch(cat.ageCategory) {
        case 'chaton': basePrice = 200; break;
        case 'jeune': basePrice = 180; break;
        case 'adulte': basePrice = 150; break;
        case 'senior': basePrice = 100; break;
    }
    
    return basePrice;
}

function calculateCartTotal() {
    return cart.reduce((total, item) => {
        return total + item.adoptionPrice + item.vetFees + item.starterKit;
    }, 0);
}

function calculateDetailedTotal() {
    const adoption = cart.reduce((sum, item) => sum + item.adoptionPrice, 0);
    const vet = cart.reduce((sum, item) => sum + item.vetFees, 0);
    const starter = cart.reduce((sum, item) => sum + item.starterKit, 0);
    
    return {
        adoption,
        vet,
        starter,
        total: adoption + vet + starter
    };
}

function saveCartToStorage() {
    localStorage.setItem('pawmatch_cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('pawmatch_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

function showNotification(message, type = 'info') {
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Ajouter les styles si pas déjà présents
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                border-left: 4px solid var(--primary-color);
            }
            .notification-success { border-left-color: #28a745; }
            .notification-warning { border-left-color: #ffc107; }
            .notification-info { border-left-color: #17a2b8; }
            .notification.show { transform: translateX(0); }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Suppression automatique
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

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
