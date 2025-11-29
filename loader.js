// Loader module extracted for testability
// Exports simulateLoad returning a Promise resolving when content is shown.

export function simulateLoad({ loaderEl, appEl, duration = 1500 }) {
  if (!loaderEl || !appEl) throw new Error('Missing required elements');
  loaderEl.classList.remove('hidden');
  appEl.classList.add('hidden');
  loaderEl.setAttribute('aria-busy', 'true');

  return new Promise(resolve => {
    setTimeout(() => {
      loaderEl.classList.add('hidden');
      appEl.classList.remove('hidden');
      loaderEl.setAttribute('aria-busy', 'false');
      resolve({ visible: appEl, hidden: loaderEl });
    }, duration);
  });
}

export function showLoader({ loaderEl, appEl }) {
  if (!loaderEl || !appEl) throw new Error('Missing required elements');
  loaderEl.classList.remove('hidden');
  appEl.classList.add('hidden');
}

export function hideLoader({ loaderEl, appEl }) {
  if (!loaderEl || !appEl) throw new Error('Missing required elements');
  loaderEl.classList.add('hidden');
  appEl.classList.remove('hidden');
}
