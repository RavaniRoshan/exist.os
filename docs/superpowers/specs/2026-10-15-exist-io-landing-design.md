# exist.io Landing Page — Design Spec

- **Date:** 2026-10-15
- **Status:** Approved for implementation planning
- **Stack (decided):** Astro + Tailwind v4, static output, vanilla JS for interactions, zero webfonts
- **Design reference:** `docs/superpowers/specs/2026-10-15-planetscale-homepage-reference.md` (extraction of planetscale.com, captured 2026-10-15). This spec cites it as "the reference"; its section numbers (§) are used below.

---

## 1. Goal

A single-page marketing site for **exist.io** — an open-source, self-hosted, agent-native Git forge — that a skeptical infrastructure engineer can evaluate in 60 seconds and then either star the repo or paste the setup prompt into their coding agent.

**Success criteria**

1. A first-time visitor can state what exist.io is and who it's for within 10 seconds of the hero.
2. Primary conversion: copy the agent-setup prompt (tracked via copy-button event). Secondary conversions: GitHub star click, docs click.
3. Every factual claim on the page traces to the exist.io repository (README / AGENTS.md / ROADMAP). Audit checklist in §8; no fabricated benchmarks, user counts, or logos.
4. The page itself demonstrates the product thesis: it is stark, technical, text-first, and agent-oriented — no stock photography, no gradient hero, no marketing fluff.

## 2. Positioning & audience

- **Primary audience:** agent developers and engineering teams running coding agents (Claude Code, Cursor, Cline).
- **Secondary audience:** platform/infra teams evaluating self-hosted alternatives to GitHub Enterprise or Gitea.
- **Message spine:** Git platforms were built 15+ years ago for humans clicking in browsers. exist.io is the forge where humans *and* agents hold first-class permissions — self-hosted, enterprise-ready, one pure-Go binary.
- **Register:** declarative, engineering-led, PlanetScale voice ("the tech speaks for itself"). No adjectives without numbers behind them.

## 3. Design language

Adopted wholesale from the reference (§0–§9), then adapted as below.

### 3.1 Adopted as-is

- All-monospace document. One system mono stack, **no webfonts**: `ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace`.
- Base: 16px / 24px line height. Hierarchy carried **only** by weight (400/500/600/700) and color tokens — never by size (reference §2).
- Flat canvas: `#fafafa` light / `#111111` dark. No background image, gradient, glow, shadow, or rounded corners anywhere (reference §1, §9).
- 1px solid `#414141` wireframe borders as the primary structural device; `margin: -0.5px` on grid cells to collapse adjacent borders into a single wireframe grid (reference §1, §9).
- Dashed borders via the four-gradient `.dashed-box` utility (footer columns, mobile menu panel) (reference §3b).
- `hr.dot-fill` section separators: 16px-tall element whose `:before` holds 115 literal `.` characters (reference §1, §3b).
- Hanging-rule headings: 2px accent rule offset 16px left of the text (`margin-left: -16px; border-left: 2px; padding-left: 16px; text-indent: -2px`) (reference §3d).
- Bullet lists use a literal `* ` marker, not discs (reference §3d).
- 1ch hanging indents on footer links (reference §1).
- ASCII diagrams are first-class content in `<pre>`, three responsive width variants, box-drawing characters preserved (reference §6b).
- Static (non-sticky) 32px header that scrolls away; pipe-separated nav with two dropdowns; mobile nav as native `<details>` + dashed-box panel (reference §4).
- Motion limited to hover transitions, chevron rotation, popover open/close; `prefers-reduced-motion` guard (reference §7).
- Structure echoes: H1 + three lead paragraphs + hero visual + proof wall; tabbed product panels; anchor sections separated by dot-fill rules; dashed-box footer columns (reference §5, §6, ordering recap).

### 3.2 Adaptations (deviations, deliberate)

1. **Dark-first.** The reference builds light-first with a dark variant. We invert: dark canvas (`#111111`) is the default, light (`#fafafa`) via a toggle persisted in `localStorage`. Same component logic both themes.
2. **Accent = brand green.** The repo's docs site establishes `#2D6A57` (light) / `#76B49A` (dark). Green replaces orange `#f35815` in every structural slot: H1 hanging rule, `.btn` fill, `.btn-outline` border, dropdown panel borders, group headings, hover states. Prose links use the accent instead of `#0b6ec5`.
3. **Hero visual = terminal card.** PlanetScale's hero visual slot is its customer logo wall; ours is a terminal-styled card containing the copy-ready agent-setup prompt (§5). One new component, built from the existing vocabulary: 1px border, no shadow, no radius, header row (dots + title + copy button), body with accent-tinted command spans.
4. **Compatibility wall replaces the logo wall.** The 80-cell customer wall becomes a wireframe grid of the protocols and tools exist.io speaks — text wordmarks in mono, no fake logos: Git, SSH, OpenSSH, GPG, Git LFS, SQLite, OIDC, SAML, SCIM 2.0, MCP, Terraform, Helm, Kubernetes, Prometheus.
5. **Architecture diagram is exist.io's own.** The reference's VTGate diagram slots become an ASCII rendering of exist.io's architecture (converted from the README mermaid diagram): Clients → existd daemon → Hermetic storage.

### 3.3 Token layer (dark default shown; light in parentheses)

| Token | Dark | Light | Role |
|---|---|---|---|
| `--bg-canvas` | `#111111` | `#fafafa` | page, header, `<pre>` |
| `--text-primary` | `#ebebeb` | `#414141` | body, nav |
| `--text-secondary` | `#a1a1a1` | `#737373` | attributions, captions |
| `--text-contrast` | `#ffffff` | `#000000` | H1, hover |
| `--text-decoration` | `#616161` | `#c1c1c1` | pipe separators |
| `--border` | `#414141` | `#414141` | all 1px borders |
| `--accent` | `#76B49A` | `#2D6A57` | H1 rule, buttons, focus |
| `--code-bg` | `#1a1a1a` | `#ebebeb` | inline `code`, chips |
| `--accent-on` | `#111111` | `#fafafa` | text on accent fills |

Buttons: `.btn` 40px, accent fill, `--accent-on` text, weight 600. `.btn-outline` 2px accent border, transparent. Focus ring: 1px accent + offset.

## 4. Page architecture

One page, eight beats, in this order.

### 4.1 Announcement bar
Full-width strip: flat accent fill (`--accent` bg, `--accent-on` text), 16px mono, 8px vertical padding, link underlined on hover:
> `v0.4 shipped — Primer UI parity, autonomous PR review, capability leases.` → link to GitHub Releases.

### 4.2 Header (static, 32px at ≥1280)
Logo mark (∃ — O1 resolved) · pipe-separated nav:
- `Platform ▾` (dropdown): For agents (MCP · Leases · Review) / For teams (PRs · Issues · Releases) / Enterprise (SSO · SCIM · IaC)
- `Resources ▾` (dropdown): GitHub · Documentation · Roadmap · AGENTS.md
- Direct: `Documentation` · `Roadmap`
- Auth cluster: `★ Star` (`.btn-outline`), `Deploy` (`.btn`, → #quickstart)
- Mobile: native `<details>` "Navigation" with dashed-box panel, same items.

Dropdowns: click to open, `aria-expanded`, one open at a time, Escape + outside-click close.

### 4.3 Hero
- **H1** (hanging green rule): "The self-hosted forge for the age of coding agents."
- **Lead ¶1** — what it is: "exist.io is an open-source Git forge that runs entirely on infrastructure you control — one pure-Go binary, SQLite storage, no cloud dependency, no external services to babysit."
- **Lead ¶2** — the differentiator: "It treats coding agents as first-class citizens: a native MCP server with 35 tools, scoped capability leases, and autonomous pull-request review. Humans and agents hold real permissions — the agent gets a lease, not the keys to the kingdom."
- **Lead ¶3** — enterprise-ready: "OIDC and SAML single sign-on, SCIM 2.0 provisioning, OpenSSH and GPG commit verification, and official Terraform and Helm deployments — wire-compatible with the forge APIs your tooling already speaks."
- **Terminal card** (§5 copy): title "One prompt. Your agent does the rest."; caption below card: "Works with Claude Code, Cursor, and Cline — anything that speaks MCP."
- **Spec strip** (mono, secondary): `119 REST operations · 35 MCP tools · 25 Go packages at 100% test pass · 137 frontend tests · Git LFS · SSH :2222 · zero cgo`

### 4.4 Compatibility wall
1px wireframe grid (2 cols <768, 5 cols ≥768; reference §5c geometry), cells hold mono wordmarks:
Git · SSH · OpenSSH · GPG · Git LFS · SQLite · OIDC · SAML · SCIM 2.0 · MCP · Terraform · Helm · Kubernetes · Prometheus

### 4.5 Capability bands
Four sections, each: H2 + one intro sentence + wireframe cell grid (name / one-liner / mono detail). Dot-fill rules between.

1. **For your team** — Pull requests & deterministic 3-way merge engine (squash, gates, merge queues) · Issues & threaded discussions (SQLite-backed, agent triage) · Releases with checksums · Webhooks with HMAC-SHA256 signing · GitHub Primer-parity UI · 52-week contribution heatmaps
2. **Transports & storage** — Smart-HTTP on `:8080` · Embedded pure-Go SSH on `:2222` (no OpenSSH daemon) · Git LFS v1 CAS with file locking (`/info/lfs/locks`) · SQLite WAL metadata + bare go-git repositories · Zero cgo across linux/amd64, linux/arm64, darwin/arm64, windows/amd64
3. **Security & verification** — OpenSSH SIGSPEC + GPG (RFC 4880) signature parsing · Pre-receive hook with secret scanning · Rulesets: approvals, required checks, CIDR allowlists, SSH CAs · Immutable audit log · Archived repos frozen read-only
4. **Enterprise identity & IaC** — OIDC & SAML 2.0 SSO · SCIM 2.0 (RFC 7644) provisioning & offboarding · Terraform/OpenTofu provider · Kubernetes Helm chart · Prometheus ServiceMonitor · Non-root security contexts

### 4.6 Agents deep-dive (tabbed panel, reference §6a pattern)
Three tabs, inverted selected state (`#fafafa` bg / `#111` text in dark theme; inverted in light):

- **Connect** — "Point your agent at the forge." Client config JSON blocks for Claude Code / Cursor / Cline (from README), showing `http://localhost:8080/mcp` and the read-only sandbox `/mcp/readonly`. Note: mutations on the sandbox are blocked at the protocol layer.
- **Leases** — "Permissions, not passwords." Ephemeral HMAC-SHA256 capability tokens, isolated to `refs/heads/agent/*`, auto-expiring. Mono block: lease issuance via CLI + verification on every push.
- **Review** — "The reviewer that never sleeps." Autonomous PR review: diff inspection, leaked-secret detection, test-coverage evaluation, check-run reporting. **UI-moment slot:** fixed-aspect bordered frame holding an illustrative mock of the capability-lease issuance drawer (Approach A; spec §9 reserves this slot for real screenshots later).

### 4.7 Architecture (ASCII + endpoint table)
- ASCII diagram in `<pre>`, three responsive variants (12px/16px/20px per reference §6b): Clients (Git CLI, LFS, agents, IdP, IaC, Web UI) → existd daemon (gateway, SSH, Smart-HTTP, LFS engine, signatures, MCP, REST, federation, policy) → Hermetic storage (SQLite WAL, bare repos, LFS CAS). Converted from the README mermaid source; trailing spaces preserved.
- Endpoint table (mono wireframe grid, from README): `:3000` Web UI · `:2222` SSH · `:8080` Smart-HTTP / LFS / REST `/v1/origin` / SCIM `/scim/v2/Users` / SSO `/api/v1/auth/sso/*` / MCP `/mcp` + `/mcp/readonly` / `/metrics` / `/healthz`.

### 4.8 Proof & quickstart
- **Built clean** — 25 Go packages at 100% test pass; 137 Vitest tests across 37 suites; `CGO_ENABLED=0` builds verified on four platforms; the zero-mock-data production invariant (demo fixtures are gated off in production — the product refuses to fake its own UI, and so does this page).
- **Honest roadmap** — dot-fill rule, then: Phases 1–5 shipped (core forge & MCP, enterprise protocols & IaC, Space UI, agent review & leases, Primer parity); Phase 6 (multi-region Raft replication, S3 object sharding) next.
- **Quickstart** — the three README commands verbatim (build, bootstrap, start) as the manual path, one sentence: "Or skip the manual path — hand the prompt at the top of this page to your agent."
- Final CTA row: `Copy prompt` (`.btn`) · `★ Star on GitHub` (`.btn-outline`) · `Read the docs`.

### 4.9 Footer
Dashed-box columns (reference footer pattern): **Project** (GitHub, Releases, Roadmap, License) · **Docs** (Documentation, AGENTS.md, Architecture manual) · **Protocols** (MCP, SCIM 2.0, SSH, Git LFS) · **Community** (Issues, Discussions, Contributing). Legal row: "Apache-2.0 / MIT dual licensed · © 2026 exist.io contributors". Social row: GitHub only (no accounts exist elsewhere — honesty rule).

## 5. Agent-setup prompt (final copy)

Card title: **"One prompt. Your agent does the rest."**

```text
Bootstrap a self-hosted exist.io forge on this machine:
1. Download the latest existd release binary for this platform.
2. Run: existd bootstrap --email <you@example.com> --namespace <org>
3. Start the daemon (HTTP :8080, SSH :2222).
4. Create my first repository and give me the clone URL.
5. Register yourself as an MCP client at http://localhost:8080/mcp
   and verify the connection works.
Confirm each step before running the next, and tell me when it's done.
```

Card caption: "Works with Claude Code, Cursor, and Cline — anything that speaks MCP." Copy button label: `Copy prompt`; copied state: `Copied ✓` (announced via `aria-live`).

## 6. Technical architecture

- **Astro + Tailwind v4**, static output (`astro build`). Zero client JS by default; all interactions are small vanilla `<script>` blocks inside `.astro` components (~200 lines total).
- **Token layer → Tailwind v4 `@theme`**: reference §3 tokens become `--color-*` theme variables exactly once; both themes defined via a `[data-theme]` attribute on `<html>` (dark default).
- **Content governance:** single typed module `src/content/landing.ts` holding every string and claim. Section components read from it; copy edits never touch layout. §8 claims audit runs against this file.
- **JS surface (mirrors reference §7):** header dropdowns · native `<details>` mobile nav · tab switcher · copy-to-clipboard with state · theme toggle with `localStorage` · anchor-link scrolling. Nothing else.
- **Assets:** inline SVG marks only (logo mark O1, protocol wordmarks are text). No image files, no webfonts.
- **Deploy:** static output to GitHub Pages (path-based, can coexist with the existing Blume docs site) or any static host. Final host chosen in the implementation plan.

## 7. Behavior

- **Responsive** (reference §8 measured ladder): gutters 24/40/96px at <640/640+/1024+; wall 2→5 columns; tab bar 1→3 columns (171px→57px); header 80→72→32px; announcement bar 64→40px. Verify at 375/768/1280/1536.
- **Accessibility:** `aria-label="Go to homepage"` on logo; `aria-label="Main"` on nav; `role="presentation"` on pipe separators; dropdown triggers with `aria-expanded`; tabs as `tablist`/`tab`/`tabpanel` with arrow-key navigation; visible 1px accent focus rings; ASCII `<pre>` gets an `aria-label` summary; copy confirmation via `aria-live="polite"`; headings in document order.
- **Theme:** default dark; toggle persists to `localStorage`; no OS-preference override (brand-forward decision; documented so it can be revisited).
- **Motion:** hover transitions only (color/background/border, opacity for wall CTAs, chevron rotate, popover open/close); global `prefers-reduced-motion: reduce` guard per reference §7.

## 8. Claims audit (ship gate)

Every number on the page must match these sources at ship time; re-verify after any copy edit.

| Claim | Source |
|---|---|
| 119 REST operations | README (endpoint table, "forge REST API (119 operations)"); AGENTS.md |
| 35 MCP tools | `internal/mcp/tools.go` `BuiltinTools()` — entries 1–35, verified 2026-10-15. README intro agrees ("35 specialized tools"); AGENTS.md §3 and the README endpoint table still say 34 — stale docs, upstream fix pending (O2). |
| 25 Go packages at 100% test pass | AGENTS.md §5; ROADMAP Phase 5 |
| 137 Vitest tests / 37 suites | AGENTS.md §5 ("37 suites, 137 tests"); ROADMAP Phase 5 |
| `CGO_ENABLED=0`, 4 platforms | AGENTS.md invariant 3 |
| Ports :8080 / :2222 / :3000 | README endpoints table |
| LFS locks `/info/lfs/locks` | AGENTS.md §1 |
| SCIM 2.0 RFC 7643/7644, OIDC, SAML 2.0 | README core capabilities |
| OpenSSH SIGSPEC + GPG RFC 4880 | README / AGENTS.md |
| Phase 1–5 complete; Phase 6 = Raft replication, S3 sharding | ROADMAP.md |
| Apache-2.0 / MIT | README license section |
| "35 tools" fix | O2 |

## 9. Extensibility

- **UI-moment slot** (Review tab): built as a fixed-aspect bordered frame in v1 holding an illustrative mock; swaps to real product screenshots later (Approach B) with no layout change.
- **Testimonial band:** not built. When real users exist, the reserved slot is between §4.4 and §4.5, reusing the blockquote/attribution pattern.
- **Comparison table:** not built. Requires defensible data first (see Non-goals).
- **Additional sections** (benchmarks, changelog teasers) follow the same section component; no architectural change needed.

## 10. Non-goals (YAGNI)

- No blog, changelog, or docs content on the landing page (docs stay in the Blume site).
- No analytics beyond a copy-button event counter (defer provider choice to plan; a simple `data-` event hook is enough).
- No i18n, no CMS, no contact form, no newsletter capture.
- No live-demo embed — standing up a public demo server is a separate infrastructure decision.
- No dark pattern: no cookie banner needed because no tracking ships.

## 11. Open items & risks

- **O1 — Brand mark (resolved):** the **∃ mark** (existential quantifier — "there exists"). Delivered as a 32×32 inline SVG, `currentColor`, 40×40 viewBox: a stroked ∃ glyph, optionally inside a 1px sharp-cornered square frame. Must remain legible at 16px (favicon). Used in the header (links home); not used in the announcement bar.
- **O2 — Tool-count staleness (resolved):** code defines **35** tools (`internal/mcp/tools.go`, verified 2026-10-15); AGENTS.md and the README endpoint table say 34 — stale. The page says 35. Upstream doc fix is a separate follow-up outside this project.
- **O3 — Prompt accuracy:** the bootstrap command and ports in §5 must stay in sync with the binary's CLI as it evolves; claims audit covers it.
- **O4 — Green contrast:** `#2D6A57` on `#fafafa` and `#76B49A` on `#111111` verified AA for text; button pairs verified at build.
- **Risk — claims drift:** numbers age (test counts grow). Mitigation: single content module + audit checklist + re-audit on any copy change.
- **Risk — tone:** the declarative voice can tip into arrogance; copy review pass in the plan checks every sentence against "would an engineer believe this?"

## 12. Verification (definition of done)

1. `npm run build` (Astro) passes with zero errors/warnings; statically served page has zero console errors.
2. Claims audit (§8) executed and signed — every number on the page matched to a source.
3. Responsive spot-check at 375/768/1280/1536: wall columns, tab bar stacking, header height, gutter widths match the ladder.
4. Keyboard pass: tab arrow-navigation, dropdown Escape/outside-close, all focus rings visible, `<details>` menu operable.
5. Copy button: clipboard contains the exact prompt; "Copied" state renders and is announced.
6. Theme toggle: flips themes, persists across reload, no flash of wrong theme on load (inline head script sets `data-theme` before paint).
7. `prefers-reduced-motion: reduce`: no transitions fire.
8. Page weight < 150KB total (HTML+CSS+JS), no layout shift on load.
9. Lighthouse-style a11y score ≥ 95 on the built page.
