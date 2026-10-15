import { chromium } from "playwright-core";

const browser = await chromium.launch({
  executablePath: "/snap/bin/chromium",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const context = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  permissions: ["clipboard-read", "clipboard-write"],
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
await page.goto("http://localhost:4321/", { waitUntil: "networkidle" });

const results = {};

// 1. dropdown opens on click
const trigger = page.locator("[data-dropdown-trigger]").first();
await trigger.click();
await page.waitForTimeout(150);
results.openOnClick = await page.evaluate(() => {
  const p = document.querySelector("[data-dropdown-panel]");
  return { visible: !p.hidden && getComputedStyle(p).display === "block" && p.getBoundingClientRect().height > 0, height: p.getBoundingClientRect().height };
});

// 2. opening second closes first
await page.locator("[data-dropdown-trigger]").nth(1).click();
await page.waitForTimeout(150);
results.oneAtATime = await page.evaluate(() => {
  const panels = [...document.querySelectorAll("[data-dropdown-panel]")];
  return panels.map((p) => !p.hidden);
});

// 3. Escape closes
await page.keyboard.press("Escape");
await page.waitForTimeout(100);
results.escapeCloses = await page.evaluate(() =>
  [...document.querySelectorAll("[data-dropdown-panel]")].every((p) => p.hidden),
);

// 4. reopen + outside click closes
await trigger.click();
await page.waitForTimeout(100);
await page.mouse.click(640, 700);
await page.waitForTimeout(100);
results.outsideClickCloses = await page.evaluate(() =>
  [...document.querySelectorAll("[data-dropdown-panel]")].every((p) => p.hidden),
);

// 5. tabs: arrow key switches
await page.locator('[data-tab][aria-selected="true"]').focus();
await page.keyboard.press("ArrowRight");
await page.waitForTimeout(150);
results.tabArrowKey = await page.evaluate(() => {
  const sel = document.querySelector('[data-tab][aria-selected="true"]');
  const visible = [...document.querySelectorAll("[data-panel]")].filter((p) => !p.hidden).length;
  return { selectedLabel: sel?.textContent, visiblePanels: visible };
});

// 6. theme toggle
await page.click("[data-theme-toggle]");
await page.waitForTimeout(150);
results.themeToggle = await page.evaluate(() => ({
  theme: document.documentElement.getAttribute("data-theme"),
  stored: localStorage.getItem("exist-theme"),
  label: document.querySelector("[data-theme-toggle]").textContent,
}));

// 7. copy button
await page.click('[data-copy]');
await page.waitForTimeout(300);
results.copy = await page.evaluate(() => ({
  label: document.querySelector("[data-copy]").textContent,
  status: document.querySelector("#copy-status").textContent,
  clipboard: navigator.clipboard ? "available" : "missing",
}));

// screenshot of open dropdown
await page.click("[data-theme-toggle]"); // back to dark
await page.evaluate(() => localStorage.setItem("exist-theme", "dark"));
await page.reload({ waitUntil: "networkidle" });
await page.locator("[data-dropdown-trigger]").first().click();
await page.waitForTimeout(300);
await page.screenshot({ path: "/home/shiva/projects/exist.iosite/.preview/09-dropdown-open.png" });

console.log(JSON.stringify(results, null, 2));
console.log("js errors:", errors.length ? errors : "none");
await browser.close();
