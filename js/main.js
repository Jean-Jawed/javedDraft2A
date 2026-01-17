// ===================================
// UTILITAIRES
// ===================================

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

// ===================================
// CONFIGURATION GLOBALE DES BOUTONS
// ===================================

let boutonsConfig = {};

// Configuration par défaut (fallback si settings absent du JSON)
const defaultBoutonsConfig = {
  projet: {
    texte: "Visiter",
    style: "primary",
    aria: "Visiter le site du projet",
    ordre: 1
  },
  github: {
    texte: "Voir le code",
    style: "tertiary",
    aria: "Voir le code source",
    ordre: 10
  },
  download: {
    texte: "Télécharger",
    style: "primary",
    aria: "Télécharger le projet",
    ordre: 3
  },
  demo: {
    texte: "Voir la démo",
    style: "secondary",
    aria: "Voir la démonstration",
    ordre: 2
  },
  video: {
    texte: "Voir la vidéo",
    style: "secondary",
    aria: "Voir la vidéo du projet",
    ordre: 4
  },
  docs: {
    texte: "Documentation",
    style: "secondary",
    aria: "Voir la documentation",
    ordre: 5
  }
};

// ===================================
// GÉNÉRATION DYNAMIQUE DES BOUTONS
// ===================================

/**
 * Génère le HTML des boutons en fonction des liens du projet
 * @param {Object} liens - Objet contenant les liens du projet
 * @param {string} suffix - Suffixe pour les classes CSS (ex: '-hover' pour la modale hover)
 * @returns {string} HTML des boutons
 */
function generateButtonsHTML(liens, suffix = '') {
  if (!liens || Object.keys(liens).length === 0) {
    return '';
  }

  // Récupérer les clés de liens présentes et les trier par ordre
  const liensPresents = Object.keys(liens)
    .filter(key => liens[key] && liens[key] !== '#') // Ignorer les liens vides ou "#"
    .map(key => {
      const config = boutonsConfig[key] || defaultBoutonsConfig[key] || {
        texte: key.charAt(0).toUpperCase() + key.slice(1),
        style: 'secondary',
        aria: `Ouvrir ${key}`,
        ordre: 99
      };
      return { key, config, url: liens[key] };
    })
    .sort((a, b) => a.config.ordre - b.config.ordre);

  // Générer le HTML
  return liensPresents.map(({ key, config }) => {
    const btnClass = `project-card-unified__btn project-card-unified__btn--${config.style} btn-${key}${suffix}`;
    return `<button class="${btnClass}" aria-label="${config.aria}" data-link-type="${key}">${config.texte}</button>`;
  }).join('');
}

/**
 * Attache les event listeners aux boutons générés
 * @param {HTMLElement} container - Conteneur des boutons
 * @param {Object} liens - Objet contenant les liens du projet
 * @param {Function} onBeforeAction - Callback appelé avant l'action (optionnel, ex: fermer modale)
 */
function attachButtonListeners(container, liens, onBeforeAction = null) {
  if (!liens || !container) return;

  Object.keys(liens).forEach(key => {
    const url = liens[key];
    if (!url || url === '#') return;

    const btn = container.querySelector(`[data-link-type="${key}"]`);
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (onBeforeAction) onBeforeAction();
        window.open(url, '_blank');
      });
    }
  });
}

// ===================================
// GESTION DU HEADER AU SCROLL
// ===================================

const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  lastScroll = currentScroll;
});

// ===================================
// MENU BURGER MOBILE
// ===================================

const burgerMenu = document.getElementById('burgerMenu');
const navMenu = document.getElementById('navMenu');

if (burgerMenu && navMenu) {
  burgerMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    burgerMenu.classList.toggle('active');
  });

  // Fermer le menu au clic sur un lien
  const navLinks = navMenu.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      burgerMenu.classList.remove('active');
    });
  });
  
  // Gestion du dropdown "Vous êtes" sur mobile
  const dropdown = navMenu.querySelector('.header__nav-dropdown');
  if (dropdown) {
    const dropdownToggle = dropdown.querySelector('.header__nav-dropdown-toggle');
    
    dropdownToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropdown.classList.toggle('mobile-open');
    });
  }
}

// ===================================
// CHARGEMENT DES IMAGES AVEC FALLBACK
// ===================================

function getFallbackImageUrl(projectId, imageNumber, category) {
  const fallbackUrls = {
    webdesign: [
      'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800'
    ],
    webapp: [
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'
    ],
    ia: [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800'
    ],
    data: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'
    ],
    android: [
      'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800',
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800'
    ],
    automation: [
      'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800'
    ],
    mediapipe: [
      'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800'
    ],
    tidal: [
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800',
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800'
    ]
  };
  
  const categoryFallbacks = fallbackUrls[category] || fallbackUrls.webdesign;
  return categoryFallbacks[imageNumber - 1] || categoryFallbacks[0];
}

function loadImageWithFallback(imagePath, fallbackUrl, imgElement) {
  imgElement.src = imagePath;
  imgElement.onerror = () => {
    imgElement.src = fallbackUrl;
  };
}

// ===================================
// CRÉATION D'UNE CARD PROJET
// ===================================

function createProjectCard(projet) {
  const card = document.createElement('div');
  card.className = 'project-card-unified';
  card.dataset.projectId = projet.id;
  
  // Trouver le premier lien disponible pour le clic direct
  const firstLinkKey = Object.keys(projet.liens).find(key => projet.liens[key] && projet.liens[key] !== '#');
  if (firstLinkKey) {
    card.dataset.link = projet.liens[firstLinkKey];
  }
  
  card.setAttribute('role', 'article');
  card.setAttribute('aria-label', `Projet: ${projet.titre}`);
  card.setAttribute('tabindex', '0');
  
  // Wrapper de l'image
  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'project-card-unified__image-wrapper';
  
  // Image
  const imageDiv = document.createElement('div');
  imageDiv.className = 'project-card-unified__image';
  const img = document.createElement('img');
  img.alt = projet.titre;
  img.loading = 'lazy';
  loadImageWithFallback(
    projet.images.image1,
    getFallbackImageUrl(projet.id, 1, projet.categorie),
    img
  );
  imageDiv.appendChild(img);
  
  // Overlay (au-dessus de l'image) - SANS LES BOUTONS
  const overlay = document.createElement('div');
  overlay.className = 'project-card-unified__overlay';
  
  overlay.innerHTML = `
    <p class="project-card-unified__overlay-desc">${projet.descriptions.moyenne}</p>
    <div class="project-card-unified__overlay-tech">
      ${projet.technologies.slice(0, 3).map(tech => 
        `<span class="tech-badge">${tech}</span>`
      ).join('')}
    </div>
  `;
  
  imageWrapper.appendChild(imageDiv);
  imageWrapper.appendChild(overlay);
  
  // Badge Coming Soon (dans le wrapper)
  if (projet.badges.includes('Coming Soon')) {
    const badge = document.createElement('div');
    badge.className = 'project-card-unified__badge project-card-unified__badge--soon';
    badge.textContent = 'Coming Soon';
    imageWrapper.appendChild(badge);
  }
  
  card.appendChild(imageWrapper);
  
  // Titre au repos (en dessous de l'image)
  const titleRest = document.createElement('h3');
  titleRest.className = 'project-card-unified__title-rest';
  titleRest.textContent = projet.titre;
  card.appendChild(titleRest);
  
  // BOUTONS DYNAMIQUES - en dessous du titre (visibles au hover)
  const actionsHover = document.createElement('div');
  actionsHover.className = 'project-card-unified__actions-hover';
  
  // Générer les boutons dynamiquement depuis la config
  let actionsHTML = generateButtonsHTML(projet.liens);
  
  // Toujours ajouter le bouton Détails
  actionsHTML += `<button class="project-card-unified__btn project-card-unified__btn--secondary btn-details" aria-label="Voir les détails du projet">Détails</button>`;
  
  actionsHover.innerHTML = actionsHTML;
  card.appendChild(actionsHover);
  
  // Attacher les event listeners pour les boutons de liens
  attachButtonListeners(actionsHover, projet.liens);
  
  // Event listener pour le bouton Détails
  const btnDetails = actionsHover.querySelector('.btn-details');
  if (btnDetails) {
    btnDetails.addEventListener('click', (e) => {
      e.stopPropagation();
      openModal(projet);
    });
  }
  
  // Clic direct sur la card (priorité la plus basse)
  card.addEventListener('click', () => {
    if (firstLinkKey && projet.liens[firstLinkKey] && window.innerWidth > 768) {
      window.open(projet.liens[firstLinkKey], '_blank');
    } else if (window.innerWidth <= 768) {
      // Sur mobile, ouvrir la modale par défaut
      openModal(projet);
    }
  });
  
  // Support clavier
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      openModal(projet);
    }
  });
  
  // ===================================
  // MODALE HOVER (Desktop uniquement)
  // ===================================
  
  if (window.innerWidth > 768) {
    card.addEventListener('mouseenter', () => {
      // Annuler le timer précédent si existe
      if (hoverModalTimer) {
        clearTimeout(hoverModalTimer);
      }
      
      // Délai de 400ms avant ouverture
      hoverModalTimer = setTimeout(() => {
        createHoverModal(projet, card);
      }, 400);
    });
    
    card.addEventListener('mouseleave', () => {
      // Annuler le timer si on sort avant l'ouverture
      if (hoverModalTimer) {
        clearTimeout(hoverModalTimer);
        hoverModalTimer = null;
      }
    });
  }
  
  return card;
}

// ===================================
// MODALE HOVER - v1.2
// ===================================

let hoverModalTimer = null;
let currentHoverModal = null;

function createHoverModal(projet, cardElement) {
  // Desktop uniquement
  if (window.innerWidth <= 768) return;
  
  // Calculer la position de la card
  const cardRect = cardElement.getBoundingClientRect();
  
  // Taille de la modale
  const modalWidth = 480;
  const modalHeight = 450;  // Hauteur fixe
  
  // Calculer position centrée sur la card
  let modalTop = cardRect.top + (cardRect.height / 2) - (modalHeight / 2);
  let modalLeft = cardRect.left + (cardRect.width / 2) - (modalWidth / 2);
  
  // Limiter pour éviter débordement écran
  const margin = 20;
  modalTop = Math.max(margin, Math.min(modalTop, window.innerHeight - modalHeight - margin));
  modalLeft = Math.max(margin, Math.min(modalLeft, window.innerWidth - modalWidth - margin));
  
  // Créer le backdrop
  const backdrop = document.createElement('div');
  backdrop.className = 'hover-modal-backdrop';
  
  // Créer la modale
  const modal = document.createElement('div');
  modal.className = 'hover-modal';
  
  // Positionner la modale
  modal.style.top = modalTop + 'px';
  modal.style.left = modalLeft + 'px';
  
  // Générer les boutons dynamiquement
  let actionsHTML = generateButtonsHTML(projet.liens, '-hover');
  actionsHTML += `<button class="project-card-unified__btn project-card-unified__btn--secondary btn-details-hover" aria-label="Voir les détails">Détails</button>`;
  
  // Contenu de la modale
  modal.innerHTML = `
    <div class="hover-modal__image">
      <img src="${projet.images.image1}" alt="${projet.titre}">
    </div>
    <div class="hover-modal__content">
      <h3 class="hover-modal__title">${projet.titre}</h3>
      <p class="hover-modal__desc">${projet.descriptions.moyenne}</p>
      <div class="hover-modal__tech">
        ${projet.technologies.slice(0, 3).map(tech => 
          `<span class="tech-badge">${tech}</span>`
        ).join('')}
      </div>
      <div class="hover-modal__actions">
        ${actionsHTML}
      </div>
    </div>
  `;
  
  // Ajouter au DOM
  document.body.appendChild(backdrop);
  document.body.appendChild(modal);
  
  // Animer l'apparition
  setTimeout(() => {
    backdrop.classList.add('active');
    modal.classList.add('active');
  }, 10);
  
  // Attacher les event listeners pour les boutons de liens (avec fermeture de modale)
  const actionsContainer = modal.querySelector('.hover-modal__actions');
  
  // Pour chaque type de lien, attacher l'event listener
  Object.keys(projet.liens).forEach(key => {
    const url = projet.liens[key];
    if (!url || url === '#') return;
    
    const btn = actionsContainer.querySelector(`[data-link-type="${key}"]`);
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeHoverModal();
        window.open(url, '_blank');
      });
    }
  });
  
  // Event listener pour le bouton Détails
  const btnDetails = modal.querySelector('.btn-details-hover');
  if (btnDetails) {
    btnDetails.addEventListener('click', (e) => {
      e.stopPropagation();
      closeHoverModal();
      openModal(projet);
    });
  }
  
  // Fermer au survol du backdrop ou de la modale elle-même quand on sort
  const closeHandler = () => {
    closeHoverModal();
  };
  
  backdrop.addEventListener('mouseenter', closeHandler);
  modal.addEventListener('mouseleave', closeHandler);
  
  // Stocker la référence
  currentHoverModal = { backdrop, modal };
}

function closeHoverModal() {
  if (!currentHoverModal) return;
  
  const { backdrop, modal } = currentHoverModal;
  
  // Animer la fermeture
  backdrop.classList.remove('active');
  modal.classList.remove('active');
  
  // Supprimer du DOM après l'animation
  setTimeout(() => {
    if (backdrop.parentNode) backdrop.remove();
    if (modal.parentNode) modal.remove();
  }, 200);
  
  currentHoverModal = null;
}

// ===================================
// MODALE DE DÉTAILS
// ===================================

function openModal(projet) {
  const modal = document.getElementById('projectModal');
  if (!modal) return;
  
  // Charger l'image 2 avec fallback
  const modalImage = document.getElementById('modalImage');
  loadImageWithFallback(
    projet.images.image2 || projet.images.image1,
    getFallbackImageUrl(projet.id, 2, projet.categorie),
    modalImage
  );
  modalImage.alt = projet.titre;
  
  // Remplir le contenu
  document.getElementById('modalTitle').textContent = projet.titre;
  document.getElementById('modalDescription').textContent = projet.descriptions.longue;
  
  // Générer tous les badges tech
  const techContainer = document.getElementById('modalTechBadges');
  techContainer.innerHTML = projet.technologies.map(tech => 
    `<span class="tech-badge">${tech}</span>`
  ).join('');
  
  // Générer les boutons dynamiquement dans la modale
  const modalActions = modal.querySelector('.modal-actions');
  if (modalActions) {
    // Générer les boutons depuis la config
    modalActions.innerHTML = generateButtonsHTML(projet.liens, '-modal');
    
    // Attacher les event listeners
    Object.keys(projet.liens).forEach(key => {
      const url = projet.liens[key];
      if (!url || url === '#') return;
      
      const btn = modalActions.querySelector(`[data-link-type="${key}"]`);
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          window.open(url, '_blank');
        });
      }
    });
  }
  
  // Afficher la modale
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;
  
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Initialiser les event listeners de la modale
document.addEventListener('DOMContentLoaded', () => {
  const modalClose = document.querySelector('.modal-close');
  const modalOverlay = document.querySelector('.modal-overlay');
  
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        closeModal();
      }
    });
  }
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
});

// ===================================
// CHARGEMENT DES PROJETS
// ===================================

async function loadProjects() {
  // Vérifier si on est sur la page projets
  const projectContainers = document.querySelectorAll('[data-projects-container]');
  if (projectContainers.length === 0) return;
  
  try {
    const response = await fetch('data/projets.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Charger la configuration des boutons
    if (data.settings && data.settings.boutons) {
      boutonsConfig = data.settings.boutons;
    } else {
      boutonsConfig = defaultBoutonsConfig;
    }
    
    // Grouper par catégorie
    const projectsByCategory = {};
    data.projets.forEach(projet => {
      if (!projectsByCategory[projet.categorie]) {
        projectsByCategory[projet.categorie] = [];
      }
      projectsByCategory[projet.categorie].push(projet);
    });
    
    // Trier chaque catégorie par ordre
    Object.keys(projectsByCategory).forEach(cat => {
      projectsByCategory[cat].sort((a, b) => a.ordre - b.ordre);
    });
    
    // Générer les cards
    Object.keys(projectsByCategory).forEach(cat => {
      const section = document.querySelector(`[data-category="${cat}"]`);
      if (!section) return;
      
      const container = section.querySelector('[data-projects-container]');
      if (!container) return;
      
      projectsByCategory[cat].forEach(projet => {
        container.appendChild(createProjectCard(projet));
      });
    });
    
    // Initialiser les interactions
    initializeScrollNavigation();
    
  } catch (error) {
    console.error('Erreur chargement projets:', error);
    displayErrorMessage();
  }
}

function displayErrorMessage() {
  const containers = document.querySelectorAll('[data-projects-container]');
  containers.forEach(container => {
    container.innerHTML = `
      <div style="padding: 2rem; background: var(--color-bg-lighter); border-radius: 8px; text-align: center;">
        <h3 style="color: var(--color-accent); margin-bottom: 1rem;">Impossible de charger les projets</h3>
        <p style="color: var(--color-secondary); margin-bottom: 1rem;">Veuillez vérifier que le fichier data/projets.json existe.</p>
        <button onclick="location.reload()" class="btn btn--primary">Recharger</button>
      </div>
    `;
  });
}

// ===================================
// NAVIGATION STREAMING SCROLL
// ===================================

function initializeScrollNavigation() {
  const sections = document.querySelectorAll('.streaming-section');
  
  sections.forEach(section => {
    const container = section.querySelector('.streaming-scroll__container');
    const btnLeft = section.querySelector('.streaming-scroll__nav--left');
    const btnRight = section.querySelector('.streaming-scroll__nav--right');
    
    if (!container || !btnLeft || !btnRight) return;
    
    btnLeft.addEventListener('click', () => {
      container.scrollBy({
        left: -350,
        behavior: 'smooth'
      });
    });
    
    btnRight.addEventListener('click', () => {
      container.scrollBy({
        left: 350,
        behavior: 'smooth'
      });
    });
  });
}

// ===================================
// CARROUSEL 3D - PAGE D'ACCUEIL
// ===================================

let currentCarouselIndex = 0;
let carouselProjects = [];
let carouselInterval;

async function loadCarousel3D() {
  const carouselScene = document.getElementById('carousel3DScene');
  if (!carouselScene) return;
  
  try {
    const response = await fetch('data/projets.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Charger la configuration des boutons si pas déjà fait
    if (data.settings && data.settings.boutons) {
      boutonsConfig = data.settings.boutons;
    }
    
    // Filtrer les projets phares
    carouselProjects = data.projets.filter(p => p.phare === true).slice(0, 3);
    
    if (carouselProjects.length === 0) {
      console.warn('Aucun projet phare trouvé');
      return;
    }
    
    // Créer les cards
    carouselProjects.forEach((projet, index) => {
      const card = createCarousel3DCard(projet, index);
      carouselScene.appendChild(card);
    });
    
    // Créer les dots
    const dotsContainer = document.getElementById('carouselDots');
    carouselProjects.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.className = 'carousel-3d__dot';
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => rotateCarousel(index));
      dotsContainer.appendChild(dot);
    });
    
    // Initialiser la position
    updateCarouselPosition();
    
    // Navigation
    const btnPrev = document.getElementById('carouselPrev');
    const btnNext = document.getElementById('carouselNext');
    
    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        currentCarouselIndex = (currentCarouselIndex - 1 + carouselProjects.length) % carouselProjects.length;
        updateCarouselPosition();
        resetCarouselInterval();
      });
    }
    
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        currentCarouselIndex = (currentCarouselIndex + 1) % carouselProjects.length;
        updateCarouselPosition();
        resetCarouselInterval();
      });
    }
    
    // Auto-rotation
    startCarouselInterval();
    
    // Pause au hover
    carouselScene.addEventListener('mouseenter', () => {
      clearInterval(carouselInterval);
    });
    
    carouselScene.addEventListener('mouseleave', () => {
      startCarouselInterval();
    });
    
  } catch (error) {
    console.error('Erreur chargement carrousel:', error);
  }
}

function createCarousel3DCard(projet, index) {
  const card = document.createElement('div');
  card.className = 'carousel-3d__card';
  card.dataset.index = index;
  
  const img = document.createElement('img');
  img.className = 'carousel-3d__card-image';
  img.alt = projet.titre;
  loadImageWithFallback(
    projet.images.image1,
    getFallbackImageUrl(projet.id, 1, projet.categorie),
    img
  );
  
  const content = document.createElement('div');
  content.className = 'carousel-3d__card-content';
  content.innerHTML = `
    <h3 class="carousel-3d__card-title">${projet.titre}</h3>
    <p class="carousel-3d__card-desc">${projet.descriptions.moyenne}</p>
    <div class="carousel-3d__card-tech">
      ${projet.technologies.slice(0, 3).map(tech => 
        `<span class="tech-badge">${tech}</span>`
      ).join('')}
    </div>
  `;
  
  card.appendChild(img);
  card.appendChild(content);
  
  // Badge Coming Soon
  if (projet.badges.includes('Coming Soon')) {
    const badge = document.createElement('div');
    badge.className = 'carousel-3d__card-badge';
    badge.textContent = 'Coming Soon';
    card.appendChild(badge);
  }
  
  // Clic sur la card - utiliser le premier lien disponible
  card.addEventListener('click', () => {
    const firstLinkKey = Object.keys(projet.liens).find(key => projet.liens[key] && projet.liens[key] !== '#');
    if (firstLinkKey) {
      window.open(projet.liens[firstLinkKey], '_blank');
    }
  });
  
  return card;
}

function updateCarouselPosition() {
  const cards = document.querySelectorAll('.carousel-3d__card');
  const dots = document.querySelectorAll('.carousel-3d__dot');
  
  cards.forEach((card, index) => {
    const offset = index - currentCarouselIndex;
    const angle = offset * 120; // 360 / 3 = 120 degrés
    const translateZ = 500;
    
    card.style.transform = `
      rotateY(${angle}deg) 
      translateZ(${translateZ}px)
    `;
    
    if (offset === 0) {
      card.style.opacity = '1';
      card.style.zIndex = '10';
    } else {
      card.style.opacity = '0.4';
      card.style.zIndex = '1';
    }
  });
  
  // Update dots
  dots.forEach((dot, index) => {
    if (index === currentCarouselIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function rotateCarousel(index) {
  currentCarouselIndex = index;
  updateCarouselPosition();
  resetCarouselInterval();
}

function startCarouselInterval() {
  carouselInterval = setInterval(() => {
    currentCarouselIndex = (currentCarouselIndex + 1) % carouselProjects.length;
    updateCarouselPosition();
  }, 4000);
}

function resetCarouselInterval() {
  clearInterval(carouselInterval);
  startCarouselInterval();
}

// ===================================
// INITIALISATION AU CHARGEMENT
// ===================================

document.addEventListener('DOMContentLoaded', () => {
  // Charger le carrousel 3D si on est sur la page d'accueil
  if (document.getElementById('carousel3DScene')) {
    loadCarousel3D();
  }
  
  // Charger les projets si on est sur la page projets
  if (document.querySelectorAll('[data-projects-container]').length > 0) {
    loadProjects();
  }
  
  // Gérer les ancres pour les catégories
  if (window.location.hash) {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  }
});