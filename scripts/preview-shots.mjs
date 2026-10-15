import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const EXECUTABLE = "/snap/bin/chromium";
const URL = "http://localhost:4321/";
const OUT = "/home/shiva/projects/exist.iosite/.preview";

mkdirSync(OUT, { recursive: true });

const shots = [
  { name: "01-hero-dark.png", scroll: 0, theme: "dark" },
  { name: "02-hero-light.png", scroll: 0, theme: "light" },
  { name: "03-wall-bands-dark.png", scroll: 1150, theme: "dark" },
  { name: "04-bands-dark.png", scroll: 1900, theme: "dark" },
  { name: "05-agents-dark.png", scroll: 3300, theme: "dark" },
  { name: "06-architecture-dark.png", scroll: 4100, theme: "dark" },
  { name: "07-quickstart-footer-dark.png", scroll: 5444, theme: "dark" },
  { name: "08-mobile-top-dark.png", scroll: 0, theme: "dark", width: 375, height: 812 },
];

const browser = await chromium.launch({
  executablePath: EXECUTABLE,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

for (const shot of shots) {
  const width = shot.width ?? 1280;
  const height = shot.height ?? 900;
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
  });
  await context.addInitScript(
    ([theme]) => localStorage.setItem("exist-theme", theme),
    [shot.theme],
  );
  const page = await context.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  await page.evaluate((y) => window.scrollTo(0, y), shot.scroll);
  await page.waitForTimeout(250);
  await page.screenshot({ path: `${OUT}/${shot.name}` });
  console.log(`${shot.name} @${shot.scroll} ${width}x${height}`);
  await context.close();
}

await browser.close();
console.log("saved to", OUT);
