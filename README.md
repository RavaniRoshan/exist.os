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

## Deploy

Static output in `dist/`. For a subpath deploy (e.g. GitHub Pages project
site), set `base` in `astro.config.mjs` before building.
