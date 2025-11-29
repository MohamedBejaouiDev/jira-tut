const http = require('http');
const { spawn } = require('child_process');
const puppeteer = require('puppeteer');

async function waitForServer(url, timeoutMs = 10000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    (function check() {
      http.get(url, res => {
        res.resume();
        resolve();
      }).on('error', () => {
        if (Date.now() - start > timeoutMs) reject(new Error('Server did not start'));
        else setTimeout(check, 250);
      });
    })();
  });
}

async function run() {
  const port = process.env.PORT || 8080;
  const url = `http://localhost:${port}/test.html`;

  const server = spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['http-server', '-p', String(port), '-c-1'], {
    stdio: 'inherit'
  });

  try {
    await waitForServer(`http://localhost:${port}/`);
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });

    // Wait until mocha signals completion
    await page.waitForFunction(() => window.__testsDone === true, { timeout: 30000 });
    const { failures, passes, tests } = await page.evaluate(() => ({
      failures: window.__failures || 0,
      passes: window.__passes || 0,
      tests: window.__tests || 0,
    }));

    console.log(`Mocha results: tests=${tests}, passes=${passes}, failures=${failures}`);
    await browser.close();

    if (failures > 0 || tests === 0) {
      console.error('Unit tests failed or no tests executed.');
      process.exit(1);
    }
    console.log('All tests passed.');
  } catch (err) {
    console.error('Error running headless tests:', err);
    process.exit(1);
  } finally {
    server.kill();
  }
}

run();
