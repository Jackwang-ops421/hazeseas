const { chromium } = require("playwright-core");
const path = require("path");

const CHROME_PATH = "D:/02_soft/chrome-win64/chrome.exe";
const OUT_DIR = path.join(__dirname, "screenshots");

const sites = [
  { name: "hazeseashub-desktop", url: "http://localhost:3000/", width: 1440, height: 900 },
  { name: "hazeseashub-mobile", url: "http://localhost:3000/", width: 390, height: 844 },
  { name: "hidefromthevillain-desktop", url: "https://www.hidefromthevillain.wiki/", width: 1440, height: 900 },
  { name: "hidefromthevillain-mobile", url: "https://www.hidefromthevillain.wiki/", width: 390, height: 844 },
];

(async () => {
  const fs = require("fs");
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ executablePath: CHROME_PATH, headless: true });

  for (const site of sites) {
    const context = await browser.newContext({
      viewport: { width: site.width, height: site.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    try {
      await page.goto(site.url, { waitUntil: "networkidle", timeout: 60000 });
      await page.waitForTimeout(3000);

      const fullPage = site.width === 390;
      const outPath = path.join(OUT_DIR, `${site.name}.png`);
      await page.screenshot({ path: outPath, fullPage });
      console.log(`✓ Saved ${outPath}`);
    } catch (err) {
      console.error(`✗ Failed ${site.name}: ${err.message}`);
    } finally {
      await context.close();
    }
  }

  await browser.close();
})();
