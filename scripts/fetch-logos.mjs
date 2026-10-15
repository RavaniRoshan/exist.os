// Downloads official brand marks for the compatibility wall and converts them
// to monochrome (currentColor) so they theme with the site.
//
// Sources:
//   Simple Icons (CC0-1.0) — github.com/simple-icons/simple-icons
//   GnuPG logo — Wikimedia Commons (File:GnuPG-Logo.svg)
//
// Run: node scripts/fetch-logos.mjs   (idempotent)

import { mkdirSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const OUT = new URL("../src/assets/logos/", import.meta.url);
mkdirSync(OUT, { recursive: true });

const ICONS = [
  ["git", "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/git.svg"],
  ["gitlfs", "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/gitlfs.svg"],
  ["sqlite", "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/sqlite.svg"],
  ["openid", "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/openid.svg"],
  ["modelcontextprotocol", "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/modelcontextprotocol.svg"],
  ["terraform", "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/terraform.svg"],
  ["helm", "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/helm.svg"],
  ["kubernetes", "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/kubernetes.svg"],
  ["prometheus", "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/prometheus.svg"],
  ["gnupg", "https://commons.wikimedia.org/wiki/Special:FilePath/GnuPG-Logo.svg"],
];

function monochrome(svg) {
  // white/black-ish fills are knockouts -> canvas color; everything else -> currentColor
  const toColor = (hex) => {
    const h = hex.replace("#", "").toLowerCase();
    const isWhite = /^f{3}$|^f{4}$|^f{6}$|^f{8}$/.test(h);
    return isWhite ? "var(--canvas)" : "currentColor";
  };
  let out = svg
    // fill/stroke hex colors (attribute form)
    .replace(/(fill|stroke)="#([0-9a-fA-F]{3,8})"/g, (_m, attr, hex) => `${attr}="${toColor(hex)}"`)
    .replace(/(fill|stroke)='#([0-9a-fA-F]{3,8})'/g, (_m, attr, hex) => `${attr}='${toColor(hex)}'`)
    // fill/stroke hex colors (inline style form, e.g. Inkscape output)
    .replace(/(fill|stroke)\s*:\s*#([0-9a-fA-F]{3,8})/g, (_m, prop, hex) => `${prop}:${toColor(hex)}`)
    // CSS custom props / classes that may inject color
    .replace(/<(style|defs)[\s\S]*?<\/\1>/g, "");
  // root fill="currentColor" so children without their own fill inherit theme color
  out = out.replace(/<svg([^>]*)>/, (_m, attrs) => {
    const cleaned = attrs.replace(/\s*fill="[^"]*"/, "").replace(/\s*fill='[^']*'/, "");
    return `<svg${cleaned} fill="currentColor">`;
  });
  return out;
}

for (const [slug, url] of ICONS) {
  const file = new URL(`${slug}.svg`, OUT);
  let svg = null;
  for (let attempt = 1; attempt <= 4 && svg === null; attempt++) {
    try {
      svg = execFileSync("curl", ["-sL", "--max-time", "60", url], {
        maxBuffer: 10 * 1024 * 1024,
        encoding: "utf8",
      });
      if (!svg.includes("<svg")) svg = null;
    } catch {
      svg = null;
    }
    if (svg === null && attempt < 4) {
      console.error(`retry ${slug} (attempt ${attempt + 1}/4)`);
      execFileSync("sleep", ["2"]);
    }
  }
  if (svg === null) {
    console.error(`FAIL ${slug} after 4 attempts`);
    continue;
  }
  try {
    writeFileSync(file, monochrome(svg), "utf8");
    const colors = [...svg.matchAll(/(?:fill|stroke)="(#[0-9a-fA-F]{3,8})"/g)].map((m) => m[1]);
    console.log(`ok ${slug}${colors.length ? ` (was ${[...new Set(colors)].slice(0, 4).join(" ")})` : " (already mono)"}`);
  } catch (e) {
    console.error(`FAIL ${slug}: ${e.message}`);
  }
}
console.log("written to src/assets/logos/");
