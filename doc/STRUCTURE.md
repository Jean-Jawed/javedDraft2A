# Structure du projet

Documentation complète de l'architecture du portfolio Jawed Tahir.

## 📁 Arborescence complète

```
javed.fr/
│
├── 📄 index.html                  # Page d'accueil avec carrousel 3D
├── 📄 projets.html                # Catalogue des projets
├── 📄 about.html                  # Page À propos
├── 📄 contact.html                # Page contact
├── 📄 favicon.ico                 # À fournir
│
├── 📋 README.md                   # Documentation principale
├── 📋 INSTALLATION.md             # Guide d'installation
├── 📋 STRUCTURE.md                # Ce fichier
│
├── 📂 css/
│   └── 📄 styles.css              # Styles Netflix complets (minifié)
│
├── 📂 js/
│   └── 📄 main.js                 # Logique complète du site
│
├── 📂 data/
│   ├── 📄 projets.json            # ⚠️ À CRÉER - Données des projets
│   ├── 📄 projets.json.example    # Exemple avec 4 projets
│   └── 📄 projets.json.template   # Template vide
│
└── 📂 assets/
    └── 📂 images/
        ├── 📄 README.md           # Guide pour les images
        ├── 🖼️ logo.png            # ⚠️ À FOURNIR
        ├── 🖼️ favicon.ico         # ⚠️ À FOURNIR
        └── 🖼️ *.jpg               # ⚠️ Images des projets à fournir
```

## 🔑 Fichiers clés

### ⚠️ À créer obligatoirement

| Fichier | Description | Action requise |
|---------|-------------|----------------|
| `data/projets.json` | Données de tous les projets | Copier depuis `.example` et remplir |
| `assets/images/logo.png` | Logo du site | Fournir (50x50px min) |
| `assets/images/favicon.ico` | Icône du site | Fournir (16x16 ou 32x32px) |

### ✅ Fichiers fournis (prêts à l'emploi)

| Fichier | Description | Statut |
|---------|-------------|--------|
| `index.html` | Page d'accueil | ✅ Complet |
| `projets.html` | Page projets | ✅ Complet |
| `about.html` | Page à propos | ✅ Complet |
| `contact.html` | Page contact | ✅ Complet (formulaire désactivé) |
| `css/styles.css` | Styles Netflix | ✅ Complet et minifié |
| `js/main.js` | JavaScript complet | ✅ Complet |

## 📊 Flux de données

```
┌─────────────────┐
│ projets.json    │ ──────┐
│ (Source unique) │       │
└─────────────────┘       │
                          ↓
                    ┌──────────┐
                    │ main.js  │
                    │ fetch()  │
                    └──────────┘
                          │
        ┌─────────────────┼─────────────────┐
        ↓                 ↓                 ↓
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Carrousel 3D │  │ Page projets │  │   Modale     │
│ (3 phares)   │  │ (8 catégories│  │  (détails)   │
└──────────────┘  └──────────────┘  └──────────────┘
```

## 🎨 Architecture CSS

Le fichier `styles.css` est organisé par composants :

1. **Reset & Variables** : Couleurs, typographie
2. **Header** : Navigation fixe avec backdrop-filter
3. **Buttons** : Styles primaire/secondaire
4. **Hero** : Section d'accueil compact
5. **Carrousel 3D** : Transformation 3D avec perspective
6. **Categories** : Grille de catégories avec hover
7. **Streaming** : Scroll horizontal par catégorie
8. **Project Cards** : Système Netflix complet
9. **Modal** : Overlay avec détails projet
10. **About** : Sections bio, skills, philosophie
11. **Contact** : Formulaire et infos
12. **Footer** : Pied de page minimaliste

## 🔧 Architecture JavaScript

Le fichier `main.js` contient :

### 1. Utilitaires
- `debounce()` : Optimisation performance
- `getFallbackImageUrl()` : Images de secours
- `loadImageWithFallback()` : Chargement avec fallback

### 2. Navigation
- Menu burger mobile
- Header au scroll
- Ancres smooth scroll

### 3. Gestion des projets
- `loadProjects()` : Chargement depuis JSON
- `createProjectCard()` : Création des vignettes
- Groupement par catégorie
- Tri par ordre

### 4. Carrousel 3D
- `loadCarousel3D()` : Chargement projets phares
- `updateCarouselPosition()` : Rotation 3D
- Navigation automatique (4s)
- Pause au hover

### 5. Interactions
- Système hover Netflix
- Modale de détails
- Navigation scroll horizontal
- Gestion des clics hiérarchiques

### 6. Modale
- `openModal()` : Affichage détails
- `closeModal()` : Fermeture (3 méthodes)
- Gestion du contenu dynamique

## 🎯 Points d'entrée

### Page d'accueil (index.html)
```javascript
// Au chargement
loadCarousel3D()
  ├── Fetch projets.json
  ├── Filtrer projets phares (max 3)
  ├── Créer cards 3D
  └── Initialiser rotation automatique
```

### Page projets (projets.html)
```javascript
// Au chargement
loadProjects()
  ├── Fetch projets.json
  ├── Grouper par catégorie
  ├── Trier par ordre
  ├── Générer cards dans chaque conteneur
  └── Initialiser interactions Netflix
```

## 🔗 Dépendances

### Externes
- Google Fonts : Space Grotesk & Inter
- Unsplash : Images de fallback (facultatif)

### Internes
- Aucune bibliothèque JavaScript requise
- Vanilla JS uniquement
- CSS natif (Grid, Flexbox, 3D Transforms)

## 📱 Responsive breakpoints

```css
Desktop   : > 1024px   (Layout complet)
Tablette  : 768-1024px (Grids adaptées)
Mobile    : < 768px    (Layout 1 colonne)
```

### Adaptations mobiles
- Menu burger
- Carrousel 3D simplifié
- Cards plus petites (280px)
- Modale plein écran
- Suppression du hover
- Clic direct ouvre modale

## 🎨 Système de design

### Couleurs (variables CSS)
```css
--color-primary: #141414      /* Fond gris béton */
--color-accent: #E50914       /* Rouge Netflix */
--color-white: #F8F8F8        /* Texte */
--color-secondary: #b3b3b3    /* Texte secondaire */
--color-bg-light: #1f1f1f     /* Fond clair */
--color-bg-lighter: #2a2a2a   /* Cards */
--color-border: #404040       /* Bordures */
```

### Espacements
- Base : 8px
- Multiples : 0.5rem, 1rem, 1.5rem, 2rem, 3rem, 4rem

### Animations
- Durée : 300ms (interactions) / 800ms (carrousel)
- Timing : `cubic-bezier(0.4, 0, 0.2, 1)`
- GPU : `will-change: transform`

## 🚀 Optimisations

### Performance
- Lazy loading images
- CSS minifié (1 ligne)
- Debounce scroll events (300ms)
- GPU acceleration transforms
- Fallback images asynchrones

### Accessibilité
- Navigation clavier complète
- Attributs ARIA
- Focus visible
- Alt texts sur images
- Contraste WCAG AA

### SEO
- Meta tags complets
- Balises sémantiques HTML5
- Sitemap recommandé
- Structured data possible

## 🔄 Workflow de mise à jour

### Ajouter un projet

1. Éditer `data/projets.json`
2. Ajouter une entrée avec tous les champs
3. (Optionnel) Ajouter images dans `assets/images/`
4. Sauvegarder
5. Rafraîchir → Projet apparaît automatiquement

### Modifier un projet

1. Trouver le projet par `id` dans JSON
2. Modifier les champs souhaités
3. Sauvegarder
4. Rafraîchir → Modifications visibles

### Marquer comme projet phare

1. Mettre `"phare": true` dans JSON
2. Limiter à 3 projets phares max
3. Sauvegarder
4. Rafraîchir → Apparaît dans carrousel 3D

## 📊 Métriques et monitoring

### Performance cibles
- First Contentful Paint : < 1.5s
- Time to Interactive : < 3s
- Animations : 60 fps
- Lighthouse score : > 90

### À monitorer
- Temps de chargement JSON
- Nombre de projets affichés
- Taux de clic sur projets
- Interactions modale

## 🔐 Sécurité

### En place
- Pas de dépendances externes vulnérables
- Vanilla JS (pas de npm)
- Pas de formulaire actif par défaut
- Headers de sécurité recommandés

### Recommandations
- HTTPS obligatoire en production
- CSP (Content Security Policy)
- Headers de sécurité (voir INSTALLATION.md)

---

**Questions ?** Consulter README.md ou INSTALLATION.md
