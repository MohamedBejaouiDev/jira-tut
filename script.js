// Simple Loading Page Logic
(function () {
  const loader = document.getElementById('loader');
  const app = document.getElementById('app');
  const reloadBtn = document.getElementById('reloadBtn');

  // Simulate initial loading (e.g., fetching data)
  function simulateLoad(ms = 1500) {
    loader.classList.remove('hidden');
    app.classList.add('hidden');

    // Keep focus accessible on loader
    loader.setAttribute('aria-busy', 'true');

    setTimeout(() => {
      loader.classList.add('hidden');
      app.classList.remove('hidden');
      loader.setAttribute('aria-busy', 'false');
      app.focus();
    }, ms);
  }

  // Start once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => simulateLoad());
  } else {
    simulateLoad();
  }

  // Button to show loader again
  reloadBtn?.addEventListener('click', () => simulateLoad(1200));
})();
