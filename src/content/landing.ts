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
      { name: "Git", logo: "git" },
      { name: "SSH", logo: null },
      { name: "OpenSSH", logo: null },
      { name: "GPG", logo: "gnupg" },
      { name: "Git LFS", logo: "gitlfs" },
      { name: "SQLite", logo: "sqlite" },
      { name: "OIDC", logo: "openid" },
      { name: "SAML", logo: null },
      { name: "SCIM 2.0", logo: null },
      { name: "MCP", logo: "modelcontextprotocol" },
      { name: "Terraform", logo: "terraform" },
      { name: "Helm", logo: "helm" },
      { name: "Kubernetes", logo: "kubernetes" },
      { name: "Prometheus", logo: "prometheus" },
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
