// Simple Loading Page Logic (now using loader.js module)
(function () {
  const loader = document.getElementById('loader');
  const app = document.getElementById('app');
  const reloadBtn = document.getElementById('reloadBtn');

  // Dynamically import module to keep global scope clean
  function start() {
    import('./loader.js')
      .then(mod => {
        const run = () => mod.simulateLoad({ loaderEl: loader, appEl: app, duration: 1500 }).then(() => app.focus());
        run();
        reloadBtn?.addEventListener('click', () => mod.simulateLoad({ loaderEl: loader, appEl: app, duration: 1200 }));
      })
      .catch(err => console.error('Failed to load loader module', err));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
