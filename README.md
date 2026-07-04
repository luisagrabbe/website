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

- **Inter** (body/UI/buttons) and **Playfair Display** (headline fallback) are self-hosted via `@fontsource` — no external font requests, no Google Fonts GDPR exposure, works offline and on Cloudflare Pages with zero extra config.
- **The Seasons** (licensed display font for headlines) is not included. `src/styles/base.css` declares `@font-face` rules pointing at:
  - `public/assets/fonts/TheSeasons-Regular.woff2`
  - `public/assets/fonts/TheSeasons-RegularItalic.woff2`

  Drop the real files at those exact paths and the site switches over automatically — the `--font-heading` stack (`'The Seasons', 'Playfair Display', Georgia, serif`) already falls through to Playfair Display until then, so nothing else needs to change. If your licensed files use different weights/styles, add matching `@font-face` blocks the same way.

## Assets in use

- `public/assets/photos/luisa-portrait.jpg` — the Hero's main portrait
- `public/assets/logo/luance-mark.png` — compact "LU" monogram, used in the topbar and as a small signature under the CTAs
- `public/assets/logo/luance-lockup.png` — full "LUANCE Brand Design" lockup — not currently placed on the page, kept for when the site grows beyond a single Hero
- `public/assets/photos/luisa-hero.jpg` — the wide editorial crop used by a previous full-bleed hero design; not referenced by the current markup, kept in case that direction comes back

## Paused content

The site was previously a three-section page (Hero, About, Coming-soon). It's now a single Hero, and the About section's approved copy was removed from `index.html` rather than left commented out. If the full site comes back, this is the previously approved About-section copy (still needs Luisa's final sign-off):

> **Ich sehe dich – wirklich.**
>
> Ich glaube daran, dass jede Selbstständige eine Marke verdient, die genauso einzigartig ist wie sie selbst. Deshalb schaue ich genau hin: auf deine Geschichte, deine Werte und das, was dich wirklich ausmacht.
>
> Statt kurzlebigen Trends oder Branchenklischees zu folgen, baue ich deine Marke auf deiner Persönlichkeit auf – denn die bleibt, auch wenn sich Trends längst wieder verabschiedet haben.

It used `luisa-portrait.jpg` (now reused in the Hero) in a two-column layout with `.about`/`.about__inner`/`.about__media`/`.about__content` classes, still defined in `src/styles/layout.css` and `src/styles/components.css`.

## Before launch checklist

- [ ] Replace the placeholder URLs in `src/config.js` (`INSTAGRAM_URL`, `CALENDLY_URL`) with the real links.
- [ ] Add the licensed "The Seasons" font files (see Fonts section above).
- [ ] Decide whether/when the About section (and a real multi-section site) comes back — see "Paused content" above.
