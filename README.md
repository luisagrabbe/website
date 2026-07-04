# LUANCE Landing Page

Under-construction landing page for LUANCE Branding & Web Design Atelier (Luisa Grabbe). Static site built with Vite (vanilla JS, no framework). The page is currently a single full-screen Hero — no other sections are live.

## Local development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Build

```bash
npm run build
```

Outputs a static bundle to `dist/`.

```bash
npm run preview
```

Serves the built `dist/` output locally to sanity-check the production build.

## Deploying to Cloudflare Pages

- Framework preset: **Vite**
- Build command: `npm run build`
- Build output directory: `dist`
- No environment variables or Functions required — this is a fully static site.

## Deploying to GitHub Pages

`.github/workflows/deploy.yml` builds and deploys automatically on every push to `main`, via GitHub's official `actions/deploy-pages`. One-time setup:

1. Push this repo to GitHub.
2. Repo **Settings → Pages → Source: GitHub Actions**.
3. Push to `main` (or re-run the workflow from the Actions tab) — the site deploys itself.

Custom domain: add `public/CNAME` containing just the domain (e.g. `luance.de`) — Vite copies it into `dist/` on build, which is where GitHub Pages expects it — then point DNS at GitHub's servers and set the domain under **Settings → Pages → Custom domain**. If deploying instead as a project page without a custom domain (`username.github.io/repo-name`), set `base: '/repo-name/'` in `vite.config.js` or every asset 404s.

## Fonts

- **Inter** (body/UI/buttons) and **Castoro** (headlines/display text) are self-hosted via `@fontsource` — no external font requests, no Google Fonts GDPR exposure, works offline and on Cloudflare Pages with zero extra config.
- Headlines (`h1`/`h2`/`h3`) always render in Castoro's *italic* cut (`font-style: italic` is set directly in `src/styles/base.css`) for a consistent editorial look. Only `@fontsource/castoro/400-italic.css` is imported — Castoro ships just one weight (400), and the upright style is never used, so it's skipped to keep the font payload small.

## Assets in use

- `public/assets/photos/luisa-portrait.jpg` — the Hero's main portrait
- `public/assets/logo/luance-mark.png` — compact "LU" monogram, used in the topbar, as a small signature under the CTAs, and as the source for the favicon set
- `public/assets/logo/luance-lockup.png` — full "LUANCE Brand Design" lockup — not currently placed on the page, kept for when the site grows beyond a single Hero
- `public/assets/photos/luisa-hero.jpg` — the wide editorial crop used by a previous full-bleed hero design; not referenced by the current markup, kept in case that direction comes back

## Favicon

Generated from `public/assets/logo/luance-mark.png` (padded to a square canvas, then downsampled). PNG-only, no `.ico` — modern browsers don't need one. Regenerate after changing the source logo:

```bash
sips -p 700 700 --padColor FFFFFF public/assets/logo/luance-mark.png --out /tmp/luance-mark-square.png
sips -z 16 16   /tmp/luance-mark-square.png --out public/favicon-16x16.png
sips -z 32 32   /tmp/luance-mark-square.png --out public/favicon-32x32.png
sips -z 180 180 /tmp/luance-mark-square.png --out public/apple-touch-icon.png
sips -z 192 192 /tmp/luance-mark-square.png --out public/android-chrome-192x192.png
sips -z 512 512 /tmp/luance-mark-square.png --out public/android-chrome-512x512.png
```

