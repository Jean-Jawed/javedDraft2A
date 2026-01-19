# Installation et mise en place

Guide rapide pour déployer le portfolio Jawed Tahir.

## 📦 Contenu du package

Vous avez reçu les fichiers suivants :

```
javed.fr/
├── index.html
├── projets.html
├── about.html
├── contact.html
├── README.md
├── INSTALLATION.md (ce fichier)
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── data/
│   └── projets.json.example
└── assets/
    └── images/
        └── README.md
```

## 🚀 Étapes d'installation

### 1. Préparer le fichier projets.json

Le fichier `data/projets.json` doit être créé par vos soins. Un exemple est fourni dans `data/projets.json.example`.

**Action :** Renommer ou copier `projets.json.example` en `projets.json` et y ajouter vos projets.

```bash
cd data/
cp projets.json.example projets.json
# Puis éditer projets.json avec vos données
```

### 2. Ajouter les images

Placer vos images dans le dossier `assets/images/` :

**Fichiers obligatoires :**
- `logo.png` - Logo principal (50x50px min)
- `favicon.ico` - Icône du site

**Images des projets :**
- Pour chaque projet : `nom-projet.jpg` et `nom-projet2.jpg`

**Note :** Si les images ne sont pas présentes, le système utilisera automatiquement des images de secours depuis Unsplash.

### 3. Tester en local

#### Option A : Serveur Python
```bash
python3 -m http.server 8000
# Ouvrir http://localhost:8000
```

#### Option B : Serveur PHP
```bash
php -S localhost:8000
# Ouvrir http://localhost:8000
```

#### Option C : Extension VS Code
Installer "Live Server" et clic droit sur index.html > "Open with Live Server"

### 4. Déployer en production

#### Hébergement statique (recommandé)

**Netlify / Vercel / GitHub Pages :**
1. Créer un dépôt Git
2. Pousser tous les fichiers
3. Connecter le dépôt à Netlify/Vercel
4. Déploiement automatique !

**Configuration Netlify (`netlify.toml`) :**
```toml
[build]
  publish = "."
  
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "no-referrer-when-downgrade"
```

#### Hébergement traditionnel (FTP)

Uploader tous les fichiers via FTP en respectant la structure :
- Racine : index.html, projets.html, about.html, contact.html
- Sous-dossiers : css/, js/, data/, assets/

## ⚙️ Configuration optionnelle

### Google Analytics

Décommenter et configurer dans `index.html` (et autres pages) :

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'VOTRE_GA_MEASUREMENT_ID');
</script>
```

### Formulaire de contact (EmailJS)

Dans `contact.html`, décommenter et configurer :

1. Créer un compte sur https://www.emailjs.com
2. Créer un service email
3. Créer un template
4. Récupérer les clés
5. Décommenter le script EmailJS dans `contact.html`
6. Remplacer `YOUR_SERVICE_ID` et `YOUR_TEMPLATE_ID`

### Meta OpenGraph

Ajouter une image `og-image.jpg` dans `assets/images/` (1200x630px)

## ✅ Checklist avant déploiement

- [ ] Fichier `data/projets.json` créé avec tous les projets
- [ ] Images ajoutées dans `assets/images/`
- [ ] Logo et favicon présents
- [ ] Test en local réussi
- [ ] Google Analytics configuré (optionnel)
- [ ] Formulaire EmailJS configuré (optionnel)
- [ ] Meta tags OpenGraph vérifiés
- [ ] URLs GitHub et LinkedIn mises à jour dans footer

## 🔍 Vérifications

### Tester le chargement des projets

1. Ouvrir la console navigateur (F12)
2. Aller sur projets.html
3. Vérifier qu'il n'y a pas d'erreur "Failed to load projets.json"
4. Les projets doivent s'afficher dans leurs catégories respectives

### Tester le carrousel 3D

1. Aller sur index.html
2. Vérifier que 3 projets phares s'affichent en rotation
3. Tester les flèches de navigation
4. Vérifier la rotation automatique

### Tester les interactions

1. Survoler une vignette de projet (desktop)
2. L'overlay doit apparaître avec les boutons
3. Cliquer sur "Détails" doit ouvrir la modale
4. Cliquer sur "Visiter" doit ouvrir le site dans un nouvel onglet

## 🆘 Problèmes courants

### Les projets ne s'affichent pas

**Solution :** Vérifier que `data/projets.json` existe et contient des données valides (JSON valide).

### Images manquantes

**Solution :** Vérifier les chemins dans projets.json. Les images de fallback s'afficheront automatiquement.

### Le carrousel 3D ne tourne pas

**Solution :** Vérifier qu'au moins 1 projet a `"phare": true` dans projets.json.

### Erreur CORS en local

**Solution :** Utiliser un serveur local (Python, PHP, Live Server) au lieu d'ouvrir directement le fichier HTML.

## 📞 Support

Pour toute question :
- Email : jawed_tahir@yahoo.fr
- GitHub : https://github.com/jean-jawed

## 🎉 Prochaines étapes

Une fois le site déployé :

1. **SEO** : Soumettre le sitemap à Google Search Console
2. **Performance** : Tester avec Lighthouse et optimiser
3. **Analytics** : Configurer Google Analytics pour suivre le trafic
4. **Maintenance** : Mettre à jour régulièrement `projets.json` avec de nouveaux projets

---

**Bon développement !** 🚀
