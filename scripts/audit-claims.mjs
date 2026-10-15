import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../dist/index.html", import.meta.url), "utf8");

const required = [
  ["35 MCP tools", "MCP tool count (internal/mcp/tools.go)"],
  ["35 tools", "MCP tool count, diagram variant"],
  ["119 REST operations", "REST op count"],
  ["137 frontend tests", "Vitest test count"],
  ["25 Go packages", "Go package count"],
  ["CGO_ENABLED=0", "pure-Go invariant"],
  [":2222", "SSH port"],
  [":8080", "HTTP port"],
  ["Apache-2.0 / MIT dual licensed", "license"],
  ["Phase 6 next", "roadmap honesty"],
  ["The self-hosted forge for the age of coding agents.", "hero headline"],
  ["existd bootstrap --email &lt;you@example.com&gt; --namespace &lt;org&gt;", "setup prompt"],
];

const forbidden = [
  ["34 MCP", "stale tool count"],
  ["34 tools", "stale tool count"],
  ["TODO", "placeholder"],
  ["TBD", "placeholder"],
  ["Lorem", "placeholder"],
  ["world's fastest", "unearned PlanetScale-style claim"],
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
