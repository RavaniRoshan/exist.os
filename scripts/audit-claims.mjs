import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../dist/index.html", import.meta.url), "utf8");

const required = [
  ["v0.6.0-beta", "current release"],
  ["Your own Git forge,", "hero headline"],
  ["built for agents.", "hero accent"],
  ["install.sh | bash", "install command"],
  ["existd bootstrap --email admin@corp.exist.io", "bootstrap command"],
  [":2222", "SSH port"],
  [":8080", "HTTP port"],
  ["Apache-2.0", "license"],
  ["refs/heads/agent/*", "lease isolation"],
];

const forbidden = [
  ["35 MCP", "stale tool count"],
  ["35 tools", "stale tool count"],
  ["119 REST", "stale operation count"],
  ["137 frontend", "stale test count"],
  ["25 Go packages", "stale package count"],
  ["Primer", "stale design language"],
  ["enterprise-ready", "unverified enterprise claim"],
  ["wire-compatible", "unverified compatibility claim"],
  ["Space UI", "stale design language"],
  [":3000", "stale Web UI port"],
  ["TODO", "placeholder"],
  ["TBD", "placeholder"],
  ["Lorem", "placeholder"],
];

let failed = false;

for (const [needle, label] of required) {
  if (!html.includes(needle)) {
    console.error(`MISSING (${label}): "${needle}"`);
    failed = true;
  }
}
for (const [needle, label] of forbidden) {
  if (html.includes(needle)) {
    console.error(`FORBIDDEN (${label}): "${needle}"`);
    failed = true;
  }
}

if (failed) {
  console.error("\nclaims audit FAILED");
  process.exit(1);
}
console.log("claims audit passed —", required.length, "claims verified");
