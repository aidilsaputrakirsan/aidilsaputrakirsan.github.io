// Captures each live Myst app's landing page into public/images/landing/<id>.jpg
// and points `screenshot` in src/data/products.js at it — the hub cards then
// show the real landing page as their background.
//
//   npm run screenshots              # every live app with a url
//   npm run screenshots -- asdos-ai  # only the ids you list
//
// Uses the Chrome (or Edge) already installed on your computer — nothing to
// download. Re-run whenever a landing page changes, then commit the images.
import { chromium } from 'playwright-core';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { productsData } from '../src/data/products.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public/images/landing');
const dataFile = join(root, 'src/data/products.js');
const only = process.argv.slice(2);

const targets = productsData.filter((p) => p.url && (only.length ? only.includes(p.id) : p.status === 'live'));
if (!targets.length) {
  console.log('Nothing to capture.');
  process.exit(0);
}

async function launch() {
  for (const channel of ['chrome', 'msedge']) {
    try {
      return await chromium.launch({ channel });
    } catch {
      /* try the next browser */
    }
  }
  if (process.env.CHROME_PATH) return chromium.launch({ executablePath: process.env.CHROME_PATH });
  throw new Error('Chrome/Edge not found. Install Chrome, or set CHROME_PATH to its executable.');
}

mkdirSync(outDir, { recursive: true });
const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });
let source = readFileSync(dataFile, 'utf8');

for (const p of targets) {
  const file = `${p.id}.jpg`;
  process.stdout.write(`• ${p.title} (${p.url}) … `);
  try {
    await page.goto(p.url, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(1500); // let entrance animations settle
    // Tall capture (max 2 screens) so the card can "scroll" it on hover
    const height = await page.evaluate(() => Math.min(document.documentElement.scrollHeight, 1600));
    await page.setViewportSize({ width: 1280, height });
    await page.waitForTimeout(400);
    await page.screenshot({ path: join(outDir, file), type: 'jpeg', quality: 78 });
    await page.setViewportSize({ width: 1280, height: 800 });

    // Point products.js at the new image (only this product's `screenshot:` line)
    const at = source.indexOf(`id: '${p.id}'`);
    const field = source.indexOf('screenshot:', at);
    const end = source.indexOf('\n', field);
    if (at !== -1 && field !== -1) {
      source = `${source.slice(0, field)}screenshot: '/images/landing/${file}',${source.slice(end)}`;
    }
    console.log('ok');
  } catch (e) {
    console.log(`failed — ${e.message.split('\n')[0]}`);
  }
}

writeFileSync(dataFile, source);
await browser.close();
console.log('\nDone. Check public/images/landing/ and src/data/products.js, then run `npm run dev`.');
