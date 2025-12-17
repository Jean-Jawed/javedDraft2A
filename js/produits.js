// ===================================
// CHARGEMENT ET AFFICHAGE DES PRODUITS
// ===================================

// Charger les produits au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
});

async function loadProducts() {
  const navContainer = document.getElementById('productsNav');
  const productsContainer = document.getElementById('productsContainer');
  
  if (!navContainer || !productsContainer) return;

  try {
    const response = await fetch('data/produits.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Générer les boutons de navigation
    data.products.forEach(product => {
      const btn = createNavButton(product);
      navContainer.appendChild(btn);
    });

    // Générer les cards de produits
    data.products.forEach(product => {
      const card = createProductCard(product);
      productsContainer.appendChild(card);
    });

  } catch (error) {
    console.error('Erreur chargement produits:', error);
    productsContainer.innerHTML = `
      <div style="padding: 3rem; text-align: center; color: var(--color-secondary);">
        <h3 style="color: var(--color-accent); margin-bottom: 1rem;">Impossible de charger les solutions</h3>
        <p>Veuillez vérifier que le fichier data/produits.json existe.</p>
      </div>
    `;
  }
}

// ===================================
// CRÉATION BOUTON DE NAVIGATION
// ===================================

function createNavButton(product) {
  const btn = document.createElement('button');
  btn.className = 'products-nav__btn';
  
  // Scroll vers le produit au clic
  btn.addEventListener('click', () => {
    const productCard = document.getElementById(`product-${product.id}`);
    if (productCard) {
      productCard.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  });

  // Emoji
  const emoji = document.createElement('span');
  emoji.className = 'products-nav__emoji';
  emoji.textContent = product.emoji;

  // Texte court depuis JSON
  const text = document.createElement('span');
  text.className = 'products-nav__text';
  text.textContent = product.shortName || product.name;

  btn.appendChild(emoji);
  btn.appendChild(text);

  return btn;
}

// ===================================
// CRÉATION CARD PRODUIT
// ===================================

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.id = `product-${product.id}`;

  // Header (titre + tagline)
  const header = document.createElement('div');
  header.className = 'product-card__header';

  const title = document.createElement('h2');
  title.className = 'product-card__title';
  
  const emoji = document.createElement('span');
  emoji.className = 'product-card__emoji';
  emoji.textContent = product.emoji;
  
  const titleText = document.createElement('span');
  titleText.textContent = product.name;
  
  title.appendChild(emoji);
  title.appendChild(titleText);

  const tagline = document.createElement('p');
  tagline.className = 'product-card__tagline';
  tagline.textContent = product.tagline;

  header.appendChild(title);
  header.appendChild(tagline);
  card.appendChild(header);

  // Content (images + services)
  const content = createProductContent(product);
  card.appendChild(content);

  return card;
}

// ===================================
// CRÉATION CONTENU (IMAGES + SERVICES)
// ===================================

function createProductContent(product) {
  const content = document.createElement('div');
  content.className = 'product-card__content';

  const images = product.bigImages || [];
  const services = product.services || [];
  const nbImages = images.length;
  const nbServices = services.length;

  // Si pas d'images, tous les services ensemble
  if (nbImages === 0) {
    const servicesBlock = document.createElement('div');
    servicesBlock.className = 'product-block__services';
    services.forEach(service => {
      servicesBlock.appendChild(createServiceItem(service));
    });
    content.appendChild(servicesBlock);
    return content;
  }

  // Calcul : répartir les services entre les images
  const servicesPerImage = Math.ceil(nbServices / nbImages);
  
  let serviceIndex = 0;
  let alternance = false;

  for (let i = 0; i < nbImages; i++) {
    // Créer un bloc image + services
    const block = document.createElement('div');
    block.className = 'product-block';
    if (alternance) {
      block.classList.add('product-block--right');
    }

    // Image
    const imageDiv = document.createElement('div');
    imageDiv.className = 'product-block__image';
    
    const img = document.createElement('img');
    img.src = `assets/images/${images[i]}`;
    img.alt = product.name;
    img.loading = 'lazy';
    
    // Gestion erreur image
    img.onerror = function() {
      this.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600';
    };
    
    imageDiv.appendChild(img);

    // Services associés à cette image
    const servicesDiv = document.createElement('div');
    servicesDiv.className = 'product-block__services';

    // Prendre les services pour cette image
    const endIndex = Math.min(serviceIndex + servicesPerImage, nbServices);
    for (let j = serviceIndex; j < endIndex; j++) {
      servicesDiv.appendChild(createServiceItem(services[j]));
    }
    serviceIndex = endIndex;

    block.appendChild(imageDiv);
    block.appendChild(servicesDiv);
    content.appendChild(block);

    alternance = !alternance;
  }

  // S'il reste des services (derniers non associés à une image)
  if (serviceIndex < nbServices) {
    const remainingDiv = document.createElement('div');
    remainingDiv.className = 'product-block__services';
    remainingDiv.style.gridColumn = '1 / -1'; // Prend toute la largeur
    
    for (let j = serviceIndex; j < nbServices; j++) {
      remainingDiv.appendChild(createServiceItem(services[j]));
    }
    
    content.appendChild(remainingDiv);
  }

  return content;
}

// ===================================
// CRÉATION SERVICE ITEM
// ===================================

function createServiceItem(service) {
  const item = document.createElement('div');
  item.className = 'service-item';

  const name = document.createElement('div');
  name.className = 'service-item__name';
  name.textContent = service.name;

  const description = document.createElement('div');
  description.className = 'service-item__description';
  description.textContent = service.description;

  item.appendChild(name);
  item.appendChild(description);

  return item;
}