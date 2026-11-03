export const marketing = {
  meta: {
    title: "exist.io — the self-hosted Git forge built for coding agents",
    description:
      "exist.io is a self-hosted Git forge where coding agents hold scoped capability leases, open pull requests, and merge through policy. One pure-Go binary, no external services.",
  },

  nav: {
    links: [
      { label: "Agents", href: "#agents" },
      { label: "Platform", href: "#platform" },
      { label: "Install", href: "#quickstart" },
      { label: "Docs", href: "https://ravaniroshan.github.io/exist.io/" },
    ],
    github: "https://github.com/RavaniRoshan/exist.io",
    githubLabel: "GitHub",
    installLabel: "Install",
  },

  hero: {
    title: "Your own Git forge.",
    body: "Built for agents. A self-hosted Git forge where coding agents hold scoped leases, open pull requests, and merge through policy.",
    primary: { label: "Install in one command", href: "#quickstart" },
    secondary: { label: "Star on GitHub", href: "https://github.com/RavaniRoshan/exist.io" },
    note: "v0.6.0-beta · Apache-2.0 · pure Go · zero CGO",
    screenshotAlt: "exist.io pull request view with passing checks, reviewers, and the merge gate",
  },

  trust: {
    label: "Runs the protocols you already use.",
    items: [
      "Git",
      "SSH",
      "GPG",
      "Git LFS",
      "MCP",
      "SQLite",
      "OIDC",
      "SCIM 2.0",
      "Terraform",
      "Helm",
      "Kubernetes",
      "Prometheus",
    ],
  },

  pillars: [
    {
      title: "Leases, not keys",
      body: "Agents get short-lived HMAC capability tokens scoped to a ref prefix. Production branches stay untouchable.",
      detail: "refs/heads/agent/*",
    },
    {
      title: "MCP native",
      body: "The same forge speaks Model Context Protocol, with a read-only sandbox for untrusted agents.",
      detail: "/mcp and /mcp/readonly",
    },
    {
      title: "One binary",
      body: "SQLite WAL, bare Git repositories, the web UI, SSH, and HTTP embedded in a single daemon.",
      detail: "no external database",
    },
  ],

  features: [
    {
      id: "agents",
      title: "Permissions, not passwords.",
      body: "An agent requests a lease, clones, pushes to its own ref, opens a pull request, and the lease expires. Every action is scoped, signed, and audited.",
      points: [
        "Ephemeral HMAC-SHA256 capability tokens.",
        "Ref-prefix isolation to refs/heads/agent/*.",
        "Read-only MCP sandbox for untrusted agents.",
      ],
      tone: "tone-steel",
      media: "lease",
    },
    {
      id: "review",
      title: "A reviewer that never sleeps.",
      body: "Every diff is inspected for leaked secrets and missing coverage. Results arrive as check runs, and the merge gate enforces your rulesets before anything lands.",
      points: [
        "Secret and private-key detection before merge.",
        "Rulesets for approvals, checks, and bypass actors.",
        "Auto-merge once every required check passes.",
      ],
      tone: "tone-clay",
      media: "gate",
    },
    {
      id: "architecture",
      title: "One daemon. Three layers.",
      body: "Clients and agents reach existd over HTTP and SSH. Policy and transports run in-process. All state stays on local disk, with no external database and no host SSH daemon.",
      points: [
        "Pure-Go Smart-HTTP and SSH transports.",
        "SQLite WAL metadata and bare Git repositories.",
        "CGO-free builds for Linux, macOS, and Windows.",
      ],
      tone: "tone-moss",
      media: "stack",
    },
  ],

  lease: {
    code: `{
  "agent": "claude-code",
  "repo": "acme/demo",
  "refs": ["refs/heads/agent/*"],
  "ttl": "15m",
  "signature": "HMAC-SHA256"
}`,
    token: "lease_01M6...f3a2",
  },

  gate: {
    rows: [
      "Policy and ruleset guard",
      "Secret scan",
      "Review approval",
    ],
    enabled: "Merge pull request",
    blocked: "Merge blocked by policy",
    ready: "All checks passed.",
  },

  stack: {
    layers: [
      { label: "Clients and agents", detail: "HTTP · SSH · MCP" },
      { label: "existd", detail: "policy · transports · UI" },
      { label: "Local disk", detail: "SQLite WAL · bare repos" },
    ],
  },

  bento: {
    title: "Everything a forge needs.",
    items: [
      { title: "Smart-HTTP", body: "Clone, fetch, and push over one authenticated endpoint.", tag: ":8080" },
      { title: "Embedded SSH", body: "A pure-Go SSH server with no host sshd.", tag: ":2222" },
      { title: "Git LFS", body: "SHA-256 content-addressable storage and file locks.", tag: "experimental" },
      { title: "Pull requests", body: "3-way and squash merges with approval and check gates.", tag: "policy" },
      { title: "Signatures", body: "OpenSSH SIGSPEC and GPG verification with fingerprints.", tag: "verified" },
      { title: "Audit log", body: "An immutable record of administrative and agent actions.", tag: "JSONL" },
      { title: "Webhooks", body: "HMAC-signed delivery with attempt history.", tag: "signed" },
      { title: "Notifications", body: "An in-app inbox plus a pure-Go SMTP sender.", tag: "SMTP" },
      { title: "Migration", body: "Import repositories, issues, pull requests, and comments.", tag: "GitHub" },
      { title: "SSO and SCIM", body: "OIDC, SAML, and RFC 7644 provisioning. Frozen for launch.", tag: "experimental" },
      { title: "Terraform and Helm", body: "Provider and chart shipped in the repo. Frozen for launch.", tag: "experimental" },
      { title: "Prometheus", body: "Metrics and health probes for your cluster.", tag: "/metrics" },
    ],
  },

  quickstart: {
    title: "A forge in one command.",
    body: "The installer resolves the newest release and verifies its SHA-256 manifest before installing.",
    commands: [
      "curl -fsSL https://raw.githubusercontent.com/RavaniRoshan/exist.io/main/scripts/install.sh | bash",
      "existd bootstrap --email admin@corp.exist.io --namespace acme --data-dir ./data",
      "existd",
    ],
    caption: "Open http://localhost:8080. Bootstrap prints the MCP snippet and admin key.",
    docs: { label: "Read the docs", href: "https://ravaniroshan.github.io/exist.io/" },
    release: {
      label: "v0.6.0-beta release notes",
      href: "https://github.com/RavaniRoshan/exist.io/releases/tag/v0.6.0-beta",
    },
  },

  cta: {
    title: "Run your own forge.",
    body: "One binary, your hardware, your agents. Star the repo or deploy it now.",
    primary: { label: "Install exist.io", href: "#quickstart" },
    secondary: { label: "Star on GitHub", href: "https://github.com/RavaniRoshan/exist.io" },
  },

  footer: {
    columns: [
      {
        title: "Project",
        links: [
          { label: "GitHub", href: "https://github.com/RavaniRoshan/exist.io" },
          { label: "Releases", href: "https://github.com/RavaniRoshan/exist.io/releases" },
          { label: "Roadmap", href: "https://github.com/RavaniRoshan/exist.io/blob/main/ROADMAP.md" },
          { label: "License", href: "https://github.com/RavaniRoshan/exist.io/blob/main/LICENSE" },
        ],
      },
      {
        title: "Docs",
        links: [
          { label: "Documentation", href: "https://ravaniroshan.github.io/exist.io/" },
          { label: "Getting started", href: "https://ravaniroshan.github.io/exist.io/getting-started" },
          { label: "MCP tools", href: "https://ravaniroshan.github.io/exist.io/reference/mcp-tools" },
          { label: "Claims ledger", href: "https://github.com/RavaniRoshan/exist.io/blob/main/CLAIMS.md" },
        ],
      },
      {
        title: "Platform",
        links: [
          { label: "Capability leases", href: "https://github.com/RavaniRoshan/exist.io/blob/main/pkg/agentlease/lease.go" },
          { label: "MCP server", href: "https://github.com/RavaniRoshan/exist.io/tree/main/internal/mcp" },
          { label: "Threat model", href: "https://github.com/RavaniRoshan/exist.io/blob/main/THREAT_MODEL.md" },
          { label: "Security policy", href: "https://github.com/RavaniRoshan/exist.io/blob/main/SECURITY.md" },
        ],
      },
      {
        title: "Community",
        links: [
          { label: "Issues", href: "https://github.com/RavaniRoshan/exist.io/issues" },
          { label: "Pull requests", href: "https://github.com/RavaniRoshan/exist.io/pulls" },
          { label: "Contributing", href: "https://github.com/RavaniRoshan/exist.io/blob/main/CONTRIBUTING.md" },
        ],
      },
    ],
    legal: "Apache-2.0 · © 2026 exist.io contributors",
  },
};

export default marketing;
