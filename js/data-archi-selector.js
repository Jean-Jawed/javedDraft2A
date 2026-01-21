/**
 * Data Architecture Selector - Logic & PDF Export
 */

// Questions data
const questions = [
    {
        id: 'data_type',
        category: 'Nature des données',
        title: 'Quel est le type principal de données que vous manipulez ?',
        description: 'Cela nous aide à déterminer les systèmes de stockage les plus adaptés.',
        type: 'single',
        options: [
            { value: 'structured', icon: '📊', title: 'Structurées', desc: 'Tables, SQL, schémas fixes' },
            { value: 'semi_structured', icon: '📝', title: 'Semi-structurées', desc: 'JSON, XML, logs' },
            { value: 'unstructured', icon: '🎬', title: 'Non-structurées', desc: 'Images, vidéos, documents' },
            { value: 'mixed', icon: '🔀', title: 'Mixte', desc: 'Combinaison de tous types' }
        ]
    },
    {
        id: 'data_volume',
        category: 'Volume de données',
        title: 'Quel volume de données gérez-vous actuellement ?',
        description: 'Estimez le volume total stocké, pas le flux quotidien.',
        type: 'slider',
        min: 1,
        max: 1000,
        unit: 'TB',
        labels: ['1 TB', '100 TB', '500 TB', '1 PB+']
    },
    {
        id: 'growth_rate',
        category: 'Croissance',
        title: 'Quel est votre taux de croissance mensuel des données ?',
        description: 'Cela impacte les choix de scalabilité et de stockage.',
        type: 'single',
        options: [
            { value: 'stable', icon: '📉', title: 'Stable', desc: '< 5% par mois' },
            { value: 'moderate', icon: '📈', title: 'Modéré', desc: '5-20% par mois' },
            { value: 'rapid', icon: '🚀', title: 'Rapide', desc: '20-50% par mois' },
            { value: 'explosive', icon: '💥', title: 'Explosif', desc: '> 50% par mois' }
        ]
    },
    {
        id: 'read_pattern',
        category: 'Patterns de lecture',
        title: 'Comment vos données sont-elles principalement lues ?',
        description: 'Le pattern de lecture influence le choix du moteur de requêtes.',
        type: 'single',
        options: [
            { value: 'oltp', icon: '⚡', title: 'Transactionnel (OLTP)', desc: 'Lectures fréquentes, petits volumes' },
            { value: 'olap', icon: '📊', title: 'Analytique (OLAP)', desc: 'Requêtes complexes, grands volumes' },
            { value: 'realtime', icon: '🔴', title: 'Temps réel', desc: 'Streaming, latence < 100ms' },
            { value: 'batch', icon: '📦', title: 'Batch', desc: 'Traitements planifiés, pas de contrainte temps' }
        ]
    },
    {
        id: 'write_frequency',
        category: 'Fréquence d\'écriture',
        title: 'À quelle fréquence écrivez-vous des données ?',
        description: 'Impacte le choix entre systèmes optimisés lecture vs écriture.',
        type: 'single',
        options: [
            { value: 'continuous', icon: '🌊', title: 'Continu', desc: 'Flux constant 24/7' },
            { value: 'frequent', icon: '⏰', title: 'Fréquent', desc: 'Plusieurs fois par heure' },
            { value: 'periodic', icon: '📅', title: 'Périodique', desc: 'Quelques fois par jour' },
            { value: 'rare', icon: '🌙', title: 'Rare', desc: 'Hebdomadaire ou moins' }
        ]
    },
    {
        id: 'latency_requirement',
        category: 'Exigences de latence',
        title: 'Quelle latence maximale est acceptable pour vos requêtes ?',
        description: 'Contrainte critique pour le choix de l\'infrastructure.',
        type: 'single',
        options: [
            { value: 'realtime', icon: '⚡', title: 'Temps réel', desc: '< 100 ms' },
            { value: 'interactive', icon: '👆', title: 'Interactif', desc: '< 1 seconde' },
            { value: 'standard', icon: '⏱️', title: 'Standard', desc: '< 30 secondes' },
            { value: 'flexible', icon: '🕐', title: 'Flexible', desc: 'Minutes acceptables' }
        ]
    },
    {
        id: 'use_cases',
        category: 'Cas d\'usage',
        title: 'Quels sont vos principaux cas d\'usage ?',
        description: 'Sélectionnez tous ceux qui s\'appliquent.',
        type: 'multi',
        options: [
            { value: 'reporting', label: '📊 Reporting / BI' },
            { value: 'ml', label: '🤖 Machine Learning' },
            { value: 'search', label: '🔍 Recherche full-text' },
            { value: 'api', label: '🔌 APIs temps réel' },
            { value: 'iot', label: '📡 IoT / Capteurs' },
            { value: 'logs', label: '📋 Analyse de logs' },
            { value: 'etl', label: '🔄 ETL / Intégration' },
            { value: 'archival', label: '🗄️ Archivage long terme' }
        ]
    },
    {
        id: 'security_level',
        category: 'Sécurité',
        title: 'Quel niveau de sécurité est requis ?',
        description: 'Conformité réglementaire et sensibilité des données.',
        type: 'single',
        options: [
            { value: 'basic', icon: '🔓', title: 'Standard', desc: 'Données non sensibles' },
            { value: 'medium', icon: '🔐', title: 'Renforcé', desc: 'Données métier confidentielles' },
            { value: 'high', icon: '🛡️', title: 'Élevé', desc: 'PII, données financières' },
            { value: 'critical', icon: '🏛️', title: 'Critique', desc: 'RGPD, HIPAA, PCI-DSS' }
        ]
    },
    {
        id: 'team_size',
        category: 'Équipe',
        title: 'Quelle est la taille de votre équipe data ?',
        description: 'Impacte la complexité opérationnelle recommandée.',
        type: 'single',
        options: [
            { value: 'small', icon: '👤', title: 'Petite', desc: '1-3 personnes' },
            { value: 'medium', icon: '👥', title: 'Moyenne', desc: '4-10 personnes' },
            { value: 'large', icon: '🏢', title: 'Grande', desc: '11-30 personnes' },
            { value: 'enterprise', icon: '🌐', title: 'Enterprise', desc: '30+ personnes' }
        ]
    },
    {
        id: 'cloud_preference',
        category: 'Infrastructure',
        title: 'Quelle est votre préférence cloud ?',
        description: 'Nous adapterons les recommandations d\'outils.',
        type: 'single',
        options: [
            { value: 'aws', icon: '☁️', title: 'AWS', desc: 'Amazon Web Services' },
            { value: 'gcp', icon: '🌐', title: 'GCP', desc: 'Google Cloud Platform' },
            { value: 'azure', icon: '🔷', title: 'Azure', desc: 'Microsoft Azure' },
            { value: 'multi', icon: '🔀', title: 'Multi-cloud', desc: 'Stratégie hybride' },
            { value: 'onprem', icon: '🏠', title: 'On-premise', desc: 'Infrastructure locale' }
        ]
    },
    {
        id: 'budget',
        category: 'Budget',
        title: 'Quel est votre budget mensuel infrastructure data ?',
        description: 'Aide à recommander des solutions adaptées à vos moyens.',
        type: 'slider',
        min: 500,
        max: 100000,
        unit: '€/mois',
        labels: ['500€', '10K€', '50K€', '100K€+']
    },
    {
        id: 'timeline',
        category: 'Planning',
        title: 'Quel est votre horizon de déploiement ?',
        description: 'Influence la complexité et maturité des solutions proposées.',
        type: 'single',
        options: [
            { value: 'urgent', icon: '🔥', title: 'Urgent', desc: '< 1 mois' },
            { value: 'short', icon: '📆', title: 'Court terme', desc: '1-3 mois' },
            { value: 'medium', icon: '📅', title: 'Moyen terme', desc: '3-6 mois' },
            { value: 'long', icon: '🗓️', title: 'Long terme', desc: '6+ mois' }
        ]
    }
];

let currentQuestion = 0;
let answers = {};

// Initialize
function init() {
    renderQuestion(currentQuestion);
    updateProgress();
}

// Format number with spaces
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Render question
function renderQuestion(index) {
    const question = questions[index];
    const card = document.getElementById('questionCard');
    
    let contentHTML = `
        <div class="data-question__header">
            <span class="data-question__number">Q${index + 1}</span>
            <span class="data-question__category">${question.category}</span>
        </div>
        <h2 class="data-question__title">${question.title}</h2>
        <p class="data-question__desc">${question.description}</p>
    `;

    if (question.type === 'single') {
        contentHTML += `<div class="data-options-grid">`;
        question.options.forEach(opt => {
            const selected = answers[question.id] === opt.value ? 'selected' : '';
            contentHTML += `
                <div class="data-option ${selected}" onclick="selectOption('${question.id}', '${opt.value}', this)">
                    <div class="data-option__icon">${opt.icon}</div>
                    <div class="data-option__title">${opt.title}</div>
                    <div class="data-option__desc">${opt.desc}</div>
                </div>
            `;
        });
        contentHTML += `</div>`;
    } else if (question.type === 'slider') {
        const currentValue = answers[question.id] || question.min;
        contentHTML += `
            <div class="data-slider-container">
                <div class="data-slider__labels">
                    ${question.labels.map(l => `<span>${l}</span>`).join('')}
                </div>
                <div class="data-slider__wrapper">
                    <input type="range" class="data-slider__input" min="${question.min}" max="${question.max}" value="${currentValue}" 
                           onchange="updateSlider('${question.id}', this.value)" 
                           oninput="updateSliderDisplay(this.value, '${question.unit}')">
                </div>
                <div class="data-slider__value" id="sliderValue">
                    ${formatNumber(currentValue)}<span class="data-slider__unit">${question.unit}</span>
                </div>
            </div>
        `;
    } else if (question.type === 'multi') {
        const selected = answers[question.id] || [];
        contentHTML += `<div class="data-multi-grid">`;
        question.options.forEach(opt => {
            const isSelected = selected.includes(opt.value) ? 'selected' : '';
            contentHTML += `
                <div class="data-multi-option ${isSelected}" onclick="toggleMulti('${question.id}', '${opt.value}', this)">
                    <div class="data-multi-checkbox"></div>
                    <span>${opt.label}</span>
                </div>
            `;
        });
        contentHTML += `</div>`;
    }

    card.innerHTML = contentHTML;
    card.style.animation = 'none';
    card.offsetHeight;
    card.style.animation = 'dataSlideIn 0.5s ease-out';

    document.getElementById('prevBtn').style.visibility = index === 0 ? 'hidden' : 'visible';
    document.getElementById('nextBtn').textContent = index === questions.length - 1 ? 'Analyser 🎯' : 'Suivant →';
}

function selectOption(questionId, value, element) {
    answers[questionId] = value;
    document.querySelectorAll('.data-option').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
}

function updateSlider(questionId, value) {
    answers[questionId] = parseInt(value);
}

function updateSliderDisplay(value, unit) {
    document.getElementById('sliderValue').innerHTML = 
        `${formatNumber(value)}<span class="data-slider__unit">${unit}</span>`;
}

function toggleMulti(questionId, value, element) {
    if (!answers[questionId]) answers[questionId] = [];
    const idx = answers[questionId].indexOf(value);
    if (idx > -1) {
        answers[questionId].splice(idx, 1);
        element.classList.remove('selected');
    } else {
        answers[questionId].push(value);
        element.classList.add('selected');
    }
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('progressLabel').textContent = `Question ${currentQuestion + 1} sur ${questions.length}`;
    document.getElementById('progressPercent').textContent = `${Math.round(progress)}%`;
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion(currentQuestion);
        updateProgress();
    } else {
        showLoading();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion(currentQuestion);
        updateProgress();
    }
}

function showLoading() {
    document.getElementById('questionContainer').style.display = 'none';
    document.getElementById('loadingContainer').style.display = 'block';
    
    const loadingTexts = [
        'Évaluation des patterns de données',
        'Analyse des contraintes de performance',
        'Calcul des coûts d\'infrastructure',
        'Génération des recommandations',
        'Finalisation de l\'architecture'
    ];
    
    let textIndex = 0;
    const textInterval = setInterval(() => {
        textIndex++;
        if (textIndex < loadingTexts.length) {
            document.getElementById('loadingSubtext').textContent = loadingTexts[textIndex];
        }
    }, 600);

    setTimeout(() => {
        clearInterval(textInterval);
        showResults();
    }, 3000);
}

function showResults() {
    document.getElementById('loadingContainer').style.display = 'none';
    document.getElementById('resultsContainer').style.display = 'block';
    generateResults();
}

function generateResults() {
    const arch = analyzeArchitecture();
    
    // Render architecture diagram
    const diagramHTML = `
        <div class="data-architecture__title">📐 ARCHITECTURE RECOMMANDÉE</div>
        <div class="data-architecture__content">
            <div class="data-layer-result">
                <span class="data-layer-result__label">Ingestion</span>
                <div class="data-layer-result__content">
                    ${arch.ingestion.map(t => `<div class="data-tech-badge primary"><span class="data-tech-badge__icon">${t.icon}</span>${t.name}</div>`).join('')}
                </div>
            </div>
            <div class="data-arrow-down">↓</div>
            <div class="data-layer-result">
                <span class="data-layer-result__label">Stockage</span>
                <div class="data-layer-result__content">
                    ${arch.storage.map(t => `<div class="data-tech-badge primary"><span class="data-tech-badge__icon">${t.icon}</span>${t.name}</div>`).join('')}
                </div>
            </div>
            <div class="data-arrow-down">↓</div>
            <div class="data-layer-result">
                <span class="data-layer-result__label">Processing</span>
                <div class="data-layer-result__content">
                    ${arch.processing.map(t => `<div class="data-tech-badge secondary"><span class="data-tech-badge__icon">${t.icon}</span>${t.name}</div>`).join('')}
                </div>
            </div>
            <div class="data-arrow-down">↓</div>
            <div class="data-layer-result">
                <span class="data-layer-result__label">Serving</span>
                <div class="data-layer-result__content">
                    ${arch.serving.map(t => `<div class="data-tech-badge secondary"><span class="data-tech-badge__icon">${t.icon}</span>${t.name}</div>`).join('')}
                </div>
            </div>
        </div>
    `;
    document.getElementById('architectureDiagram').innerHTML = diagramHTML;

    // Render recommendations
    const recsHTML = arch.recommendations.map(rec => `
        <div class="data-rec-card">
            <div class="data-rec-card__header">
                <div class="data-rec-card__icon ${rec.category}">${rec.icon}</div>
                <div>
                    <div class="data-rec-card__title">${rec.title}</div>
                    <div class="data-rec-card__category">${rec.categoryLabel}</div>
                </div>
            </div>
            <div class="data-rec-card__body">${rec.description}</div>
            <div class="data-rec-card__tools">
                ${rec.tools.map(t => `<span class="data-tool-tag">${t}</span>`).join('')}
            </div>
        </div>
    `).join('');
    document.getElementById('recommendations').innerHTML = recsHTML;

    // Render cost estimate
    const costHTML = `
        <div class="data-cost-card__header">
            <div class="data-cost-card__title">💰 Estimation des coûts mensuels</div>
            <div class="data-cost-card__range">${arch.cost.range}</div>
        </div>
        <div class="data-cost-breakdown">
            <div class="data-cost-item">
                <div class="data-cost-item__label">Stockage</div>
                <div class="data-cost-item__value">${arch.cost.storage}</div>
            </div>
            <div class="data-cost-item">
                <div class="data-cost-item__label">Compute</div>
                <div class="data-cost-item__value">${arch.cost.compute}</div>
            </div>
            <div class="data-cost-item">
                <div class="data-cost-item__label">Réseau</div>
                <div class="data-cost-item__value">${arch.cost.network}</div>
            </div>
            <div class="data-cost-item">
                <div class="data-cost-item__label">Licences</div>
                <div class="data-cost-item__value">${arch.cost.licenses}</div>
            </div>
        </div>
    `;
    document.getElementById('costCard').innerHTML = costHTML;
}

function analyzeArchitecture() {
    const cloud = answers.cloud_preference || 'aws';
    const dataType = answers.data_type || 'mixed';
    const readPattern = answers.read_pattern || 'olap';
    const volume = answers.data_volume || 100;
    const latency = answers.latency_requirement || 'standard';
    const useCases = answers.use_cases || [];
    const security = answers.security_level || 'medium';
    const budget = answers.budget || 5000;
    
    let arch = {
        ingestion: [],
        storage: [],
        processing: [],
        serving: [],
        recommendations: [],
        cost: {}
    };

    const cloudTools = {
        aws: {
            streaming: { icon: '🔥', name: 'Kinesis' },
            batch: { icon: '📦', name: 'AWS Glue' },
            lake: { icon: '🌊', name: 'S3 + Lake Formation' },
            warehouse: { icon: '🏢', name: 'Redshift' },
            nosql: { icon: '⚡', name: 'DynamoDB' },
            search: { icon: '🔍', name: 'OpenSearch' },
            compute: { icon: '⚙️', name: 'EMR / Spark' },
            serverless: { icon: 'λ', name: 'Lambda + Athena' },
            ml: { icon: '🧠', name: 'SageMaker' },
            bi: { icon: '📊', name: 'QuickSight' }
        },
        gcp: {
            streaming: { icon: '🔥', name: 'Pub/Sub + Dataflow' },
            batch: { icon: '📦', name: 'Cloud Dataproc' },
            lake: { icon: '🌊', name: 'Cloud Storage + Dataplex' },
            warehouse: { icon: '🏢', name: 'BigQuery' },
            nosql: { icon: '⚡', name: 'Firestore / Bigtable' },
            search: { icon: '🔍', name: 'Vertex AI Search' },
            compute: { icon: '⚙️', name: 'Dataproc Spark' },
            serverless: { icon: 'ƒ', name: 'Cloud Functions + BigQuery' },
            ml: { icon: '🧠', name: 'Vertex AI' },
            bi: { icon: '📊', name: 'Looker' }
        },
        azure: {
            streaming: { icon: '🔥', name: 'Event Hubs + Stream Analytics' },
            batch: { icon: '📦', name: 'Data Factory' },
            lake: { icon: '🌊', name: 'ADLS Gen2 + Fabric' },
            warehouse: { icon: '🏢', name: 'Synapse Analytics' },
            nosql: { icon: '⚡', name: 'Cosmos DB' },
            search: { icon: '🔍', name: 'Cognitive Search' },
            compute: { icon: '⚙️', name: 'Databricks / HDInsight' },
            serverless: { icon: 'ƒ', name: 'Functions + Synapse Serverless' },
            ml: { icon: '🧠', name: 'Azure ML' },
            bi: { icon: '📊', name: 'Power BI' }
        },
        multi: {
            streaming: { icon: '🔥', name: 'Apache Kafka' },
            batch: { icon: '📦', name: 'Apache Airflow' },
            lake: { icon: '🌊', name: 'Delta Lake / Iceberg' },
            warehouse: { icon: '🏢', name: 'Snowflake' },
            nosql: { icon: '⚡', name: 'MongoDB Atlas' },
            search: { icon: '🔍', name: 'Elasticsearch' },
            compute: { icon: '⚙️', name: 'Databricks' },
            serverless: { icon: '⚡', name: 'dbt Cloud + Snowflake' },
            ml: { icon: '🧠', name: 'MLflow + Databricks' },
            bi: { icon: '📊', name: 'Tableau / Metabase' }
        },
        onprem: {
            streaming: { icon: '🔥', name: 'Apache Kafka' },
            batch: { icon: '📦', name: 'Apache Airflow' },
            lake: { icon: '🌊', name: 'MinIO + Delta Lake' },
            warehouse: { icon: '🏢', name: 'ClickHouse / Trino' },
            nosql: { icon: '⚡', name: 'MongoDB / Cassandra' },
            search: { icon: '🔍', name: 'Elasticsearch' },
            compute: { icon: '⚙️', name: 'Apache Spark' },
            serverless: { icon: '📊', name: 'Trino + dbt' },
            ml: { icon: '🧠', name: 'Kubeflow' },
            bi: { icon: '📊', name: 'Superset / Metabase' }
        }
    };

    const tools = cloudTools[cloud] || cloudTools.aws;

    // Ingestion layer
    if (latency === 'realtime' || readPattern === 'realtime' || useCases.includes('iot')) {
        arch.ingestion.push(tools.streaming);
    }
    if (readPattern === 'batch' || useCases.includes('etl')) {
        arch.ingestion.push(tools.batch);
    }
    if (arch.ingestion.length === 0) {
        arch.ingestion.push(tools.batch);
    }

    // Storage layer
    arch.storage.push(tools.lake);
    if (dataType === 'structured' || readPattern === 'olap' || useCases.includes('reporting')) {
        arch.storage.push(tools.warehouse);
    }
    if (dataType === 'semi_structured' || latency === 'realtime' || useCases.includes('api')) {
        arch.storage.push(tools.nosql);
    }
    if (useCases.includes('search') || useCases.includes('logs')) {
        arch.storage.push(tools.search);
    }

    // Processing layer
    if (volume > 100 || readPattern === 'olap') {
        arch.processing.push(tools.compute);
    } else {
        arch.processing.push(tools.serverless);
    }
    if (useCases.includes('ml')) {
        arch.processing.push(tools.ml);
    }

    // Serving layer
    if (useCases.includes('reporting')) {
        arch.serving.push(tools.bi);
    }
    if (useCases.includes('api')) {
        arch.serving.push({ icon: '🔌', name: 'REST/GraphQL APIs' });
    }
    if (arch.serving.length === 0) {
        arch.serving.push(tools.bi);
    }

    // Recommendations
    arch.recommendations = [
        {
            icon: '💾',
            category: 'storage',
            categoryLabel: 'Stockage',
            title: getStorageRecommendation(dataType, volume, readPattern).title,
            description: getStorageRecommendation(dataType, volume, readPattern).desc,
            tools: getStorageRecommendation(dataType, volume, readPattern).tools
        },
        {
            icon: '⚙️',
            category: 'processing',
            categoryLabel: 'Traitement',
            title: getProcessingRecommendation(readPattern, latency, volume).title,
            description: getProcessingRecommendation(readPattern, latency, volume).desc,
            tools: getProcessingRecommendation(readPattern, latency, volume).tools
        },
        {
            icon: '🔄',
            category: 'orchestration',
            categoryLabel: 'Orchestration',
            title: 'Pipeline d\'orchestration moderne',
            description: 'Un orchestrateur robuste est essentiel pour coordonner vos flux de données, gérer les dépendances et assurer la fiabilité de vos pipelines.',
            tools: cloud === 'gcp' ? ['Cloud Composer', 'Dataform'] : cloud === 'azure' ? ['Data Factory', 'Synapse Pipelines'] : ['Airflow', 'Dagster', 'Prefect']
        },
        {
            icon: '🛡️',
            category: 'security',
            categoryLabel: 'Sécurité',
            title: getSecurityRecommendation(security).title,
            description: getSecurityRecommendation(security).desc,
            tools: getSecurityRecommendation(security).tools
        },
        {
            icon: '📈',
            category: 'monitoring',
            categoryLabel: 'Observabilité',
            title: 'Stack de monitoring data',
            description: 'Surveillez la qualité des données, les performances des pipelines et les anomalies pour garantir la fiabilité de votre plateforme.',
            tools: ['Monte Carlo', 'Great Expectations', 'Datadog', 'OpenTelemetry']
        }
    ];

    // Cost estimation
    const baseCost = Math.max(budget * 0.7, 500);
    const storageCost = Math.round(volume * 23);
    const computeCost = Math.round(baseCost * 0.4);
    const networkCost = Math.round(baseCost * 0.15);
    const licenseCost = Math.round(baseCost * 0.2);

    arch.cost = {
        range: `${formatNumber(Math.round(baseCost * 0.8))}€ - ${formatNumber(Math.round(baseCost * 1.3))}€`,
        storage: `~${formatNumber(storageCost)}€`,
        compute: `~${formatNumber(computeCost)}€`,
        network: `~${formatNumber(networkCost)}€`,
        licenses: `~${formatNumber(licenseCost)}€`
    };

    return arch;
}

function getStorageRecommendation(dataType, volume, readPattern) {
    if (dataType === 'structured' && readPattern === 'olap') {
        return {
            title: 'Architecture Data Warehouse moderne',
            desc: 'Pour vos données structurées avec des besoins analytiques, un Data Warehouse cloud-native offre les meilleures performances de requêtes avec un scaling automatique.',
            tools: ['Snowflake', 'BigQuery', 'Redshift', 'Databricks SQL']
        };
    } else if (volume > 500) {
        return {
            title: 'Data Lakehouse à grande échelle',
            desc: 'Avec votre volume de données, une architecture Lakehouse combine la flexibilité du Data Lake avec les performances ACID du warehouse.',
            tools: ['Delta Lake', 'Apache Iceberg', 'Apache Hudi', 'Databricks']
        };
    } else {
        return {
            title: 'Architecture Data Lake + Warehouse hybride',
            desc: 'Une approche hybride vous permet de stocker toutes vos données brutes dans un lac tout en servant les cas d\'usage analytiques via un warehouse.',
            tools: ['S3/GCS/ADLS', 'dbt', 'Snowflake/BigQuery', 'Trino']
        };
    }
}

function getProcessingRecommendation(readPattern, latency, volume) {
    if (readPattern === 'realtime' || latency === 'realtime') {
        return {
            title: 'Pipeline streaming temps réel',
            desc: 'Vos exigences de latence nécessitent une architecture streaming avec traitement en continu pour des insights instantanés.',
            tools: ['Apache Kafka', 'Apache Flink', 'Spark Streaming', 'Materialize']
        };
    } else if (volume > 200) {
        return {
            title: 'Traitement distribué à grande échelle',
            desc: 'Votre volume de données justifie un moteur de traitement distribué capable de paralléliser les transformations sur un cluster.',
            tools: ['Apache Spark', 'Databricks', 'Trino', 'Presto']
        };
    } else {
        return {
            title: 'Transformation moderne avec dbt',
            desc: 'Pour votre volume, une approche ELT moderne avec dbt offre le meilleur rapport simplicité/puissance avec du SQL versionné.',
            tools: ['dbt Core/Cloud', 'SQLMesh', 'Dataform']
        };
    }
}

function getSecurityRecommendation(security) {
    if (security === 'critical') {
        return {
            title: 'Conformité réglementaire complète',
            desc: 'Vos exigences de conformité nécessitent un framework de gouvernance complet avec encryption, audit, masquage et contrôle d\'accès granulaire.',
            tools: ['Privacera', 'Immuta', 'Collibra', 'Alation', 'HashiCorp Vault']
        };
    } else if (security === 'high') {
        return {
            title: 'Sécurité renforcée et gouvernance',
            desc: 'Implémentez un contrôle d\'accès basé sur les rôles, le masquage des PII et un catalogue de données pour la traçabilité.',
            tools: ['Unity Catalog', 'AWS Lake Formation', 'Azure Purview', 'Atlan']
        };
    } else {
        return {
            title: 'Bonnes pratiques de sécurité',
            desc: 'Même sans contraintes fortes, adoptez les fondamentaux : IAM, encryption at rest/transit, et audit des accès.',
            tools: ['IAM Policies', 'KMS', 'CloudTrail/Audit Logs', 'Terraform']
        };
    }
}

// Export PDF using html2pdf.js
function exportResults() {
    const element = document.getElementById('resultsContainer');
    const date = new Date().toLocaleDateString('fr-FR');
    
    const opt = {
        margin: [10, 10, 10, 10],
        filename: `diagnostic-data-architecture-${date.replace(/\//g, '-')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#0a0a0f'
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait' 
        },
        pagebreak: { mode: 'avoid-all' }
    };

    // Create a clone for PDF
    const clone = element.cloneNode(true);
    clone.style.background = '#0a0a0f';
    clone.style.padding = '20px';
    clone.style.color = '#f0f0f5';
    clone.style.maxWidth = '800px';
    
    // Remove action buttons from clone
    const actionBtns = clone.querySelector('.data-action-buttons');
    if (actionBtns) actionBtns.remove();
    
    // Add header to clone
    const header = document.createElement('div');
    header.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #00d4ff;">
            <h1 style="font-size: 28px; color: #00d4ff; margin-bottom: 10px;">⚡ DataArchitecturer</h1>
            <p style="color: #8888a0; font-size: 14px;">Diagnostic d'Architecture Data - Généré le ${date}</p>
        </div>
    `;
    clone.insertBefore(header, clone.firstChild);
    
    // Add answers summary
    const summaryHTML = generateAnswersSummary();
    const summary = document.createElement('div');
    summary.innerHTML = summaryHTML;
    clone.insertBefore(summary, clone.children[1]);
    
    // Temporarily add clone to document
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    document.body.appendChild(clone);
    
    html2pdf().set(opt).from(clone).save().then(() => {
        document.body.removeChild(clone);
    }).catch(err => {
        console.error('PDF export error:', err);
        document.body.removeChild(clone);
        alert('Erreur lors de l\'export PDF. Veuillez réessayer.');
    });
}

function generateAnswersSummary() {
    const labels = {
        data_type: { label: 'Type de données', values: { structured: 'Structurées', semi_structured: 'Semi-structurées', unstructured: 'Non-structurées', mixed: 'Mixte' } },
        data_volume: { label: 'Volume de données', unit: ' TB' },
        growth_rate: { label: 'Croissance', values: { stable: 'Stable', moderate: 'Modérée', rapid: 'Rapide', explosive: 'Explosive' } },
        read_pattern: { label: 'Pattern de lecture', values: { oltp: 'OLTP', olap: 'OLAP', realtime: 'Temps réel', batch: 'Batch' } },
        write_frequency: { label: 'Fréquence d\'écriture', values: { continuous: 'Continue', frequent: 'Fréquente', periodic: 'Périodique', rare: 'Rare' } },
        latency_requirement: { label: 'Latence requise', values: { realtime: 'Temps réel', interactive: 'Interactive', standard: 'Standard', flexible: 'Flexible' } },
        use_cases: { label: 'Cas d\'usage', isArray: true },
        security_level: { label: 'Niveau de sécurité', values: { basic: 'Standard', medium: 'Renforcé', high: 'Élevé', critical: 'Critique' } },
        team_size: { label: 'Taille de l\'équipe', values: { small: 'Petite', medium: 'Moyenne', large: 'Grande', enterprise: 'Enterprise' } },
        cloud_preference: { label: 'Cloud', values: { aws: 'AWS', gcp: 'GCP', azure: 'Azure', multi: 'Multi-cloud', onprem: 'On-premise' } },
        budget: { label: 'Budget', unit: '€/mois' },
        timeline: { label: 'Timeline', values: { urgent: 'Urgent', short: 'Court terme', medium: 'Moyen terme', long: 'Long terme' } }
    };
    
    let html = `
        <div style="background: #12121a; border: 1px solid #2a2a3a; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
            <h3 style="color: #00d4ff; margin-bottom: 15px; font-size: 16px;">📋 Récapitulatif de vos réponses</h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; font-size: 12px;">
    `;
    
    for (const [key, config] of Object.entries(labels)) {
        const value = answers[key];
        if (value !== undefined) {
            let displayValue = value;
            if (config.values) {
                displayValue = config.values[value] || value;
            } else if (config.unit) {
                displayValue = formatNumber(value) + config.unit;
            } else if (config.isArray && Array.isArray(value)) {
                displayValue = value.join(', ');
            }
            html += `
                <div style="padding: 8px; background: #1a1a25; border-radius: 6px;">
                    <span style="color: #8888a0;">${config.label}:</span>
                    <span style="color: #f0f0f5; margin-left: 5px;">${displayValue}</span>
                </div>
            `;
        }
    }
    
    html += `</div></div>`;
    return html;
}

function restart() {
    currentQuestion = 0;
    answers = {};
    document.getElementById('resultsContainer').style.display = 'none';
    document.getElementById('questionContainer').style.display = 'block';
    renderQuestion(0);
    updateProgress();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
