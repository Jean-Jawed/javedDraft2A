// ===================================
// CHARGEMENT ET AFFICHAGE DES SKILLS
// ===================================

// Compteur global pour l'alternance gauche/droite
let alternanceCounter = 0;

// Charger les skills au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  loadSkills();
  initScrollButton();
});

// Initialiser le bouton de scroll
function initScrollButton() {
  const scrollBtn = document.getElementById('scrollToSkills');
  if (!scrollBtn) return;

  scrollBtn.addEventListener('click', () => {
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
      skillsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
}

async function loadSkills() {
  const container = document.getElementById('skillsContainer');
  if (!container) return;

  try {
    const response = await fetch('data/skills.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Générer les cards pour chaque package
    data.packages.forEach(pkg => {
      if (pkg.subPackages) {
        // Package avec sous-packages
        container.appendChild(createPackageWithSubpackages(pkg));
      } else {
        // Package simple
        container.appendChild(createSimplePackage(pkg));
      }
    });

  } catch (error) {
    console.error('Erreur chargement skills:', error);
    container.innerHTML = `
      <div style="padding: 3rem; text-align: center; color: var(--color-secondary);">
        <h3 style="color: var(--color-accent); margin-bottom: 1rem;">Impossible de charger les compétences</h3>
        <p>Veuillez vérifier que le fichier data/skills.json existe.</p>
      </div>
    `;
  }
}

// ===================================
// CRÉATION D'UN PACKAGE AVEC SOUS-PACKAGES
// ===================================

function createPackageWithSubpackages(pkg) {
  const card = document.createElement('div');
  card.className = 'skill-card';

  // Titre principal
  const title = document.createElement('h2');
  title.className = 'skill-card__main-title';
  title.textContent = pkg.name;
  card.appendChild(title);

  // Container des sous-cards
  const subcardsContainer = document.createElement('div');
  subcardsContainer.className = 'skill-card__subcards';

  // Créer chaque sous-package
  pkg.subPackages.forEach(subPkg => {
    const subcard = createSubcard(subPkg);
    subcardsContainer.appendChild(subcard);
  });

  card.appendChild(subcardsContainer);
  return card;
}

// ===================================
// CRÉATION D'UN PACKAGE SIMPLE
// ===================================

function createSimplePackage(pkg) {
  const card = document.createElement('div');
  card.className = 'skill-card';

  // Content (image + texte)
  const content = createCardContent(pkg.name, pkg.skills, pkg.bigImages, alternanceCounter % 2 === 1);
  card.appendChild(content);

  // Logos
  if (pkg.logos && pkg.logos.length > 0) {
    const logos = createLogosSection(pkg.logos);
    card.appendChild(logos);
  }

  alternanceCounter++;
  return card;
}

// ===================================
// CRÉATION D'UNE SUBCARD
// ===================================

function createSubcard(subPkg) {
  const subcard = document.createElement('div');
  subcard.className = 'skill-subcard';

  // Content (image + texte)
  const content = createCardContent(subPkg.name, subPkg.skills, subPkg.bigImages, alternanceCounter % 2 === 1);
  subcard.appendChild(content);

  // Logos
  if (subPkg.logos && subPkg.logos.length > 0) {
    const logos = createLogosSection(subPkg.logos);
    subcard.appendChild(logos);
  }

  alternanceCounter++;
  return subcard;
}

// ===================================
// CRÉATION DU CONTENU (IMAGE + TEXTE)
// ===================================

function createCardContent(title, skills, images, isRight) {
  const content = document.createElement('div');
  content.className = 'skill-card__content';
  if (isRight) {
    content.classList.add('skill-card__content--right');
  }

  // Image (si existe)
  if (images && images.length > 0) {
    const imageDiv = document.createElement('div');
    imageDiv.className = 'skill-card__image';
    
    const img = document.createElement('img');
    img.src = `assets/images/${images[0]}`;
    img.alt = title;
    img.loading = 'lazy';
    
    // Gestion erreur image
    img.onerror = function() {
      this.src = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600';
    };
    
    imageDiv.appendChild(img);
    content.appendChild(imageDiv);
  }

  // Texte
  const textDiv = document.createElement('div');
  textDiv.className = 'skill-card__text';

  // Titre
  const titleElem = document.createElement('h3');
  titleElem.className = 'skill-card__title';
  titleElem.textContent = title;
  textDiv.appendChild(titleElem);

  // Liste des skills
  const skillsList = document.createElement('div');
  skillsList.className = 'skill-card__skills';

  skills.forEach(skill => {
    const skillItem = document.createElement('div');
    skillItem.className = 'skill-item';

    const skillName = document.createElement('div');
    skillName.className = 'skill-item__name';
    skillName.textContent = skill.name;

    const skillDesc = document.createElement('div');
    skillDesc.className = 'skill-item__description';
    skillDesc.textContent = skill.description;

    skillItem.appendChild(skillName);
    skillItem.appendChild(skillDesc);
    skillsList.appendChild(skillItem);
  });

  textDiv.appendChild(skillsList);
  content.appendChild(textDiv);

  return content;
}

// ===================================
// CRÉATION DE LA SECTION LOGOS
// ===================================

function createLogosSection(logos) {
  const logosDiv = document.createElement('div');
  logosDiv.className = 'skill-card__logos';

  logos.forEach(logoFilename => {
    const img = document.createElement('img');
    img.src = `assets/images/${logoFilename}`;
    img.alt = logoFilename.replace(/\.(png|jpg|svg)/, '');
    img.className = 'skill-card__logo';
    img.loading = 'lazy';
    
    // Gestion erreur logo
    img.onerror = function() {
      this.style.display = 'none';
    };
    
    logosDiv.appendChild(img);
  });

  return logosDiv;
}