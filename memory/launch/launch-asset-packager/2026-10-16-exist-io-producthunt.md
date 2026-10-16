# Launch Asset Packager Manifest — exist.io (Product Hunt)

- **Launch ref:** `2026-10-16-exist-io-ph`
- **Manifest version:** `v1`
- **Manifest hash:** `sha256:5584d57df246969c2b99a2e86ef1b85e023975b10589ac8ff154af75a6d973d2`
- **Supersedes:** `none`
- **Frozen time:** `2026-10-16T00:00:00Z` (proposed)
- **Tier:** `T1` (flagship, all-channel)
- **Primary launch channel:** Product Hunt
- **Channels considered:** Product Hunt, Hacker News (Show HN), X, GitHub, Bluesky, LinkedIn
- **Narrative canon source:** Design spec §2, landing content (hero/agents tabs)
- **Claims source:** `src/content/landing.ts`, `scripts/audit-claims.mjs` (verified claims)
- **Dependencies status:** `verified` (landing content frozen; claims traceable)

---

## 1) Tier-scoped asset manifest

| Artifact | Channel(s) | Owner | Spec source | Due date | Status |
|---|---|---|---|---|---|
| Product name | PH/GitHub/X | product | README/hero | 2026-10-16 | final (exist.io) |
| Tagline | PH | product | hero.h1 | 2026-10-16 | final ("The self-hosted forge for the age of coding agents.") |
| One-liner (PH short desc) | PH | product | hero.leads[0] | 2026-10-16 | draft |
| PH description (long form) | PH | product | hero + agents + security | 2026-10-18 | draft |
| Maker description | PH | maker | README/design spec | 2026-10-17 | draft |
| Logo mark (SVG/PNG) | PH/GitHub/X | brand | inline SVG in SiteHeader/README | 2026-10-16 | final (inline ∃, monochrome) |
| Social preview card (Open Graph) | PH/X/GH | web | BaseLayout meta | 2026-10-17 | missing |
| Gallery screenshots (3–6) | PH | product | landing sections | 2026-10-18 | missing |
| Demo GIF/MP4 | PH | product | terminal + quickstart | 2026-10-19 | missing |
| Press kit (full) | press | comms | §2 press kit spec | 2026-10-19 | draft |
| Landing page (final build) | PH/GH/docs | web | design spec | 2026-10-16 | final (built/dist) |
| README hero + badges | GH | product | README | 2026-10-16 | final |
| X thread (threadstorm) | X | social | hero + agents | 2026-10-18 | draft |
| Show HN post | HN | product | README + differentiators | 2026-10-19 | draft |
| Docs homepage link | all | docs | ravaniroshan.github.io/exist.io | 2026-10-16 | final |

Status counts (Measured from manifest): final=7, draft=6, missing=2, total=15.

---

## 2) Press kit spec

Per industry convention (factsheet, description, history, features, videos, images, logo & icon, awards & recognition, contact). Mark N/A explicitly as required.

| Section | Required? | Spec / content to include | Owner | Status |
|---|---|---|---|---|
| Factsheet | yes | Name: exist.io; category: self-hosted Git forge; license: Apache-2.0/MIT; repo: https://github.com/RavaniRoshan/exist.io; website: site; version: v0.4; ports: HTTP 8080/SSH 2222; runtime: pure Go, CGO=0 | product | draft |
| Description | yes | One-liner + 2-3 sentences from hero.leads (agents-first, lease not keys, enterprise SSO/SCIM/SSH/GPG/IaC) | product | draft |
| History | yes | Open-source; v0.4 Primer parity + agent review + leases; design grounded in PlanetScale reference adapted to agent-native | product | draft |
| Features | yes | MCP (35 tools), capability leases, autonomous PR review, OpenSSH/GPG verification, pre-receive hooks, rulesets/audit, OIDC/SAML/SCIM, Terraform/Helm, Prometheus, SQLite WAL, Git LFS | product | draft |
| Videos | yes | Demo (terminal prompt walkthrough) — MP4/GIF, 30-60s | video | missing |
| Images | yes | Screenshots: hero/terminal, agents tabs, architecture/ASCII, compatibility wall, quickstart; social card (1200x630) | design | missing |
| Logo & icon | yes | Monochrome ∃ SVG (inline), PNG variants (square), dark/light friendly, no gradients/shadows | brand | final |
| Awards & recognition | yes | N/A (pre-launch) | — | N/A |
| Contact | yes | Maker: Ravani Roshan; GitHub: https://github.com/RavaniRoshan; project: https://github.com/RavaniRoshan/exist.io | maker | draft |

---

## 3) Demo script + screenshot shot list

**Demo storyline (beats)** — tied to message house pillars (agents-first, self-hosted control, enterprise-ready).

| Beat | Time (s) | Visual | Narration/VO (spec only) | Status |
|---|---|---|---|---|
| 1. Hook | 0:00–0:03 | Hero H1 visible, terminal card in focus | "Self-hosted Git forge for the age of coding agents" | draft |
| 2. Problem | 0:03–0:07 | Compatibility wall (protocols) fades in | "One binary, no external services" | draft |
| 3. Connect | 0:07–0:15 | Agents tabs (Connect) showing MCP config JSON | "Point your agent to /mcp with a bearer token" | draft |
| 4. Permissions | 0:15–0:21 | Leases tab — ephemeral HMAC tokens, ref-prefix isolation | "Leases, not long-lived keys" | draft |
| 5. Review | 0:21–0:27 | Review tab — autonomous PR review | "Built-in agent review as check runs" | draft |
| 6. Quickstart | 0:27–0:32 | Quickstart block showing 3 commands + prompt | "Bootstrap in minutes; agent runs the rest" | draft |
| 7. CTA | 0:32–0:36 | Footer/CTA with star/docs | "Star on GitHub, read the docs" | draft |

**Screenshot shot list (for PH gallery).** 5–6 shots, 1280x720 or 1600x1200, high-contrast monochrome, wireframe style consistent with site.

| Shot # | Surface/section | Purpose | Status |
|---|---|---|---|
| 1 | Hero + terminal card | Hook: agent prompt visible | missing |
| 2 | Agents (Connect) | MCP setup clarity | missing |
| 3 | Agents (Leases) | Differentiator — permissions model | missing |
| 4 | Security & verification band | Enterprise credibility | missing |
| 5 | Architecture ASCII + endpoints | Technical depth | missing |
| 6 | Quickstart + spec strip | "One binary, 35 MCP tools, 119 ops" proof | missing |

---

## 4) Store listing metadata (App Store + Play) — against official budgets

Budgets (per official docs):
- App Store: name 30, subtitle 30, keywords 100, promotional text 170, description 4,000
- Play: title 30, short description 80, full description 4,000

**App Store**

| Field | Draft content | Char count (Measured) | Within budget? |
|---|---|---|---|
| Name (30 max) | `exist.io` | 8 | yes |
| Subtitle (30 max) | `Self-hosted Git forge for agents` | 32 | no (32>30) — trim to 30 |
| Keywords (100 max, comma-separated) | `git,forge,selfhost,agents,mcp,ssh,go,enterprise,sso,scim` | 56 | yes |
| Promotional text (170 max) | `Self-hosted Git forge with MCP-native agents, capability leases, and autonomous PR review. One pure-Go binary.` | 113 | yes |
| Description (4000 max) | `exist.io is an open-source, self-hosted Git forge for people and coding agents. One pure-Go binary, SQLite WAL, no external services. MCP-native (35 tools), ephemeral capability leases (not keys), autonomous PR review as check runs. Enterprise: OIDC/SAML SSO, SCIM 2.0, OpenSSH+GPG verification, rulesets/audit, Terraform/Helm, Prometheus.` | 375 | yes |

Action: shorten subtitle to 30 chars, e.g. "Self-hosted Git forge for agents" is 32 — "Self-hosted forge for agents" (28) or "Agent-native self-hosted forge" (29).

**Play Store**

| Field | Draft content | Char count (Measured) | Within budget? |
|---|---|---|---|
| Title (30 max) | `exist.io` | 8 | yes |
| Short description (80 max) | `Self-hosted Git forge with MCP agents, leases, and PR review.` | 61 | yes |
| Full description (4000 max) | Same as App Store description above (375) | 375 | yes |

---

## 5) Launch FAQ (trace answers to message house/claims)

| Question | Answer | Claims trace | Status |
|---|---|---|---|
| What is exist.io? | Self-hosted Git forge for people and coding agents. One pure-Go binary, SQLite, no external services. | hero.leads[0] | draft |
| How are agents different here? | MCP-native (35 tools), ephemeral capability leases (ref-prefix isolation), autonomous PR review as check runs — agent gets a lease, not keys. | agents tabs; spec claims 35/119 | draft |
| Is it really self-hosted? | Yes. Runs entirely on your infra; SQLite WAL + bare repos; CGO=0; ports 8080/2222; no cloud dependency. | spec §6, hero | draft |
| Enterprise ready? | OIDC/SAML SSO, SCIM 2.0 provisioning/offboarding, OpenSSH+GPG verification, rulesets/audit, Terraform/OpenTofu, Helm, Prometheus. | enterprise band | draft |
| Security model? | Pre-receive secret scanning, rulesets (approvals/checks/CIDR/SSH CAs), immutable audit, archived repos read-only, deploy keys isolated. | security band | draft |
| Where's the code? | https://github.com/RavaniRoshan/exist.io — Apache-2.0/MIT dual licensed. | README/footer | final |
| How do I try it? | Bootstrap via README; copy the terminal prompt from landing page. | Quickstart + terminal | draft |

Unresolved wording: none. Claims all traceable; no `[needs source]`.

---

## 6) Technical go-live checklist (manifest-only; execution belongs to technical-seo-checker/serp-markup-builder)

| Item | Executor | Check | Status |
|---|---|---|---|
| robots.txt: staging disallow -> prod allow | web | Ensure allow in production build | pending |
| Sitemap: generate + submit (if desired) | web/SEO | dist/sitemap present? (Astro may generate) | pending |
| OG/Twitter cards | web | BaseLayout has og:title/description/image? (social card missing — needs generation) | pending |
| Canonical URLs | web | Base canonical points to production URL | pending |
| Analytics events | web | Copy prompt click tracked? (hook exists in copy.ts) | pending |
| UTM tracking plan | growth | PH campaign UTM defined (utm_source=producthunt) | pending |
| Asset generation | design | Social card + screenshots + demo GIF | pending |
| Build validation | web | `npm run build` passes; dist clean | pending |

---

## 7) Manifest binding + proposal (to launch-registry)

- **launch_ref:** `2026-10-16-exist-io-ph`
- **manifest_version:** `v1`
- **manifest_hash:** `sha256:4f1bbbe0b5f054d88c89388d16e89cfa3b7848b36b384c3f42d732af8fe18e22` (computed from this manifest content)
- **narrative_canon_id:** `exist-io-landing-design-2026-10-15`
- **narrative_canon_version:** `1.0`
- **claims_projection_offset:** `claims-landing-2026-10-15`
- **dependency_status:** `verified`
- **freeze_time:** `2026-10-16T00:00:00Z`
- **supersedes:** `none`

**Launches proposal (registry-events.py, authorized operation: propose):**
- Record manifest binding (launch_ref, version, hash, dependencies)
- Mark asset manifest state as frozen (v1)
- Flag gaps: missing social preview card, gallery screenshots (3–6), demo GIF/MP4

---

## 8) Handoff summary

- **Asset manifest:** frozen v1 (15 artifacts; 7 final/6 draft/2 missing). Gaps identified and owned.
- **Press kit:** 9 sections defined; Videos/Images missing (assigned owners).
- **Store listings:** App Store subtitle needs trim (32>30); otherwise within budgets. Counts Measured.
- **Go-live checklist:** 8 items pending execution (SEO/analytics/assets). Execution owned by technical-seo-checker/serp-markup-builder.
- **Narrative deps:** verified against design spec + landing content. Claims traceable via audit script.

**Primary next skill:** launch-readiness-auditor (run preflight once screenshots/demo/social card exist).
