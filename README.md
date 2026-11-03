# exist.io landing page

Marketing site for exist.io — a self-hosted Git forge for people and coding agents.

## Develop

    npm install
    npm run dev        # http://localhost:4321/exist.os
    npm run build      # static output in dist/
    npm run preview    # serve the build
    npm run check      # astro check (types)

## Design

The landing is a cinematic dark page: Inter for display and body, JetBrains Mono
for code, a near-black canvas, mint signal accents, and large rounded media
panels. The product screenshot in the hero is captured from a running instance.

## Content

Copy lives in `src/content/marketing.ts`. Every number on the page is
deliberately absent unless it is generated from source in the product repository;
the page links to the docs and the claims ledger instead of duplicating counts.

Run the claims audit after any copy change:

    npm run build && node scripts/audit-claims.mjs

It verifies the release tag, install sequence, ports, license, lease isolation,
and the absence of stale counts and design language.

## Deploy

Static output in `dist/`. The site deploys under the `/exist.os` base path; see
`astro.config.mjs`.
