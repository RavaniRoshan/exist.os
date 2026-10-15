# exist.io landing page

Marketing site for exist.io — an open-source, self-hosted Git forge for people and coding agents.

- Design spec: `docs/superpowers/specs/2026-10-15-exist-io-landing-design.md`
- PlanetScale extraction reference: `docs/superpowers/specs/2026-10-15-planetscale-homepage-reference.md`
- Implementation plan: `docs/superpowers/plans/2026-10-15-exist-io-landing-page.md`

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

## Logos

The compatibility wall uses official brand marks from Simple Icons
(CC0-1.0) and the GnuPG mark from Wikimedia Commons, converted to
monochrome `currentColor` so they theme with the site. Regenerate with
`node scripts/fetch-logos.mjs` (writes to `src/assets/logos/`).
Protocols without canonical marks (SSH, OpenSSH, SAML, SCIM) are set as
text wordmarks in `landing.ts`.

## Deploy

Static output in `dist/`. For a subpath deploy (e.g. GitHub Pages project
site), set `base` in `astro.config.mjs` before building.
