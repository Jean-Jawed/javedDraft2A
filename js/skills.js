/* ============================================
   SKILLS.JS — Données + génération dynamique
   ============================================ */

const STACK = [
  {
    id: "backend",
    label: "Backend & Langages",
    colorClass: "backend",
    items: [
      { name: "Python", icon: "devicon-python-plain" },
      { name: "Go", icon: "devicon-go-plain" },
      { name: "Node.js", icon: "devicon-nodejs-plain" },
      { name: "TypeScript", icon: "devicon-typescript-plain" },
      { name: "FastAPI", icon: "devicon-fastapi-plain" },
      { name: "Flask", icon: "devicon-flask-original" },
      { name: "Ruby on Rails", icon: "devicon-rails-plain" },
      { name: "PHP", icon: "devicon-php-plain" },
    ]
  },
  {
    id: "data",
    label: "Data & Bases de données",
    colorClass: "data",
    items: [
      { name: "PostgreSQL", icon: "devicon-postgresql-plain" },
      { name: "PostGIS", icon: "devicon-postgresql-plain" },
      { name: "MongoDB", icon: "devicon-mongodb-plain" },
      { name: "Redis", icon: "devicon-redis-plain" },
      { name: "Apache NiFi", icon: null, emoji: "⚙️" },
      { name: "Power BI", icon: null, emoji: "📊" },
      { name: "SQL Server", icon: "devicon-microsoftsqlserver-plain" },
      { name: "Oracle", icon: "devicon-oracle-original" },
    ]
  },
  {
    id: "infra",
    label: "DevOps & Infra",
    colorClass: "infra",
    items: [
      { name: "Docker", icon: "devicon-docker-plain" },
      { name: "Kubernetes", icon: "devicon-kubernetes-plain" },
      { name: "GitHub Actions", icon: "devicon-github-original" },
      { name: "GitLab CI/CD", icon: "devicon-gitlab-plain" },
      { name: "Terraform", icon: "devicon-terraform-plain" },
      { name: "Supabase", icon: null, emoji: "⚡" },
      { name: "Firebase", icon: "devicon-firebase-plain" },
    ]
  },
  {
    id: "frontend",
    label: "Frontend & Web",
    colorClass: "frontend",
    items: [
      { name: "React", icon: "devicon-react-original" },
      { name: "Next.js", icon: "devicon-nextjs-plain" },
      { name: "Angular", icon: "devicon-angularjs-plain" },
      { name: "HTML5", icon: "devicon-html5-plain" },
      { name: "CSS3", icon: "devicon-css3-plain" },
      { name: "D3.js", icon: "devicon-d3js-plain" },
      { name: "WordPress", icon: "devicon-wordpress-plain" },
    ]
  },
  {
    id: "ai",
    label: "IA & Machine Learning",
    colorClass: "ai",
    items: [
      { name: "scikit-learn", icon: null, emoji: "🤖" },
      { name: "NumPy / SciPy", icon: "devicon-numpy-plain" },
      { name: "MATLAB", icon: "devicon-matlab-plain" },
      { name: "RAG / LLM", icon: null, emoji: "🧠" },
      { name: "pgvector", icon: null, emoji: "🔍" },
      { name: "R", icon: "devicon-r-plain" },
    ]
  },
  {
    id: "scripting",
    label: "Scripting & Outils",
    colorClass: "scripting",
    items: [
      { name: "Bash", icon: "devicon-bash-plain" },
      { name: "PowerShell", icon: null, emoji: "💻" },
      { name: "VBA", icon: null, emoji: "📋" },
      { name: "Rust", icon: "devicon-rust-plain" },
      { name: "QGIS", icon: null, emoji: "🗺️" },
      { name: "LabVIEW", icon: null, emoji: "🔬" },
    ]
  }
];

const DOMAINS = [
  {
    icon: "🏗️",
    title: "Architecture Backend & Systèmes distribués",
    desc: "Conception de microservices, APIs REST/gRPC, messagerie asynchrone (Kafka, RabbitMQ). Choix d'architecture adaptés à la complexité métier, de l'appli monolithique au système distribué.",
    tags: ["Microservices", "REST", "gRPC", "Event-driven", "API Gateway"],
    color: "#4A9EFF"
  },
  {
    icon: "🗄️",
    title: "Data Engineering & Pipelines",
    desc: "Pipelines ETL/ELT avec Apache NiFi, modélisation PostgreSQL avancée (PostGIS, partitionnement, sharding). Dashboards décisionnels, monitoring qualité des données, Data Contracts.",
    tags: ["ETL/ELT", "Apache NiFi", "PostgreSQL", "PostGIS", "Power BI"],
    color: "#34D399"
  },
  {
    icon: "☁️",
    title: "DevOps & Déploiement Cloud Native",
    desc: "Containerisation Docker, orchestration Kubernetes, pipelines CI/CD GitLab/GitHub. Infrastructure as Code avec Terraform. Optimisation FinOps et résilience (Circuit Breaker, Rate Limiting).",
    tags: ["Docker", "Kubernetes", "CI/CD", "Terraform", "GitHub Actions"],
    color: "#F59E0B"
  },
  {
    icon: "🤖",
    title: "IA appliquée & Machine Learning",
    desc: "Intégration LLM, systèmes RAG pour exploitation de données privées, recherche vectorielle (pgvector). Modélisation ML (scikit-learn), traitement statistique avancé en Python et R.",
    tags: ["RAG", "LLM", "pgvector", "scikit-learn", "NLP"],
    color: "#F87171"
  },
  {
    icon: "🌐",
    title: "Web & Applications full stack",
    desc: "Applications React/Next.js performantes, SEO technique (Core Web Vitals, SSR), CMS headless. Intégrations Stripe, RGPD, Analytics. De la maquette à la mise en production.",
    tags: ["React", "Next.js", "SSR", "SEO", "Stripe"],
    color: "#A78BFA"
  },
  {
    icon: "📐",
    title: "Conseil & Audit technique",
    desc: "Mentorat Clean Code, veille IA générative, audit digitalisation TPE/PME. Accompagnement dans les choix technologiques, migration legacy, et montée en compétence des équipes.",
    tags: ["Clean Code", "Audit", "Migration", "Mentorat", "Agile"],
    color: "#94A3B8"
  }
];

// ---- Génération Stack ----
function renderStack() {
  const container = document.getElementById('stackContainer');
  if (!container) return;

  STACK.forEach((domain, i) => {
    const block = document.createElement('div');
    block.className = 'sk-domain-block';
    block.style.animationDelay = `${i * 0.08}s`;

    const header = document.createElement('div');
    header.className = 'sk-domain-block__header';
    header.innerHTML = `
      <div class="sk-domain-block__dot sk-dot--${domain.colorClass}"></div>
      <span class="sk-domain-block__label">${domain.label}</span>
      <div class="sk-domain-block__line"></div>
    `;

    const tags = document.createElement('div');
    tags.className = 'sk-tags';

    domain.items.forEach(item => {
      const tag = document.createElement('div');
      tag.className = `sk-tag sk-tag--${domain.colorClass}`;

      let iconHtml = '';
      if (item.icon) {
        iconHtml = `<i class="${item.icon} colored"></i>`;
      } else if (item.emoji) {
        iconHtml = `<span>${item.emoji}</span>`;
      }

      tag.innerHTML = `${iconHtml}<span>${item.name}</span>`;
      tags.appendChild(tag);
    });

    block.appendChild(header);
    block.appendChild(tags);
    container.appendChild(block);
  });
}

// ---- Génération Domaines ----
function renderDomains() {
  const container = document.getElementById('domainsContainer');
  if (!container) return;

  DOMAINS.forEach((domain, i) => {
    const card = document.createElement('div');
    card.className = 'sk-expertise-card';
    card.style.setProperty('--card-color', domain.color);
    card.style.animationDelay = `${i * 0.1}s`;

    const tagsHtml = domain.tags
      .map(t => `<span class="sk-expertise-mini-tag">${t}</span>`)
      .join('');

    card.innerHTML = `
      <span class="sk-expertise-card__icon">${domain.icon}</span>
      <h3 class="sk-expertise-card__title">${domain.title}</h3>
      <p class="sk-expertise-card__desc">${domain.desc}</p>
      <div class="sk-expertise-card__tags">${tagsHtml}</div>
    `;

    container.appendChild(card);
  });
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  renderStack();
  renderDomains();
});
