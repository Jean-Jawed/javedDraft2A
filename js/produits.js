// ===================================
// ONGLETS SOLUTIONS
// ===================================

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.solutions-tabs__btn');
  const panels = document.querySelectorAll('.solutions-panel');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;

      // Mise à jour des boutons
      buttons.forEach(b => {
        b.classList.remove('solutions-tabs__btn--active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('solutions-tabs__btn--active');
      btn.setAttribute('aria-selected', 'true');

      // Mise à jour des panneaux
      panels.forEach(panel => {
        if (panel.id === `panel-${targetTab}`) {
          panel.removeAttribute('hidden');
          panel.classList.add('solutions-panel--active');
        } else {
          panel.setAttribute('hidden', '');
          panel.classList.remove('solutions-panel--active');
        }
      });
    });
  });
});
