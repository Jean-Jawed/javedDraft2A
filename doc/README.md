# Portfolio Jawed Tahir - Documentation

Site portfolio professionnel avec design Netflix moderne et architecture de données centralisée en JSON.

## 🏗️ Architecture du projet

```
javed.fr/
├── index.html              # Page d'accueil avec carrousel 3D
├── projets.html            # Catalogue des projets (génération dynamique)
├── about.html              # Page À propos
├── contact.html            # Page contact (formulaire désactivé)
├── favicon.ico             # Icône du site
├── data/
│   └── projets.json        # ⭐ Données centralisées des projets
├── css/
│   └── styles.css          # Feuille de styles unifiée
├── js/
│   └── main.js             # Logique JavaScript complète
└── assets/
    └── images/             # Images des projets et assets
        ├── logo.png
        └── ...
```

## 📊 Architecture des données (projets.json)

### Structure d'un projet

```json
{
  "id": "generation-ia",
  "titre": "Génération-ia.fr",
  "categorie": "webdesign",
  "images": {
    "image1": "assets/images/generation-ia.jpg",
    "image2": "assets/images/generation-ia2.jpg"
  },
  "descriptions": {
    "courte": "Plateforme IA française",
    "moyenne": "Plateforme référence dédiée à l'intelligence artificielle en France",
    "longue": "Site vitrine présentant les dernières avancées en IA avec articles et ressources"
  },
  "technologies": ["HTML", "CSS", "JavaScript", "SEO"],
  "liens": {
    "projet": "https://generation-ia.fr",
    "github": "https://github.com/jean-jawed/generation-ia"
  },
  "badges": [],
  "ordre": 1,
  "phare": false
}
```

### Champs obligatoires

| Champ | Type | Description |
|-------|------|-------------|
| `id` | string | Identifiant unique (kebab-case) |
| `titre` | string | Nom affiché du projet |
| `categorie` | string | Catégorie (voir liste ci-dessous) |
| `images.image1` | string | Image principale |
| `images.image2` | string | Image modale |
| `descriptions.courte` | string | Titre/accroche (~30 car.) |
| `descriptions.moyenne` | string | Description survol (~80 car.) |
| `descriptions.longue` | string | Description modale (~150 car.) |
| `technologies` | array | Liste des technologies |
| `liens.projet` | string | URL du site (optionnel) |
| `liens.github` | string | URL GitHub (optionnel) |
| `badges` | array | ["Coming Soon"] ou [] |
| `ordre` | number | Ordre d'affichage |
| `phare` | boolean | Afficher dans carrousel 3D (max 3) |

### Catégories disponibles

1. `webdesign` - 🌐 Web Design & Sites
2. `webapp` - 🎮 Applications Web Interactives
3. `ia` - 🤖 IA Learnings & ML
4. `data` - 📊 Data & Business Intelligence
5. `android` - 📱 Applications Android
6. `automation` - ⚙️ Automatisation & Workflow
7. `mediapipe` - 👁️ MediaPipe Détection d'Image
8. `tidal` - 🎵 Son Live Tidal

## 🚀 Ajouter un nouveau projet

1. Ouvrir `data/projets.json`
2. Ajouter une nouvelle entrée dans le tableau `projets` :

```json
{
  "id": "nouveau-projet",
  "titre": "Nouveau Projet",
  "categorie": "webdesign",
  "images": {
    "image1": "assets/images/nouveau-projet.jpg",
    "image2": "assets/images/nouveau-projet2.jpg"
  },
  "descriptions": {
    "courte": "Description courte",
    "moyenne": "Description moyenne pour le survol",
    "longue": "Description détaillée pour la modale"
  },
  "technologies": ["React", "Node.js", "MongoDB"],
  "liens": {
    "projet": "https://nouveau-projet.fr",
    "github": "https://github.com/user/nouveau-projet"
  },
  "badges": [],
  "ordre": 10,
  "phare": false
}
```

3. (Optionnel) Ajouter les images dans `assets/images/`
4. Sauvegarder et rafraîchir le navigateur

**Note :** Si les images ne sont pas présentes dans `/assets/images/`, le système charge automatiquement des images de secours adaptées depuis Unsplash.

## ⭐ Projets phares (carrousel 3D)

Pour afficher un projet dans le carrousel 3D de la page d'accueil :

1. Mettre `"phare": true` dans le JSON
2. S'assurer qu'il n'y a pas plus de 3 projets phares
3. Le projet apparaîtra automatiquement dans le carrousel

**Exemple de projets phares recommandés :**
- MarketPredikt (ia)
- Equiflow (android)
- LaunchSchedule (webdesign)

## 🎨 Système d'interactions Netflix

### Niveaux d'interaction

1. **État repos** : Vignette simple avec image et titre
2. **Survol (desktop)** : 
   - Scale 1.12
   - Overlay avec description et boutons
   - 3 boutons : Visiter / Détails / Voir le code
3. **Modale** : Détails complets avec toutes les technologies

### Hiérarchie des clics

1. **Priorité 1** : Boutons "Visiter" et "Voir le code" (ouvre dans nouvel onglet)
2. **Priorité 2** : Bouton "Détails" (ouvre la modale)
3. **Priorité 3** : Clic direct sur la card (visite le projet ou modale sur mobile)

### Responsive

- **Desktop (>768px)** : Système hover complet
- **Tablette** : Hover semi-actif
- **Mobile (<768px)** : Clic direct ouvre la modale

## 🖼️ Gestion des images

### Images locales

Placer les images dans `assets/images/` avec la nomenclature :
- `nom-projet.jpg` pour image1
- `nom-projet2.jpg` pour image2

### Fallback automatique

Si une image n'est pas trouvée, le système charge automatiquement une image de secours depuis Unsplash adaptée à la catégorie du projet.

## 🎯 Fonctionnalités techniques

- **Lazy loading** : Images chargées uniquement quand visibles
- **Scroll horizontal** : Navigation fluide par catégorie avec boutons
- **Carrousel 3D** : Rotation automatique toutes les 4 secondes
- **Animations GPU** : Performances optimales (60 fps)
- **Accessibilité** : Navigation clavier complète (Tab, Enter, Escape)
- **Responsive** : Mobile-first, adapté à tous les écrans

## 📱 Pages du site

### index.html
- Hero compact avec CTA
- Carrousel 3D des 3 projets phares
- Grille des 8 catégories

### projets.html
- 8 sections de catégories
- Scroll horizontal par catégorie
- Modale de détails
- Génération dynamique depuis JSON

### about.html
- Section bio et parcours
- Compétences techniques (6 catégories)
- Philosophie (6 valeurs)
- CTA vers contact

### contact.html
- Formulaire désactivé (à configurer avec EmailJS)
- Coordonnées et réseaux sociaux
- FAQ

## 🔧 Configuration technique

### Navigateurs supportés
- Chrome/Edge (6 derniers mois)
- Firefox (6 derniers mois)
- Safari 14+
- Mobile : iOS Safari 14+, Chrome Android

### Technologies
- HTML5
- CSS3 (Grid, Flexbox, Custom Properties, 3D Transforms)
- JavaScript ES6+ (async/await, fetch, modules)
- Google Fonts : Space Grotesk & Inter

## 📈 Performance

### Objectifs
- First Contentful Paint : < 1.5s
- Time to Interactive : < 3s
- Animations : 60 fps minimum

### Optimisations
- CSS minifié (1 ligne)
- Images lazy loading
- Debounce sur scroll (300ms)
- GPU acceleration
- Fallback images asynchrones

## 🎨 Identité visuelle

### Palette Netflix
```css
--color-primary: #141414      /* Fond gris béton */
--color-accent: #E50914       /* Rouge Netflix */
--color-white: #F8F8F8        /* Texte principal */
--color-secondary: #b3b3b3    /* Texte secondaire */
```

### Typographie
- **Titres** : Space Grotesk (Bold)
- **Corps** : Inter (Regular/Medium)

## 🚨 Dépannage

### Les projets ne s'affichent pas
1. Vérifier que `data/projets.json` existe
2. Vérifier la syntaxe JSON (virgules, guillemets)
3. Ouvrir la console navigateur (F12) pour voir les erreurs

### Images manquantes
- Vérifier le chemin dans le JSON
- Les images de secours s'affichent automatiquement si non trouvées

### Le carrousel 3D ne fonctionne pas
- Vérifier qu'il y a au moins 1 projet avec `"phare": true`
- Maximum 3 projets phares recommandés

## 📞 Support

Email : jawed_tahir@yahoo.fr
GitHub : https://github.com/jean-jawed

---

**Version** : 1.0
**Dernière mise à jour** : Novembre 2025
