// ===================================
// VideoSynthesis - Scripts spécifiques
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initBurgerMenu();
    initSmoothScroll();
    initScrollAnimations();
    initGalleryLightbox();
});

// ===================================
// HEADER SCROLL EFFECT
// ===================================

function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ===================================
// BURGER MENU
// ===================================

function initBurgerMenu() {
    const burgerMenu = document.getElementById('burgerMenu');
    const navMenu = document.getElementById('navMenu');

    if (!burgerMenu || !navMenu) return;

    burgerMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        burgerMenu.classList.toggle('active');
    });

    // Fermer au clic sur un lien
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            burgerMenu.classList.remove('active');
        });
    });

    // Dropdown mobile
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
// SMOOTH SCROLL
// ===================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===================================
// SCROLL ANIMATIONS (Intersection Observer)
// ===================================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.vs-flow__step, .category-card, .vs-gallery__item, .vs-download__card');
    
    if (animatedElements.length === 0) return;

    // Ajouter la classe initiale
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Délai progressif pour effet cascade
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

// ===================================
// GALLERY LIGHTBOX
// ===================================

function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.vs-gallery__item');
    
    if (galleryItems.length === 0) return;

    // Créer le lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'vs-lightbox';
    lightbox.innerHTML = `
        <div class="vs-lightbox__backdrop"></div>
        <div class="vs-lightbox__content">
            <button class="vs-lightbox__close" aria-label="Fermer">&times;</button>
            <img src="" alt="" class="vs-lightbox__image">
            <div class="vs-lightbox__caption"></div>
        </div>
    `;
    document.body.appendChild(lightbox);

    // Styles du lightbox (injectés dynamiquement)
    const lightboxStyles = document.createElement('style');
    lightboxStyles.textContent = `
        .vs-lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2000;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }
        .vs-lightbox.active {
            opacity: 1;
            pointer-events: auto;
        }
        .vs-lightbox__backdrop {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
        }
        .vs-lightbox__content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.9);
            max-width: 90vw;
            max-height: 90vh;
            transition: transform 0.3s ease;
        }
        .vs-lightbox.active .vs-lightbox__content {
            transform: translate(-50%, -50%) scale(1);
        }
        .vs-lightbox__image {
            max-width: 100%;
            max-height: 80vh;
            border-radius: 8px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        .vs-lightbox__close {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 2.5rem;
            cursor: pointer;
            transition: color 0.3s ease;
        }
        .vs-lightbox__close:hover {
            color: #E50914;
        }
        .vs-lightbox__caption {
            text-align: center;
            padding: 1rem;
            color: #b3b3b3;
            font-size: 0.9rem;
        }
    `;
    document.head.appendChild(lightboxStyles);

    const lightboxImage = lightbox.querySelector('.vs-lightbox__image');
    const lightboxCaption = lightbox.querySelector('.vs-lightbox__caption');
    const lightboxClose = lightbox.querySelector('.vs-lightbox__close');
    const lightboxBackdrop = lightbox.querySelector('.vs-lightbox__backdrop');

    // Ouvrir le lightbox
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = item.querySelector('.vs-gallery__item-title');
            const desc = item.querySelector('.vs-gallery__item-desc');
            
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightboxCaption.innerHTML = `<strong>${title?.textContent || ''}</strong><br>${desc?.textContent || ''}`;
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Fermer le lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxBackdrop.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}
