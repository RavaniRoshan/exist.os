# exist.io Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the exist.io landing page — a single-page, dark-first, monospace brutalist marketing site (Astro + Tailwind v4, zero webfonts, vanilla JS) whose hero CTA is a copy-ready prompt that bootstraps a self-hosted forge via a coding agent.

**Architecture:** Static Astro site. One typed content module (`src/content/landing.ts`) holds every string and claim; section components read from it so copy never touches layout. Tailwind v4 `@theme` tokens (flipped by `data-theme` on `<html>`) implement the adapted PlanetScale design system; three small vanilla scripts (dropdowns, tabs, copy) plus a head theme script are the entire JS surface. A claims-audit script verifies every number on the built page against repo sources.

**Tech Stack:** Astro 5, Tailwind CSS v4 (`@tailwindcss/vite`), TypeScript (strict), vanilla JS for interactions, Node 24.

**Spec:** `docs/superpowers/specs/2026-10-15-exist-io-landing-design.md`
**Design reference:** `docs/superpowers/specs/2026-10-15-planetscale-homepage-reference.md`

## Global Constraints

- Every factual claim on the page traces to the exist.io repo. Numbers: **35 MCP tools** (`internal/mcp/tools.go` `BuiltinTools()`, entries 1–35, verified 2026-10-15), **119 REST operations**, **137 Vitest tests / 37 suites**, **25 Go packages at 100% test pass**, `CGO_ENABLED=0`, ports `:3000` / `:8080` / `:2222`, Apache-2.0 / MIT. No fabricated benchmarks, user counts, or logos.
- Design system: single system mono stack (`ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace`), 16px/24px, hierarchy by weight/color only. No webfonts, no images (inline SVG only), no gradients, no shadows, no rounded corners. Dark default (`data-theme="dark"`), light via toggle persisted in `localStorage`.
- Accent green `#76B49A` (dark) / `#2D6A57` (light) replaces the reference's orange in every structural slot.
- 1px `#414141` hairline borders; `.dashed-box` gradient dashes; `hr.dot-fill` (115 literal `.`); hanging-rule H1 (2px accent rule, `margin-left:-16px`, `padding-left:16px`, `text-indent:-2px`); literal `* ` bullet markers; wall cells use `margin:-0.5px`.
- Tailwind v4 syntax only: important modifier is the suffix form (`h-auto!`), not the v3 prefix form.
- Motion: hover transitions only + global `prefers-reduced-motion` guard. No scroll animations.
- Commits: Conventional Commits (`feat(landing): …`), one per task.
- The hero prompt copy is byte-exact per spec §5.

---

## File Structure

```
astro.config.mjs            Astro config + @tailwindcss/vite plugin (base: "/")
package.json                scripts: dev / build / preview / check
tsconfig.json               extends astro/tsconfigs/strict
public/favicon.svg          ∃ mark (O1)
scripts/audit-claims.mjs    claims verification against built HTML
src/
├── content/
│   └── landing.ts          ALL copy + claims, typed (single source of truth)
├── styles/
│   └── global.css          @theme token layer, base element styles, .btn/.dashed-box/.dot-fill
├── layouts/
│   └── BaseLayout.astro    html shell, <head>, meta/OG, no-flash theme script
├── components/
│   ├── AnnouncementBar.astro
│   ├── SiteHeader.astro    logo · nav dropdowns · star/deploy · <details> mobile menu
│   ├── Hero.astro          H1 + 3 lead paragraphs + spec strip
│   ├── SetupTerminal.astro terminal card + copy-ready prompt (hero anchor)
│   ├── CompatibilityWall.astro
│   ├── CapabilityBands.astro   4 sections × wireframe cell grid
│   ├── AgentsDeepDive.astro    Connect / Leases / Review tabs + UI-moment slot
│   ├── ArchitectureDiagram.astro  ASCII <pre> × 3 width variants
│   ├── EndpointTable.astro
│   ├── ProofRoadmap.astro
│   ├── Quickstart.astro
│   └── SiteFooter.astro
├── pages/
│   └── index.astro         composes all sections in spec §4 order
└── scripts/
    ├── nav.ts              dropdown open/close/aria behavior
    ├── tabs.ts             tablist keyboard navigation
    └── copy.ts             clipboard + "Copied" + aria-live
```

---

### Task 1: Scaffold — Astro + Tailwind v4 toolchain

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `src/pages/index.astro` (probe)
- Create: `src/styles/probe.css`
- Create: `.gitignore`

**Interfaces:**
- Consumes: nothing
- Produces: `npm run dev|build|preview|check` scripts; Tailwind v4 wired into Astro via Vite plugin

- [ ] **Step 1: Write package.json**

```json
{
  "name": "exist-io-landing",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check"
  },
  "dependencies": {
    "astro": "^5.16.0"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.4",
    "@tailwindcss/vite": "^4.1.0",
    "tailwindcss": "^4.1.0",
    "typescript": "^5.7.0"
  }
}
```

- [ ] **Step 2: Write astro.config.mjs**

```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/',
  vite: { plugins: [tailwindcss()] },
});
```

- [ ] **Step 3: Write tsconfig.json and .gitignore**

`tsconfig.json`:
```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

`.gitignore`:
```
node_modules/
dist/
.astro/
```

- [ ] **Step 4: Write probe page and probe stylesheet**

`src/styles/probe.css`:
```css
@import "tailwindcss";
```

`src/pages/index.astro`:
```astro
---
import '../styles/probe.css';
---
<html lang="en"><body class="bg-canvas p-6">probe</body></html>
```

- [ ] **Step 5: Install and verify build**

Run: `npm install && npm run build`
Expected: install succeeds (registry confirmed reachable), `dist/index.html` emitted, exit 0.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json .gitignore src/pages/index.astro src/styles/probe.css
git commit -m "chore(landing): scaffold astro + tailwind v4"
```

---

### Task 2: Token layer, base styles, BaseLayout, no-flash theme script

**Files:**
- Create: `src/styles/global.css` (full content in Step 1)
- Create: `src/layouts/BaseLayout.astro`
- Modify: `src/pages/index.astro` (use layout, import global.css)
- Delete: `src/styles/probe.css`

**Interfaces:**
- Consumes: Task 1 scaffold
- Produces: `<BaseLayout title description>` used by the page; CSS custom props `--canvas`, `--text-primary`, `--text-secondary`, `--text-contrast`, `--text-decoration`, `--border-hairline`, `--accent`, `--accent-on`, `--code-bg`; utilities `bg-canvas text-text-primary text-text-secondary text-text-contrast text-text-decoration border-hairline border-accent bg-accent text-accent text-accent-on bg-code-bg font-mono`; classes `.btn .btn-outline .btn-sm .dashed-box .dot-fill .wall-cell`

- [ ] **Step 1: Write `src/styles/global.css` in full**

```css
@import "tailwindcss";

@layer base {
  :root,
  [data-theme="dark"] {
    --canvas: #111111;
    --text-primary: #ebebeb;
    --text-secondary: #a1a1a1;
    --text-contrast: #ffffff;
    --text-decoration: #616161;
    --border-hairline: #414141;
    --accent: #76b49a;
    --accent-on: #111111;
    --code-bg: #1a1a1a;
  }
  [data-theme="light"] {
    --canvas: #fafafa;
    --text-primary: #414141;
    --text-secondary: #737373;
    --text-contrast: #000000;
    --text-decoration: #c1c1c1;
    --border-hairline: #414141;
    --accent: #2d6a57;
    --accent-on: #fafafa;
    --code-bg: #ebebeb;
  }
}

@theme inline {
  --color-canvas: var(--canvas);
  --color-text-primary: var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-text-contrast: var(--text-contrast);
  --color-text-decoration: var(--text-decoration);
  --color-hairline: var(--border-hairline);
  --color-accent: var(--accent);
  --color-accent-on: var(--accent-on);
  --color-code-bg: var(--code-bg);
  --font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
}

@layer base {
  html { background: var(--canvas); font-size: 16px; }
  body {
    background: transparent;
    color: var(--text-primary);
    font-family: var(--font-mono);
    font-size: 16px;
    line-height: 24px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1 {
    margin: 0 0 24px -16px;
    padding-left: 16px;
    border-left: 2px solid var(--accent);
    font-size: 16px;
    line-height: 24px;
    font-weight: 700;
    color: var(--text-contrast);
    text-indent: -2px;
  }
  h2 { font-size: 16px; font-weight: 700; margin: 0 0 24px; color: var(--text-contrast); }
  h2 a, h3 a { color: inherit; text-decoration-line: none; }
  h3 { font-size: inherit; font-weight: 700; margin: 0 0 8px; color: var(--text-contrast); }
  h4, h5, h6 { font-size: inherit; font-weight: inherit; margin: 0 0 8px; color: var(--text-contrast); }
  p { margin: 0 0 24px; }
  blockquote { padding-left: 12px; border-left: 2px solid var(--text-decoration); margin: 16px 0; font-weight: 400; }
  figcaption { color: var(--text-secondary); padding-inline: 24px; margin-top: 16px; }
  code { font-size: 15px; background: var(--code-bg); color: var(--text-contrast); padding: 0 4px; }
  pre { font-family: var(--font-mono); font-size: 16px; line-height: 20px; background: var(--canvas); color: var(--text-contrast); font-weight: 500; padding: 16px; margin: 0 0 24px; overflow-x: auto; }
  pre.ascii-sm { font-size: 12px; line-height: 16px; }
  @media (min-width: 1024px) {
    pre.ascii-sm { font-size: 16px; line-height: 20px; }
    pre.ascii-md, pre.ascii-lg { font-size: 16px; line-height: 20px; }
  }
  a { color: inherit; text-decoration-line: inherit; }
  main p a { color: var(--accent); text-decoration-line: none; }
  ul.prose { list-style-type: "* "; padding-left: 16px; margin: 0 0 24px 16px; display: flex; flex-direction: column; gap: 8px; }
}

@layer components {
  .btn {
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    white-space: nowrap;
    background: var(--accent);
    color: var(--accent-on);
    padding-inline: 16px;
    font-weight: 600;
    line-height: 1;
    border: 0;
    cursor: pointer;
    font-family: inherit;
    font-size: 16px;
  }
  .btn:focus-visible { outline: 2px solid transparent; outline-offset: 2px; box-shadow: 0 0 0 1px var(--accent); }
  .btn-outline { border: 2px solid var(--accent); color: var(--text-primary); background: transparent; }
  .btn-sm { height: 32px; padding-inline: 4px; }

  .dashed-box {
    background-image:
      repeating-linear-gradient(0deg, var(--text-primary), var(--text-primary) 12px, transparent 12px, transparent 16px),
      repeating-linear-gradient(90deg, var(--text-primary), var(--text-primary) 12px, transparent 12px, transparent 16px),
      repeating-linear-gradient(180deg, var(--text-primary), var(--text-primary) 12px, transparent 12px, transparent 16px),
      repeating-linear-gradient(270deg, var(--text-primary), var(--text-primary) 12px, transparent 12px, transparent 16px);
    background-position: 0 0, 0 0, 100% 0, 0 100%;
    background-repeat: no-repeat;
    background-size: 1px 100%, 100% 1px, 1px 100%, 100% 1px;
  }

  hr.dot-fill { width: 100%; height: 16px; border-style: none; line-height: 1rem; position: relative; overflow: hidden; margin: 24px 0; }
  hr.dot-fill::before {
    content: "...................................................................................................................";
    white-space: nowrap;
    position: absolute;
    left: 0;
    right: 0;
    overflow: hidden;
    color: var(--text-decoration);
  }

  .wall-cell { margin: -0.5px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border-hairline); height: 128px; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
}
```

(The `::before` content is 115 literal `.` characters — keep the count.)

- [ ] **Step 2: Write `src/layouts/BaseLayout.astro`**

```astro
---
interface Props {
  title: string;
  description: string;
}
const { title, description } = Astro.props;
---

<!doctype html>
<html lang="en" data-theme="dark">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <script is:inline>
      // no-flash theme: apply persisted choice before first paint
      try {
        var t = localStorage.getItem("exist-theme");
        if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
      } catch (e) {}
    </script>
  </head>
  <body class="bg-canvas text-text-primary font-mono">
    <slot />
  </body>
</html>
```

Note: this task only establishes the `data-theme` attribute contract. The theme toggle button and `initTheme()` ship in Task 4.

- [ ] **Step 3: Rewrite probe page to use the layout**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import '../styles/global.css';
---
<BaseLayout title="exist.io — probe" description="probe">
  <main class="container mx-auto mb-6 max-w-7xl px-3 sm:px-5 lg:px-12">
    <h1>hanging rule probe</h1>
    <p>body probe <a href="#">link probe</a> <code>code probe</code></p>
    <hr class="dot-fill" />
    <div class="dashed-box p-3 mb-6">dashed probe</div>
    <button class="btn">Button probe</button>
    <button class="btn btn-outline ml-1">Outline probe</button>
    <div class="grid grid-cols-2 md:grid-cols-5"><div class="wall-cell">cell</div><div class="wall-cell">cell</div></div>
  </main>
</BaseLayout>
```

- [ ] **Step 4: Verify**

Run: `rm src/styles/probe.css && npm run build && npx astro check`
Expected: exit 0; `dist/index.html` contains `data-theme="dark"`; compiled CSS contains `border-left: 2px solid var(--accent)` and the 115-dot content.

- [ ] **Step 5: Commit**

```bash
git add -A src
git commit -m "feat(landing): token layer, base layout, no-flash theme bootstrap"
```

---

### Task 3: Content module — every string and claim, typed

**Files:**
- Create: `src/content/landing.ts` (full content in Step 1)

**Interfaces:**
- Consumes: nothing
- Produces: default-export `landing` object with keys: `meta`, `announcement`, `nav`, `hero`, `terminal`, `wall`, `bands`, `agents`, `uiMoment`, `architecture`, `endpoints`, `proof`, `quickstart`, `footer` (exact shapes below)

- [ ] **Step 1: Write `src/content/landing.ts` in full**

```ts
export const landing = {
  meta: {
    title: "exist.io — the self-hosted forge for the age of coding agents",
    description:
      "An open-source, self-hosted Git forge for people and coding agents. One pure-Go binary, zero external services, MCP-native, enterprise-ready.",
  },

  announcement: {
    text: "v0.4 shipped — Primer UI parity, autonomous PR review, capability leases.",
    href: "https://github.com/RavaniRoshan/exist.io/releases",
  },

  nav: {
    platformLabel: "Platform",
    resourcesLabel: "Resources",
    platform: [
      { label: "For agents — MCP, leases, review", href: "#agents" },
      { label: "For your team — PRs, issues, releases", href: "#capabilities" },
      { label: "Architecture — one daemon, three layers", href: "#architecture" },
    ],
    resources: [
      { label: "GitHub", href: "https://github.com/RavaniRoshan/exist.io" },
      { label: "Documentation", href: "https://ravaniroshan.github.io/exist.io" },
      {
        label: "Roadmap",
        href: "https://github.com/RavaniRoshan/exist.io/blob/main/ROADMAP.md",
      },
      {
        label: "AGENTS.md",
        href: "https://github.com/RavaniRoshan/exist.io/blob/main/AGENTS.md",
      },
    ],
    docsLabel: "Documentation",
    docsHref: "https://ravaniroshan.github.io/exist.io",
    starLabel: "★ Star",
    starHref: "https://github.com/RavaniRoshan/exist.io",
    deployLabel: "Deploy",
    deployHref: "#quickstart",
    themeLabel: "Theme",
  },

  hero: {
    h1: "The self-hosted forge for the age of coding agents.",
    leads: [
      "exist.io is an open-source Git forge that runs entirely on infrastructure you control — one pure-Go binary, SQLite storage, no cloud dependency, no external services to babysit.",
      "It treats coding agents as first-class citizens: a native MCP server with 35 tools, scoped capability leases, and autonomous pull-request review. Humans and agents hold real permissions — the agent gets a lease, not the keys to the kingdom.",
      "OIDC and SAML single sign-on, SCIM 2.0 provisioning, OpenSSH and GPG commit verification, and official Terraform and Helm deployments — wire-compatible with the forge APIs your tooling already speaks.",
    ],
    specStrip:
      "119 REST operations · 35 MCP tools · 25 Go packages at 100% test pass · 137 frontend tests · Git LFS · SSH :2222 · zero cgo",
  },

  terminal: {
    title: "One prompt. Your agent does the rest.",
    prompt: `Bootstrap a self-hosted exist.io forge on this machine:
1. Download the latest existd release binary for this platform.
2. Run: existd bootstrap --email <you@example.com> --namespace <org>
3. Start the daemon (HTTP :8080, SSH :2222).
4. Create my first repository and give me the clone URL.
5. Register yourself as an MCP client at http://localhost:8080/mcp
   and verify the connection works.
Confirm each step before running the next, and tell me when it's done.`,
    caption: "Works with Claude Code, Cursor, and Cline — anything that speaks MCP.",
    buttonLabel: "Copy prompt",
    copiedLabel: "Copied ✓",
  },

  wall: {
    items: [
      "Git",
      "SSH",
      "OpenSSH",
      "GPG",
      "Git LFS",
      "SQLite",
      "OIDC",
      "SAML",
      "SCIM 2.0",
      "MCP",
      "Terraform",
      "Helm",
      "Kubernetes",
      "Prometheus",
    ],
  },

  bands: [
    {
      id: "capabilities",
      title: "What the forge does",
      intro: "Every piece of a modern Git platform, implemented in one hermetic daemon.",
      cells: [
        { name: "Pull requests & 3-way merge", desc: "Deterministic merge engine with squash, approval gates, required checks, and merge queues.", detail: "ruleset policy engine" },
        { name: "Issues & threads", desc: "SQLite-backed issue tracking with threaded comments, labels, and one-click agent triage.", detail: "internal/app" },
        { name: "Releases", desc: "Tagged binary distribution with checksums and draft publishing.", detail: "cryptographically verified" },
        { name: "Webhooks", desc: "HMAC-SHA256 signed delivery with attempt audit log and redelivery.", detail: "per-event routing" },
        { name: "Primer-parity UI", desc: "GitHub Primer-faithful interface: 6px squircles, 1px borders, contribution heatmaps.", detail: "React 19 · Vite" },
        { name: "Contributions", desc: "52-week activity heatmaps across every namespace.", detail: "live aggregation" },
      ],
    },
    {
      id: "transports",
      title: "Transports & storage",
      intro: "Two Git transports and a storage layer with no external dependencies.",
      cells: [
        { name: "Smart-HTTP", desc: "Pure-Go HTTP transport for authenticated clone, fetch, push.", detail: ":8080" },
        { name: "Embedded SSH", desc: "Standalone pure-Go SSH server — no host OpenSSH daemon required.", detail: ":2222 · zero cgo" },
        { name: "Git LFS v1", desc: "Content-addressable storage with SHA-256 validation and file locking.", detail: "/info/lfs/locks" },
        { name: "SQLite WAL", desc: "Metadata, grants, PRs, rules, and SSO in one embedded database.", detail: "modernc.org/sqlite" },
        { name: "Bare repositories", desc: "go-git v6 against on-disk bare repos — packfiles, trees, refs.", detail: "go-git v6" },
        { name: "Portable builds", desc: "CGO-free binaries for every platform you run.", detail: "linux/amd64 · arm64 · darwin/arm64 · windows/amd64" },
      ],
    },
    {
      id: "security",
      title: "Security & verification",
      intro: "Cryptographic proof of origin and policy enforcement at the push boundary.",
      cells: [
        { name: "Commit signatures", desc: "Real-time OpenSSH SIGSPEC and GPG (RFC 4880) parsing with fingerprint matching.", detail: "audit popover" },
        { name: "Pre-receive hook", desc: "Blocks pushed secrets, private keys, and API tokens before they land.", detail: "internal/security" },
        { name: "Rulesets", desc: "Approvals, required checks, CIDR allowlists, and SSH certificate authorities.", detail: "policy engine" },
        { name: "Audit log", desc: "Immutable compliance record of administrative actions.", detail: "internal/audit" },
        { name: "Archive freeze", desc: "Archived repos reject all writes over HTTP, SSH, issues, PRs, and releases.", detail: "403 · exit 1" },
        { name: "Deploy keys", desc: "Per-repository UUID isolation; read-only keys abort receive-pack.", detail: "strict isolation" },
      ],
    },
    {
      id: "enterprise",
      title: "Enterprise identity & IaC",
      intro: "The integration surface your platform team expects from a forge.",
      cells: [
        { name: "Single sign-on", desc: "OIDC and SAML 2.0 login with metadata endpoints.", detail: "/api/v1/auth/sso/*" },
        { name: "SCIM 2.0", desc: "RFC 7644 user provisioning with automated offboarding revocation.", detail: "/scim/v2/Users" },
        { name: "Terraform / OpenTofu", desc: "Official provider managing namespaces, repos, and rulesets declaratively.", detail: "deploy/terraform-provider-exist" },
        { name: "Kubernetes Helm", desc: "Production chart with dual-port service and non-root security contexts.", detail: "deploy/helm/exist-enterprise" },
        { name: "Prometheus", desc: "Metrics exposition with ServiceMonitor for Grafana.", detail: "/metrics" },
        { name: "Health probes", desc: "Kubernetes liveness and readiness endpoints.", detail: "/healthz" },
      ],
    },
  ],

  agents: {
    id: "agents",
    title: "Your agents hold permissions",
    intro:
      "exist.io treats autonomous coding agents as first-class citizens — connected by MCP, bounded by capability leases, and put to work as reviewers.",
    tabs: [
      {
        id: "connect",
        label: "Connect",
        title: "Point your agent at the forge",
        body: [
          "exist.io speaks the Model Context Protocol natively. Add it to your agent configuration file (Claude Desktop, Cursor, Cline) and the agent gets repository browsing, symbol search, and pull-request workflows over JSON-RPC 2.0.",
        ],
        code: `{
  "mcpServers": {
    "exist-io": {
      "url": "http://localhost:8080/mcp",
      "headers": {
        "Authorization": "Bearer <your-token>"
      }
    }
  }
}`,
        codeLabel: "mcp.json",
        note:
          "Untrusted agents: point the URL at /mcp/readonly — any mutation attempt is blocked at the protocol layer.",
      },
      {
        id: "leases",
        label: "Leases",
        title: "Permissions, not passwords",
        body: [
          "Autonomous agents don't get long-lived credentials. They get ephemeral capability leases: short-lived tokens, signed with HMAC-SHA256, verified on every Git push and REST request, and isolated to a ref prefix so an agent can only touch the branches it leased.",
        ],
        points: [
          "Ephemeral HMAC-SHA256 capability tokens, issued and expired automatically.",
          "Ref-prefix isolation to refs/heads/agent/* — production branches stay untouchable.",
          "Verified on every push and REST request; leaked tokens die on schedule.",
        ],
      },
      {
        id: "review",
        label: "Review",
        title: "The reviewer that never sleeps",
        body: [
          "The built-in reviewer agent inspects every diff for leaked secrets and missing test coverage, evaluates the change against its static AST analysis, and reports back as a check run — pull requests get a first opinion before a human ever opens one.",
        ],
        points: [
          "Diff inspection with secret and private-key detection.",
          "Test-coverage evaluation and static AST diagnostics.",
          "Results reported as check runs, gated by your rulesets.",
        ],
      },
    ],
  },

  uiMoment: {
    label: "Illustrative — lease issuance drawer",
    title: "Issue capability lease",
    rows: [
      ["agent", "claude-code · session 8f2a"],
      ["ref prefix", "refs/heads/agent/*"],
      ["expires", "15m"],
      ["signature", "HMAC-SHA256 · a1b2…c3d4"],
    ],
    button: "Issue lease",
  },

  architecture: {
    id: "architecture",
    title: "One daemon, three layers",
    caption:
      "existd is a single hermetic binary: clients and agents reach it over HTTP and SSH, policy and transports run in-process, and all state stays on local disk.",
  },

  endpoints: {
    title: "Service surface",
    rows: [
      { path: ":3000", proto: "Web UI", desc: "Space UI developer dashboard & admin console" },
      { path: ":2222", proto: "SSH", desc: "Pure-Go embedded SSH clone, fetch, push" },
      { path: ":8080", proto: "Smart-HTTP", desc: "HTTP clone, fetch, push" },
      { path: "/info/lfs", proto: "LFS", desc: "Git LFS v1 batch and object API" },
      { path: "/v1/origin", proto: "REST", desc: "Forge REST API — 119 operations" },
      { path: "/scim/v2/Users", proto: "SCIM", desc: "RFC 7644 user provisioning" },
      { path: "/api/v1/auth/sso/*", proto: "OIDC/SAML", desc: "Enterprise SSO login and metadata" },
      { path: "/mcp", proto: "MCP", desc: "Read-write MCP endpoint — 35 tools" },
      { path: "/mcp/readonly", proto: "MCP", desc: "Sandboxed read-only MCP endpoint" },
      { path: "/metrics", proto: "Prometheus", desc: "Metrics exposition" },
      { path: "/healthz", proto: "HTTP", desc: "Liveness and readiness probes" },
    ],
  },

  proof: {
    id: "proof",
    title: "Built clean",
    points: [
      "25 Go packages passing at 100% across unit and integration suites.",
      "137 frontend tests across 37 Vitest suites, zero failures.",
      "CGO_ENABLED=0 builds verified on linux/amd64, linux/arm64, darwin/arm64, windows/amd64.",
      "Zero-mock production integrity: the UI never flashes demo data at a live cluster — the same rule this page holds itself to.",
    ],
    roadmapTitle: "Honest roadmap",
    shipped: [
      "Phases 1–5 shipped: core forge & MCP, enterprise protocols & IaC, Space UI, agent review & leases, GitHub Primer parity.",
    ],
    next: [
      "Phase 6 next: multi-region active-active Raft replication and S3 object sharding.",
    ],
  },

  quickstart: {
    id: "quickstart",
    title: "Deploy in 5 minutes",
    intro: "Three commands to a running forge — or skip the manual path and hand the prompt at the top of this page to your agent.",
    commands: `go build -o bin/existd ./cmd/existd

./bin/existd bootstrap \\
  --email admin@corp.exist.io \\
  --namespace acme \\
  --data-dir ./data

./bin/existd`,
    alt: "Prefer containers? docker compose -f docker-compose.enterprise.yml up -d runs the full stack.",
    primaryLabel: "Copy prompt",
    starLabel: "★ Star on GitHub",
    starHref: "https://github.com/RavaniRoshan/exist.io",
    docsLabel: "Read the docs",
    docsHref: "https://ravaniroshan.github.io/exist.io",
  },

  footer: {
    columns: [
      { title: "Project", links: [
        { label: "GitHub", href: "https://github.com/RavaniRoshan/exist.io" },
        { label: "Releases", href: "https://github.com/RavaniRoshan/exist.io/releases" },
        { label: "Roadmap", href: "https://github.com/RavaniRoshan/exist.io/blob/main/ROADMAP.md" },
        { label: "License", href: "https://github.com/RavaniRoshan/exist.io/blob/main/README.md" },
      ]},
      { title: "Docs", links: [
        { label: "Documentation", href: "https://ravaniroshan.github.io/exist.io" },
        { label: "AGENTS.md", href: "https://github.com/RavaniRoshan/exist.io/blob/main/AGENTS.md" },
        { label: "Architecture", href: "https://github.com/RavaniRoshan/exist.io#-system-architecture" },
      ]},
      { title: "Protocols", links: [
        { label: "MCP", href: "https://github.com/RavaniRoshan/exist.io#-connecting-ai-coding-agents-mcp" },
        { label: "SCIM 2.0", href: "https://github.com/RavaniRoshan/exist.io#-enterprise-sso--scim-20-sync" },
        { label: "SSH :2222", href: "https://github.com/RavaniRoshan/exist.io#-dual-git-transports-http--ssh-2222" },
        { label: "Git LFS", href: "https://github.com/RavaniRoshan/exist.io#-git-lfs-v1-cas--object-locking" },
      ]},
      { title: "Community", links: [
        { label: "Issues", href: "https://github.com/RavaniRoshan/exist.io/issues" },
        { label: "Pull requests", href: "https://github.com/RavaniRoshan/exist.io/pulls" },
      ]},
    ],
    legal: "Apache-2.0 / MIT dual licensed · © 2026 exist.io contributors",
    social: [{ label: "GitHub", href: "https://github.com/RavaniRoshan/exist.io" }],
  },
};

export default landing;
```

- [ ] **Step 2: Verify**

Run: `npx astro check`
Expected: exit 0, no type errors.

- [ ] **Step 3: Commit**

```bash
git add src/content/landing.ts
git commit -m "feat(landing): typed content module — all copy and claims in one file"
```

---

### Task 4: ∃ favicon, announcement bar, site header, nav dropdowns, theme toggle

**Files:**
- Create: `public/favicon.svg`
- Create: `src/components/AnnouncementBar.astro`
- Create: `src/components/SiteHeader.astro`
- Create: `src/scripts/nav.ts`
- Create: `src/scripts/theme.ts`
- Modify: `src/styles/global.css` (append dropdown rules)
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `landing.meta`, `landing.announcement`, `landing.nav` (Task 3)
- Produces: `<SiteHeader />`, `<AnnouncementBar />`; `initNav()`, `initTheme()` (both idempotent); theme toggle button persists `exist-theme` in `localStorage` and flips `data-theme` on `<html>`

- [ ] **Step 1: Write `public/favicon.svg` (the ∃ mark)**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
  <path d="M6 12h28" stroke="currentColor" stroke-width="4" fill="none" />
  <path d="M6 12v9c0 8 28 8 28 0v-9" stroke="currentColor" stroke-width="4" fill="none" />
</svg>
```

- [ ] **Step 2: Write `src/scripts/nav.ts`**

```ts
export function initNav(): void {
  document.querySelectorAll<HTMLElement>("[data-dropdown]").forEach((wrap) => {
    const trigger = wrap.querySelector<HTMLButtonElement>("[data-dropdown-trigger]");
    if (!trigger) return;

    const close = () => {
      wrap.removeAttribute("data-open");
      trigger.setAttribute("aria-expanded", "false");
    };
    const open = () => {
      document.querySelectorAll("[data-dropdown][data-open]").forEach((other) => {
        if (other !== wrap) {
          other.removeAttribute("data-open");
          other.querySelector<HTMLButtonElement>("[data-dropdown-trigger]")?.setAttribute("aria-expanded", "false");
        }
      });
      wrap.setAttribute("data-open", "");
      trigger.setAttribute("aria-expanded", "true");
    };

    trigger.addEventListener("click", () => {
      wrap.hasAttribute("data-open") ? close() : open();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
    document.addEventListener("click", (e) => {
      if (!wrap.contains(e.target as Node)) close();
    });
  });
}
```

- [ ] **Step 3: Write `src/scripts/theme.ts`**

```ts
export function initTheme(): void {
  document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const root = document.documentElement;
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("exist-theme", next);
      } catch {
        // storage unavailable (private mode) — theme simply doesn't persist
      }
      button.textContent = next === "dark" ? "Light" : "Dark";
    });
  });
}
```

- [ ] **Step 4: Write `src/components/AnnouncementBar.astro`**

```astro
---
import { landing } from '../content/landing';
---
<div class="bg-accent text-accent-on">
  <div class="container mx-auto max-w-7xl px-3 sm:px-5 lg:px-12 py-2 text-center">
    <span>{landing.announcement.text}</span>
    <a class="underline hover:no-underline ml-1" href={landing.announcement.href}>Read the release notes →</a>
  </div>
</div>
```

- [ ] **Step 5: Write `src/components/SiteHeader.astro`**

```astro
---
import { landing } from '../content/landing';
const { nav } = landing;

const dropdown = (id: string, label: string, items: { label: string; href: string }[]) => (
  <div class="relative" data-dropdown>
    <button
      type="button"
      id={`${id}-trigger`}
      data-dropdown-trigger
      aria-expanded="false"
      class="font-semibold text-text-primary hover:text-text-contrast whitespace-nowrap"
    >
      {label}<span class="ml-1 inline-block">▾</span>
    </button>
    <div
      data-dropdown-panel
      hidden
      aria-labelledby={`${id}-trigger`}
      class="absolute left-0 top-8 z-10 w-72 border border-accent bg-canvas p-3"
    >
      <ul class="flex flex-col gap-1">
        {items.map((item) => (
          <li>
            <a class="block px-2 py-1 hover:bg-code-bg hover:text-text-contrast" href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const mark = "M6 12h28 M6 12v9c0 8 28 8 28 0v-9";
---

<header class="relative mt-8 mb-12 bg-canvas">
  <div class="container mx-auto flex max-w-7xl flex-col gap-y-3 px-3 sm:px-5 lg:px-12">
    <div class="grid w-full grid-cols-[auto_1fr] items-center gap-3">
      <div class="flex items-center gap-3">
        <a aria-label="Go to homepage" href="/" class="hidden h-8 w-8 text-text-primary lg:block">
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <path d={mark} stroke="currentColor" stroke-width="4" />
          </svg>
        </a>
        <nav aria-label="Main" class="hidden items-center lg:flex">
          <ul class="flex flex-wrap items-center gap-x-1">
            <li>{dropdown("platform", nav.platformLabel, nav.platform)}</li>
            <li class="text-text-decoration" role="presentation">|</li>
            <li>{dropdown("resources", nav.resourcesLabel, nav.resources)}</li>
            <li class="text-text-decoration" role="presentation">|</li>
            <li><a class="font-semibold text-text-primary hover:text-text-contrast" href={nav.docsHref}>{nav.docsLabel}</a></li>
          </ul>
        </nav>
        <a aria-label="Go to homepage" href="/" class="h-8 w-8 text-text-primary lg:hidden">
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <path d={mark} stroke="currentColor" stroke-width="4" />
          </svg>
        </a>
      </div>
      <div class="col-start-2 flex shrink-0 items-center justify-end gap-1.5">
        <button type="button" data-theme-toggle class="font-semibold text-text-primary hover:text-accent">Light</button>
        <span class="text-text-decoration" role="presentation">|</span>
        <a class="font-semibold text-text-primary hover:text-accent" href={nav.starHref}>{nav.starLabel}</a>
        <a class="btn btn-sm ml-1" href={nav.deployHref}>{nav.deployLabel}</a>
      </div>
    </div>

    <details class="lg:hidden">
      <summary class="cursor-pointer font-semibold">Navigation</summary>
      <nav aria-label="Mobile" class="dashed-box mt-1 p-3">
        <ul class="flex flex-wrap items-center gap-x-1">
          {nav.platform.map((item) => (
            <li><a class="font-semibold hover:text-text-contrast" href={item.href}>{item.label}</a></li>
          ))}
          <li class="text-text-decoration" role="presentation">|</li>
          {nav.resources.map((item) => (
            <li><a class="font-semibold hover:text-text-contrast" href={item.href}>{item.label}</a></li>
          ))}
        </ul>
      </nav>
    </details>
  </div>
</header>
```

- [ ] **Step 6: Append dropdown rules to `src/styles/global.css`** (inside `@layer components`, after the `.wall-cell` rule)

```css
  [data-dropdown][data-open] [data-dropdown-panel] { display: block; }
```

- [ ] **Step 7: Wire header into probe page**

`src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import AnnouncementBar from '../components/AnnouncementBar.astro';
import SiteHeader from '../components/SiteHeader.astro';
import { initNav } from '../scripts/nav';
import { initTheme } from '../scripts/theme';
import '../styles/global.css';
---

<BaseLayout title="exist.io — probe" description="probe">
  <AnnouncementBar />
  <SiteHeader />
  <main class="container mx-auto mb-6 max-w-7xl px-3 sm:px-5 lg:px-12">
    <h1>hanging rule probe</h1>
  </main>
</BaseLayout>

<script>
  import { initNav } from '../scripts/nav';
  import { initTheme } from '../scripts/theme';
  initNav();
  initTheme();
</script>
```

- [ ] **Step 8: Verify**

Run: `npm run build`
Expected: exit 0. Then: `grep -c "data-dropdown" dist/index.html` ≥ 4, `grep -c 'aria-label="Go to homepage"' dist/index.html` = 2, `grep -c "data-theme-toggle" dist/index.html` = 1.

- [ ] **Step 9: Commit**

```bash
git add -A public src
git commit -m "feat(landing): ∃ mark, announcement bar, header nav with dropdowns and theme toggle"
```

---

### Task 5: Hero + setup terminal (copy-ready prompt)

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/SetupTerminal.astro`
- Create: `src/scripts/copy.ts`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `landing.hero`, `landing.terminal` (Task 3)
- Produces: `initCopy()` (idempotent); `<Hero />` renders H1 + leads + spec strip + `<SetupTerminal />`; copy buttons reference source `#agent-prompt` and status `#copy-status`

- [ ] **Step 1: Write `src/scripts/copy.ts`**

```ts
export function initCopy(): void {
  document.querySelectorAll<HTMLButtonElement>("[data-copy]").forEach((button) => {
    const source = document.querySelector<HTMLElement>(button.dataset.copySource ?? "");
    const status = document.querySelector<HTMLElement>(button.dataset.copyStatus ?? "");
    const defaultLabel = button.textContent ?? "Copy";
    if (!source) return;

    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(source.innerText);
        button.textContent = button.dataset.copiedLabel ?? "Copied ✓";
        if (status) status.textContent = "Copied";
      } catch {
        button.textContent = "Copy failed — select manually";
      }
      window.setTimeout(() => {
        button.textContent = defaultLabel;
        if (status) status.textContent = "";
      }, 2000);
    });
  });
}
```

- [ ] **Step 2: Write `src/components/SetupTerminal.astro`**

```astro
---
import { landing } from '../content/landing';
const { terminal } = landing;
---

<figure class="border border-hairline m-0">
  <div class="flex items-center justify-between border-b border-hairline px-3 py-2">
    <span class="flex items-center gap-1.5" aria-hidden="true">
      <span class="h-3 w-3 bg-text-decoration"></span>
      <span class="h-3 w-3 bg-text-decoration"></span>
      <span class="h-3 w-3 bg-text-decoration"></span>
    </span>
    <span class="text-text-secondary">{terminal.title}</span>
    <button
      type="button"
      class="btn btn-sm"
      data-copy
      data-copy-source="#agent-prompt"
      data-copy-status="#copy-status"
      data-copied-label={terminal.copiedLabel}
    >{terminal.buttonLabel}</button>
  </div>
  <pre id="agent-prompt" class="mb-0 px-3 py-3 text-[15px]">{terminal.prompt}</pre>
</figure>
<p id="copy-status" class="mt-1 mb-3 text-text-secondary" role="status" aria-live="polite"></p>
<p class="mt-3 mb-6 text-text-secondary">{terminal.caption}</p>
```

- [ ] **Step 3: Write `src/components/Hero.astro`**

```astro
---
import { landing } from '../content/landing';
import SetupTerminal from './SetupTerminal.astro';
const { hero } = landing;
---

<section class="mb-6">
  <h1>{hero.h1}</h1>
  {hero.leads.map((lead) => <p>{lead}</p>)}
  <div class="mt-6">
    <SetupTerminal />
  </div>
  <p class="mt-6 text-text-secondary">{hero.specStrip}</p>
</section>
```

- [ ] **Step 4: Wire hero into page**

`src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import AnnouncementBar from '../components/AnnouncementBar.astro';
import SiteHeader from '../components/SiteHeader.astro';
import Hero from '../components/Hero.astro';
import { initCopy } from '../scripts/copy';
import { initNav } from '../scripts/nav';
import { initTheme } from '../scripts/theme';
import '../styles/global.css';
---

<BaseLayout title="exist.io — probe" description="probe">
  <AnnouncementBar />
  <SiteHeader />
  <main class="container mx-auto mb-6 max-w-7xl px-3 sm:px-5 lg:px-12">
    <Hero />
  </main>
</BaseLayout>

<script>
  import { initCopy } from '../scripts/copy';
  import { initNav } from '../scripts/nav';
  import { initTheme } from '../scripts/theme';
  initCopy();
  initNav();
  initTheme();
</script>
```

- [ ] **Step 5: Verify**

Run: `npm run build`
Expected: exit 0; `dist/index.html` contains `existd bootstrap --email &lt;you@example.com&gt; --namespace &lt;org&gt;`, `Register yourself as an MCP client at http://localhost:8080/mcp`, `data-copy`, and `aria-live="polite"`.

- [ ] **Step 6: Commit**

```bash
git add -A src
git commit -m "feat(landing): hero with copy-ready agent-setup prompt terminal"
```

---

### Task 6: Compatibility wall

**Files:**
- Create: `src/components/CompatibilityWall.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `landing.wall.items` (14 wordmarks) (Task 3)
- Produces: `<CompatibilityWall />` — 1px wireframe grid, 2 cols mobile / 5 cols ≥768, `-0.5px` collapsed borders

- [ ] **Step 1: Write `src/components/CompatibilityWall.astro`**

```astro
---
import { landing } from '../content/landing';
const { items } = landing.wall;
---

<section class="mb-6" aria-label="Protocol and tool compatibility">
  <div class="grid grid-cols-2 items-center justify-center md:grid-cols-5">
    {items.map((item) => (
      <div class="wall-cell font-semibold">{item}</div>
    ))}
  </div>
</section>
```

- [ ] **Step 2: Wire into page**

Add after `<Hero />` inside `<main>`:

```astro
<CompatibilityWall />
```

with import `import CompatibilityWall from '../components/CompatibilityWall.astro';`.

- [ ] **Step 3: Verify**

Run: `npm run build && grep -c "wall-cell" dist/index.html`
Expected: exit 0; count = 14.

- [ ] **Step 4: Commit**

```bash
git add -A src
git commit -m "feat(landing): protocol compatibility wall"
```

---

### Task 7: Capability bands

**Files:**
- Create: `src/components/CapabilityBands.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `landing.bands` (4 sections: capabilities, transports, security, enterprise) (Task 3)
- Produces: `<CapabilityBands />` — H2 sections with `id`s `capabilities` / `transports` / `security` / `enterprise`, `hr.dot-fill` separators, wireframe cell grids

- [ ] **Step 1: Write `src/components/CapabilityBands.astro`**

```astro
---
import { landing } from '../content/landing';
const { bands } = landing;
---

<section id="capabilities">
  {bands.map((band, i) => (
    <>
      {i > 0 && <hr class="dot-fill" />}
      <div>
        <h2><a href={`#${band.id}`}>{band.title}</a></h2>
        <p>{band.intro}</p>
        <div class="grid grid-cols-1 gap-0 md:grid-cols-3">
          {band.cells.map((cell) => (
            <div class="wall-cell h-auto! flex-col items-start justify-start gap-1 p-3 text-left">
              <span class="font-bold text-text-contrast">{cell.name}</span>
              <span class="text-text-primary">{cell.desc}</span>
              <span class="text-text-secondary">{cell.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  ))}
</section>
```

- [ ] **Step 2: Wire into page**

Add import `import CapabilityBands from '../components/CapabilityBands.astro';` and after `<CompatibilityWall />`:

```astro
<hr class="dot-fill" />
<CapabilityBands />
```

- [ ] **Step 3: Verify**

Run: `npm run build && grep -c "dot-fill" dist/index.html && grep -o 'id="capabilities"\|id="transports"\|id="security"\|id="enterprise"' dist/index.html | sort -u`
Expected: exit 0; dot-fill count ≥ 3; all four section ids present.

- [ ] **Step 4: Commit**

```bash
git add -A src
git commit -m "feat(landing): capability bands with wireframe cell grids"
```

---

### Task 8: Agents deep-dive (tabs) + illustrative UI-moment slot

**Files:**
- Create: `src/components/AgentsDeepDive.astro`
- Create: `src/scripts/tabs.ts`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `landing.agents` (tabs: connect/leases/review), `landing.uiMoment` (Task 3)
- Produces: `<AgentsDeepDive />`; `initTabs()` (idempotent); tab ids `connect` / `leases` / `review`; selected tab styled via `data-selected:` variants

- [ ] **Step 1: Write `src/scripts/tabs.ts`**

```ts
export function initTabs(): void {
  document.querySelectorAll<HTMLElement>("[data-tabs]").forEach((root) => {
    const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-tab]"));
    const panels = Array.from(root.querySelectorAll<HTMLElement>("[data-panel]"));
    if (tabs.length === 0) return;

    const select = (index: number) => {
      tabs.forEach((tab, i) => {
        tab.setAttribute("aria-selected", i === index ? "true" : "false");
        tab.toggleAttribute("data-selected", i === index);
        const panel = panels[i];
        if (panel) panel.hidden = i !== index;
      });
    };

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(i));
      tab.addEventListener("keydown", (e) => {
        const key = e.key;
        if (key === "ArrowRight" || key === "ArrowLeft") {
          e.preventDefault();
          const next = (i + (key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
          tabs[next].focus();
          select(next);
        }
      });
    });

    select(0);
  });
}
```

- [ ] **Step 2: Write `src/components/AgentsDeepDive.astro`**

```astro
---
import { landing } from '../content/landing';
const { agents, uiMoment } = landing;
---

<section id={agents.id} class="mt-6">
  <h2><a href={`#${agents.id}`}>{agents.title}</a></h2>
  <p>{agents.intro}</p>

  <div data-tabs class="mt-6">
    <div class="grid grid-cols-1 divide-y border-x border-t border-hairline md:grid-cols-3 md:divide-x md:divide-y-0">
      {agents.tabs.map((tab, i) => (
        <button
          type="button"
          role="tab"
          data-tab
          aria-selected={i === 0 ? "true" : "false"}
          class={`py-2 text-center font-semibold text-text-primary data-selected:bg-accent data-selected:text-accent-on`}
        >
          {tab.label}
        </button>
      ))}
    </div>
    <div class="border border-hairline p-3">
      {agents.tabs.map((tab, i) => (
        <div data-panel role="tabpanel" hidden={i !== 0}>
          <h3>{tab.title}</h3>
          {tab.body.map((p) => <p>{p}</p>)}
          {tab.points && <ul class="prose">{tab.points.map((p) => <li>{p}</li>)}</ul>}
          {tab.code && (
            <figure class="m-0">
              <figcaption class="px-0! mt-0! mb-1 text-text-secondary">{tab.codeLabel}</figcaption>
              <pre class="mb-0 border border-hairline p-3 text-[15px]">{tab.code}</pre>
            </figure>
          )}
          {tab.note && <p class="text-text-secondary">{tab.note}</p>}
        </div>
      ))}
    </div>
  </div>

  <figure class="mt-6 border border-hairline m-0">
    <figcaption class="px-3! mt-0! border-b border-hairline py-2 text-text-secondary">{uiMoment.label}</figcaption>
    <div class="p-3">
      <h4 class="mb-2 font-bold text-text-contrast">{uiMoment.title}</h4>
      <dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
        {uiMoment.rows.map(([k, v]) => (
          <>
            <dt class="text-text-secondary">{k}</dt>
            <dd class="text-text-contrast">{v}</dd>
          </>
        ))}
      </dl>
      <button type="button" class="btn btn-sm mt-3" disabled>{uiMoment.button}</button>
    </div>
  </figure>
</section>
```

- [ ] **Step 3: Wire into page and init tabs**

Add import + `<AgentsDeepDive />` inside `<main>` after `<CapabilityBands />` (with an `hr.dot-fill` before it), and extend the page `<script>`:

```astro
<script>
  import { initCopy } from '../scripts/copy';
  import { initNav } from '../scripts/nav';
  import { initTabs } from '../scripts/tabs';
  import { initTheme } from '../scripts/theme';
  initCopy();
  initNav();
  initTabs();
  initTheme();
</script>
```

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: exit 0; `dist/index.html` contains `role="tab"` × 3, `role="tabpanel"` × 3, `mcpServers`, `refs/heads/agent/*`, and `Illustrative — lease issuance drawer`.

- [ ] **Step 5: Commit**

```bash
git add -A src
git commit -m "feat(landing): agents deep-dive — MCP connect, leases, review tabs"
```

---

### Task 9: Architecture ASCII diagram + endpoint table

**Files:**
- Create: `src/components/ArchitectureDiagram.astro`
- Create: `src/components/EndpointTable.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `landing.architecture`, `landing.endpoints` (Task 3)
- Produces: `<ArchitectureDiagram />` (three `<pre>` variants: `ascii-sm` visible <640, `ascii-md` 640–1023, `ascii-lg` ≥1024 — visibility via Tailwind `sm:hidden` / `hidden sm:inline-block md:hidden` / `hidden md:inline-block` on the `<pre>` elements), `<EndpointTable />`

- [ ] **Step 1: Write `src/components/ArchitectureDiagram.astro` with the three exact ASCII variants**

```astro
---
import { landing } from '../content/landing';
const { architecture } = landing;
---

<section id={architecture.id} class="mt-6">
  <h2><a href={`#${architecture.id}`}>{architecture.title}</a></h2>
  <p>{architecture.caption}</p>

  <pre class="ascii-sm mb-6 sm:hidden" aria-label="exist.io architecture diagram, compact">{`clients · agents · automation
  git :8080     git :2222     agents :8080/mcp
  lfs           web ui :3000  idp oidc/saml
  terraform     scim 2.0

            |
            v

existd daemon  (pure go · zero cgo)
  gateway · ssh · smart-http · lfs cas
  signatures · mcp (35 tools) · rest (119)
  federation · policy · merge

            |
            v

hermetic local storage
  sqlite wal      bare git repos     lfs cas
  metadata        go-git v6          sha-256`}</pre>

  <pre class="ascii-md mb-6 hidden sm:inline-block md:hidden" aria-label="exist.io architecture diagram, standard">{`┌──────────────────────────────────────────────┐
│ CLIENTS · AGENTS · AUTOMATION                │
│  git :8080    git :2222    agents /mcp      │
│  lfs          ui :3000     idp oidc/saml    │
│  terraform    scim 2.0                       │
└──────────────────────────────────────────────┘
                    │
                    v
┌──────────────────────────────────────────────┐
│ EXISTD DAEMON  (pure go · zero cgo)          │
│ gateway :8080 · ssh :2222 · smart-http       │
│ lfs cas · signatures · mcp 35 tools          │
│ rest 119 · federation · policy · merge       │
└──────────────────────────────────────────────┘
                    │
                    v
┌──────────────────────────────────────────────┐
│ HERMETIC LOCAL STORAGE                       │
│ sqlite wal · bare git repos · lfs cas        │
└──────────────────────────────────────────────┘`}</pre>

  <pre class="ascii-lg mb-6 hidden md:inline-block" aria-label="exist.io architecture diagram, detailed">{`┌────────────────────────────────────────────────────────────────┐
│ CLIENTS · AGENTS · AUTOMATION                                  │
│  git (smart-http :8080)   git (ssh :2222)   ai agents (mcp)   │
│  git lfs                  web ui (:3000)    idp (oidc/saml)    │
│  terraform / helm         scim 2.0 sync                      │
└────────────────────────────────────────────────────────────────┘
                              │
                              v
┌────────────────────────────────────────────────────────────────┐
│ EXISTD DAEMON  (pure go · zero cgo · single binary)            │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────────────────┐ │
│ │ http gateway │ │ pure-go ssh  │ │ signature engine         │ │
│ │ :8080        │ │ :2222        │ │ openssh sigspec · gpg    │ │
│ └──────────────┘ └──────────────┘ └──────────────────────────┘ │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────────────────┐ │
│ │ smart-http   │ │ lfs cas      │ │ mcp json-rpc  (35 tools) │ │
│ │ transport    │ │ engine       │ │ /mcp · /mcp/readonly     │ │
│ └──────────────┘ └──────────────┘ └──────────────────────────┘ │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────────────────┐ │
│ │ rest api     │ │ federation   │ │ policy engine            │ │
│ │ /v1/origin   │ │ scim · sso   │ │ merge · rulesets · cidr  │ │
│ │ 119 ops      │ │              │ │                          │ │
│ └──────────────┘ └──────────────┘ └──────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
                              │
                              v
┌────────────────────────────────────────────────────────────────┐
│ HERMETIC LOCAL STORAGE                                         │
│ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐ │
│ │ sqlite wal       │ │ bare git repos   │ │ lfs content-     │ │
│ │ metadata · grants│ │ go-git v6        │ │ addressable      │ │
│ │ prs · rules · sso│ │ packfiles · refs │ │ sha-256 cas      │ │
│ └──────────────────┘ └──────────────────┘ └──────────────────┘ │
└────────────────────────────────────────────────────────────────┘`}</pre>
</section>
```

(Trailing spaces inside the `<pre>` blocks are intentional padding — preserve them when editing.)

- [ ] **Step 2: Write `src/components/EndpointTable.astro`**

```astro
---
import { landing } from '../content/landing';
const { endpoints } = landing;
---

<section class="mt-6">
  <h3>{endpoints.title}</h3>
  <div class="grid grid-cols-1 gap-0 md:grid-cols-2">
    {endpoints.rows.map((row) => (
      <div class="wall-cell h-auto! flex-wrap items-center gap-3 p-3 text-left">
        <code class="whitespace-nowrap text-text-contrast">{row.path}</code>
        <span class="text-text-secondary">{row.proto}</span>
        <span class="text-text-primary">{row.desc}</span>
      </div>
    ))}
  </div>
</section>
```

- [ ] **Step 3: Wire into page**

Add `<ArchitectureDiagram />` and `<EndpointTable />` inside `<main>` after `<AgentsDeepDive />`.

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: exit 0; `dist/index.html` contains `EXISTD DAEMON`, `/mcp/readonly`, `119 ops`, all three `<pre>` variants (`ascii-sm`, `ascii-md`, `ascii-lg`), and 11 endpoint rows (`/healthz` count = 1).

- [ ] **Step 5: Commit**

```bash
git add -A src
git commit -m "feat(landing): ascii architecture diagram and endpoint table"
```

---

### Task 10: Proof, roadmap, quickstart, footer — final composition

**Files:**
- Create: `src/components/ProofRoadmap.astro`
- Create: `src/components/Quickstart.astro`
- Create: `src/components/SiteFooter.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `landing.proof`, `landing.quickstart`, `landing.footer`, `landing.terminal.buttonLabel` (Task 3)
- Produces: `<ProofRoadmap />`, `<Quickstart />` (id `quickstart`, second copy button bound to `#agent-prompt` / `#copy-status`), `<SiteFooter />`; final `src/pages/index.astro` composition

- [ ] **Step 1: Write `src/components/ProofRoadmap.astro`**

```astro
---
import { landing } from '../content/landing';
const { proof } = landing;
---

<section id={proof.id} class="mt-6">
  <h2><a href={`#${proof.id}`}>{proof.title}</a></h2>
  <ul class="prose">
    {proof.points.map((p) => <li>{p}</li>)}
  </ul>
  <hr class="dot-fill" />
  <h3>{proof.roadmapTitle}</h3>
  <ul class="prose">
    {proof.shipped.map((p) => <li>{p}</li>)}
    {proof.next.map((p) => <li>{p}</li>)}
  </ul>
</section>
```

- [ ] **Step 2: Write `src/components/Quickstart.astro`**

```astro
---
import { landing } from '../content/landing';
const { quickstart } = landing;
---

<section id={quickstart.id} class="mt-6">
  <h2><a href={`#${quickstart.id}`}>{quickstart.title}</a></h2>
  <p>{quickstart.intro}</p>
  <pre class="border border-hairline p-3">{quickstart.commands}</pre>
  <p class="text-text-secondary">{quickstart.alt}</p>
  <div class="mt-6 flex flex-wrap items-center gap-3">
    <button
      type="button"
      class="btn"
      data-copy
      data-copy-source="#agent-prompt"
      data-copy-status="#copy-status"
    >{quickstart.primaryLabel}</button>
    <a class="btn btn-outline" href={quickstart.starHref}>{quickstart.starLabel}</a>
    <a class="font-semibold text-text-primary hover:text-accent" href={quickstart.docsHref}>{quickstart.docsLabel}</a>
  </div>
</section>
```

- [ ] **Step 3: Write `src/components/SiteFooter.astro`**

```astro
---
import { landing } from '../content/landing';
const { footer } = landing;
---

<footer class="mt-20 mb-6 px-3 sm:px-5">
  <div class="container mx-auto max-w-7xl">
    <nav aria-label="Footer" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
      {footer.columns.map((col) => (
        <div class="dashed-box p-3">
          <h2 class="mb-2! text-[16px]">{col.title}</h2>
          <ul class="flex flex-col gap-1">
            {col.links.map((link) => (
              <li class="pl-[1ch] indent-[-1ch]">
                <a class="hover:text-text-contrast" href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div class="dashed-box p-3">
        <h2 class="mb-2! text-[16px]">Social</h2>
        <ul class="flex flex-col gap-1">
          {footer.social.map((s) => (
            <li class="pl-[1ch] indent-[-1ch]"><a class="hover:text-text-contrast" href={s.href}>{s.label}</a></li>
          ))}
        </ul>
      </div>
    </nav>
    <p class="mt-6 text-text-secondary">{footer.legal}</p>
  </div>
</footer>
```

- [ ] **Step 4: Final page composition**

`src/pages/index.astro` becomes:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import AnnouncementBar from '../components/AnnouncementBar.astro';
import SiteHeader from '../components/SiteHeader.astro';
import Hero from '../components/Hero.astro';
import CompatibilityWall from '../components/CompatibilityWall.astro';
import CapabilityBands from '../components/CapabilityBands.astro';
import AgentsDeepDive from '../components/AgentsDeepDive.astro';
import ArchitectureDiagram from '../components/ArchitectureDiagram.astro';
import EndpointTable from '../components/EndpointTable.astro';
import ProofRoadmap from '../components/ProofRoadmap.astro';
import Quickstart from '../components/Quickstart.astro';
import SiteFooter from '../components/SiteFooter.astro';
import { landing } from '../content/landing';
import { initCopy } from '../scripts/copy';
import { initNav } from '../scripts/nav';
import { initTabs } from '../scripts/tabs';
import { initTheme } from '../scripts/theme';
import '../styles/global.css';
---

<BaseLayout title={landing.meta.title} description={landing.meta.description}>
  <AnnouncementBar />
  <SiteHeader />
  <main class="container mx-auto mb-6 max-w-7xl px-3 sm:px-5 lg:px-12">
    <Hero />
    <hr class="dot-fill" />
    <CompatibilityWall />
    <hr class="dot-fill" />
    <CapabilityBands />
    <hr class="dot-fill" />
    <AgentsDeepDive />
    <ArchitectureDiagram />
    <EndpointTable />
    <hr class="dot-fill" />
    <ProofRoadmap />
    <Quickstart />
  </main>
  <SiteFooter />
</BaseLayout>

<script>
  import { initCopy } from '../scripts/copy';
  import { initNav } from '../scripts/nav';
  import { initTabs } from '../scripts/tabs';
  import { initTheme } from '../scripts/theme';
  initCopy();
  initNav();
  initTabs();
  initTheme();
</script>
```

- [ ] **Step 5: Verify**

Run: `npm run build && npx astro check`
Expected: exit 0; `dist/index.html` contains `id="quickstart"`, `Apache-2.0 / MIT dual licensed`, `Phase 6 next`, and exactly two `data-copy` buttons.

- [ ] **Step 6: Commit**

```bash
git add -A src
git commit -m "feat(landing): proof, roadmap, quickstart, footer — page complete"
```

---

### Task 11: Claims audit script + full spec §12 verification pass

**Files:**
- Create: `scripts/audit-claims.mjs`
- Create: `README.md`

**Interfaces:**
- Consumes: built `dist/index.html`
- Produces: `node scripts/audit-claims.mjs` — exits non-zero listing any missing required claim or present forbidden string

- [ ] **Step 1: Write `scripts/audit-claims.mjs`**

```js
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
```

- [ ] **Step 2: Run the audit**

Run: `npm run build && node scripts/audit-claims.mjs`
Expected: `claims audit passed — 12 claims verified`

- [ ] **Step 3: Write `README.md`**

```markdown
# exist.io landing page

Marketing site for exist.io — an open-source, self-hosted Git forge for people and coding agents.

- Design spec: `docs/superpowers/specs/2026-10-15-exist-io-landing-design.md`
- PlanetScale extraction reference: `docs/superpowers/specs/2026-10-15-planetscale-homepage-reference.md`

## Develop

    npm install
    npm run dev        # http://localhost:4321
    npm run build      # static output in dist/
    npm run preview    # serve the build
    npm run check      # astro check (types)

## Content

All copy and claims live in `src/content/landing.ts`. Every number on the
page is verified by `node scripts/audit-claims.mjs` (run after `npm run build`)
against the exist.io repository sources. Re-run the audit after any copy change.

## Deploy

Static output in `dist/`. For a subpath deploy (e.g. GitHub Pages project
site), set `base` in `astro.config.mjs` before building.
```

- [ ] **Step 4: Full verification pass (spec §12)**

Run each and confirm:

1. `npm run build` → exit 0, no warnings.
2. `node scripts/audit-claims.mjs` → 12 claims verified.
3. Responsive: `grep -c 'wall-cell' dist/index.html` → 14 wall + 24 band + 11 endpoint cells across `grid-cols-2 … md:grid-cols-5` / `md:grid-cols-3` / `md:grid-cols-2` classes.
4. Keyboard/aria: `grep -c 'aria-selected' dist/index.html` ≥ 4; `grep -c 'aria-live="polite"' dist/index.html` ≥ 1; `grep -c 'aria-expanded' dist/index.html` = 2.
5. Theme: `grep -c 'data-theme="dark"' dist/index.html` ≥ 1; no-flash script present (`localStorage.getItem("exist-theme")`).
6. Reduced motion guard compiled into CSS: `grep -c "prefers-reduced-motion" dist/index.html` ≥ 1.
7. Weight: `du -sh dist` reported; flag if > 150KB total.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore(landing): claims audit script, README, verification pass"
```

---

## Self-Review Results

**1. Spec coverage** — announcement (§4.1 → Task 4), header incl. theme toggle (§4.2/§7 → Task 4), hero + terminal (§4.3 → Task 5), compatibility wall (§4.4 → Task 6), capability bands (§4.5 → Task 7), agents deep-dive incl. UI-moment slot (§4.6 → Task 8), architecture + endpoints (§4.7 → Task 9), proof/roadmap/quickstart/footer (§4.8/§4.9 → Task 10), token layer + deviations (§3 → Task 2), stack (§6 → Tasks 1–2), responsive/a11y/motion (§7 → Task 2 CSS + Tasks 4/8 aria + Task 11 checks), claims audit (§8/§12 → Task 11), brand mark O1 (→ Task 4 favicon), tool count 35 (→ Tasks 3/11). Extensibility slots (§9) preserved: UI-moment figure (Task 8) is a fixed bordered frame, swappable for real screenshots later.

**2. Placeholder scan** — none. All component code, CSS, content, and scripts are complete and exact.

**3. Type consistency** — `initNav`/`initTabs`/`initCopy`/`initTheme` names consistent across Tasks 4/5/8/10; `data-copy-source`/`data-copy-status`/`data-copied-label` attributes consistent between `copy.ts` and both copy buttons (Tasks 5/10); section ids `capabilities/transports/security/enterprise/agents/architecture/proof/quickstart` defined once in `landing.ts` and referenced by nav hrefs; tab selected styling uses Tailwind v4 `data-selected:` variants (not static classes) so JS switching restyles correctly.

**Execution handoff** — per the user's instruction ("go for plan and then starting working on it"), proceeding with **inline execution** of Tasks 1–11 in this session, committing after each task.
