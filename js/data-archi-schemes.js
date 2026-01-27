document.addEventListener('DOMContentLoaded', function () {
    // Mapping between data-scheme IDs and their respective .mermaid files
    const schemeFiles = {
        'ingestion': 'assets/mermaid/decision-1-ingestion.mermaid',
        'storage': 'assets/mermaid/decision-2-storage.mermaid',
        'processing': 'assets/mermaid/decision-3-processing.mermaid',
        'serving': 'assets/mermaid/decision-4-serving.mermaid',
        'recommendations': 'assets/mermaid/decision-5-recommendations.mermaid',
        'costs': 'assets/mermaid/decision-6-costs.mermaid',
        'cloudmapping': 'assets/mermaid/decision-7-cloud-mapping.mermaid'
    };

    // Cache for loaded mermaid content
    const loadedContent = {};

    // Initialize Mermaid with dark theme and startOnLoad: false
    mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        themeVariables: {
            darkMode: true,
            background: '#1a1a25',
            primaryColor: '#00d4ff',
            primaryTextColor: '#f0f0f5',
            primaryBorderColor: '#00d4ff',
            lineColor: '#8888a0',
            secondaryColor: '#a855f7',
            tertiaryColor: '#12121a',
            noteTextColor: '#f0f0f5',
            noteBkgColor: '#1a1a25',
            noteBorderColor: '#2a2a3a',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px'
        },
        flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
            curve: 'basis',
            padding: 15
        },
        securityLevel: 'loose'
    });

    /**
     * Loads and renders a mermaid diagram for a specific scheme
     * @param {string} scheme - The scheme ID (e.g., 'ingestion')
     * @param {HTMLElement} container - The container div for the scheme
     */
    async function loadAndRenderScheme(scheme, container) {
        const mermaidDiv = container.querySelector('.mermaid');
        if (!mermaidDiv) return;

        // If already processed, don't do it again
        if (mermaidDiv.hasAttribute('data-processed')) return;

        try {
            // Show loading state if needed (optional)

            // Fetch content if not in cache
            if (!loadedContent[scheme]) {
                const response = await fetch(schemeFiles[scheme]);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                loadedContent[scheme] = await response.text();
            }

            // Inject content
            mermaidDiv.textContent = loadedContent[scheme];

            // Render using mermaid.run
            await mermaid.run({
                nodes: [mermaidDiv]
            });

        } catch (error) {
            console.error(`Error loading/rendering mermaid for ${scheme}:`, error);
            mermaidDiv.innerHTML = `<div class="data-error">❌ Erreur de chargement du schéma : ${error.message}</div>`;
        }
    }


    // Tab navigation
    const tabs = document.querySelectorAll('.data-tab');
    const containers = document.querySelectorAll('.scheme-container');
    const downloadBtn = document.getElementById('downloadSchemeBtn');

    function updateDownloadLink(scheme) {
        if (downloadBtn && schemeFiles[scheme]) {
            downloadBtn.href = schemeFiles[scheme];
            // Optional: Update filename for download attribute
            const filename = schemeFiles[scheme].split('/').pop();
            downloadBtn.setAttribute('download', filename);
        }
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', async function () {
            const targetScheme = this.getAttribute('data-scheme');

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Update download button
            updateDownloadLink(targetScheme);

            // Show target container, hide others
            for (const container of containers) {
                if (container.id === `scheme-${targetScheme}`) {
                    container.style.display = 'block';
                    // Load and render if visible
                    await loadAndRenderScheme(targetScheme, container);
                } else {
                    container.style.display = 'none';
                }
            }
        });
    });

    // Initialize first visible diagram
    const activeTab = document.querySelector('.data-tab.active');
    if (activeTab) {
        const initialScheme = activeTab.getAttribute('data-scheme');
        const initialContainer = document.getElementById(`scheme-${initialScheme}`);

        // Init download link
        updateDownloadLink(initialScheme);

        if (initialContainer) {
            loadAndRenderScheme(initialScheme, initialContainer);
        }
    }
});
