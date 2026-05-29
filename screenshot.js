import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

async function takeScreenshot() {
  const url = process.argv[2] || 'http://localhost:3000';
  const selector = process.argv[3]; // Bijv: '#hero' of 'section'
  const folder = './temporary screenshots';

  if (!fs.existsSync(folder)) fs.mkdirSync(folder);

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 }); // Desktop standaard
  
  // Stel localStorage in vóór navigatie zodat de taalkeuze-modal niet toont
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('miss-chill-lang', 'nl');
  });

  await page.goto(url, { waitUntil: 'networkidle0' });

  // Scroll door de pagina om IntersectionObserver-reveals te triggeren
  await page.evaluate(async () => {
    const total = document.body.scrollHeight;
    for (let y = 0; y < total; y += 300) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 80));
    }
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 500));
  });

  const count = fs.readdirSync(folder).length + 1;
  const label = selector ? selector.replace(/[^a-z0-9]/gi, '_') : 'fullpage';
  const filePath = path.join(folder, `screenshot-${count}-${label}.png`);

  if (selector) {
    // Maak een screenshot van alleen de gevraagde sectie
    const element = await page.$(selector);
    if (element) {
      await element.screenshot({ path: filePath });
      console.log(`Sectie-screenshot (${selector}) opgeslagen: ${filePath}`);
    } else {
      console.log(`Waarschuwing: Sectie ${selector} niet gevonden. Full page screenshot gemaakt.`);
      await page.screenshot({ path: filePath, fullPage: true });
    }
  } else {
    await page.screenshot({ path: filePath, fullPage: true });
    console.log(`Full page screenshot opgeslagen: ${filePath}`);
  }

  await browser.close();
}

takeScreenshot();