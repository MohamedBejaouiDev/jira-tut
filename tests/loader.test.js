import { simulateLoad, showLoader, hideLoader } from '../loader.js';

const { expect } = chai;

describe('loader.js', () => {
  let loaderEl, appEl;

  beforeEach(() => {
    loaderEl = document.getElementById('loader');
    appEl = document.getElementById('app');
    // Reset state
    loaderEl.classList.add('hidden');
    appEl.classList.remove('hidden');
  });

  it('showLoader adds hidden to app and removes from loader', () => {
    showLoader({ loaderEl, appEl });
    expect(loaderEl.classList.contains('hidden')).to.be.false;
    expect(appEl.classList.contains('hidden')).to.be.true;
  });

  it('hideLoader hides loader and shows app', () => {
    showLoader({ loaderEl, appEl });
    hideLoader({ loaderEl, appEl });
    expect(loaderEl.classList.contains('hidden')).to.be.true;
    expect(appEl.classList.contains('hidden')).to.be.false;
  });

  it('simulateLoad returns a promise resolving after duration', async () => {
    const start = performance.now();
    const result = await simulateLoad({ loaderEl, appEl, duration: 200 });
    const elapsed = performance.now() - start;
    expect(result.visible).to.equal(appEl);
    expect(result.hidden).to.equal(loaderEl);
    expect(loaderEl.classList.contains('hidden')).to.be.true;
    expect(appEl.classList.contains('hidden')).to.be.false;
    expect(elapsed).to.be.at.least(190); // allow small timing variance
  });

  it('simulateLoad throws if elements missing', async () => {
    let error;
    try { simulateLoad({ loaderEl: null, appEl }); } catch (e) { error = e; }
    expect(error).to.exist;
  });
});
