# Urogynec Instruments: online catalogue

Static, bilingual (EN/ES) product catalogue for the Techno Standard Corp. 2026
urology instrument range. Vue 3 + TypeScript + Vite + Tailwind v4, no backend.

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # -> dist/ (served from the domain root)
npm run build:pages  # -> dist/ with the /urogynec/ base path, used by CI
npm run preview
```

## Before publishing

**Replace the email placeholder.** It is the only invented-looking value on the
site and it renders as a dashed "to be confirmed" chip with a warning note, so
nothing fake ships in the meantime. Add it to `src/locales/{en,es}.json` under
`contact.*` and swap the placeholder row in `ContactSection.vue`.

Phone and WhatsApp both point at +51 985 250 146 (`src/data/contact.ts`). The
company copy under `company.*` comes from the owner's Word document; no claim
anywhere on the site was invented.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds with the
`/urogynec/` base path and publishes to GitHub Pages. Two one-time steps in the
repository settings:

1. **Settings > Pages > Build and deployment > Source: GitHub Actions.**
2. GitHub Pages only serves **public** repositories on the free plan. Either
   make the repository public, or upgrade the account, or host the `dist/`
   folder somewhere else (Netlify, Vercel and Cloudflare Pages all take it as-is).

The canonical URL, the sitemap and the social-card URLs all assume
`https://fiorellachilcon.github.io/urogynec/`. Change them in `index.html` and
`public/sitemap.xml` if the site moves to a custom domain.

## Content

- `src/data/sets.ts`: the 16 catalogue plates, transcribed from the PDF. Model,
  name key, family, printed plate number, the French gauges the set is offered
  in, its components (part code, type, variant, spec) and brand compatibility.
  Each set carries `specialty`.
- `src/locales/*.json`: every visible string, including the instrument
  vocabulary (`component.*`, `variant.*`) and the per-language page title and
  meta description. Specs stay language-neutral.
- `src/assets/plates/p02…p17.webp`: the scanned catalogue pages, extracted with
  `pdfimages` and converted with `cwebp`. They are bundled assets, so Vite
  hashes them, applies the base path and fails the build if one goes missing.
- `public/techno-standard-urology-catalogue-2026.pdf`: the original, offered as
  a download. It stays in `public/` on purpose: it is a link people share, so
  the URL must be stable and unhashed. That is the one place
  `import.meta.env.BASE_URL` is still needed.

## Logo assets

Rebuilt from `logo.jpeg` (flat JPEG on white) by separating the two brand
colours and tracing each with potrace:

| File | Use |
| --- | --- |
| `public/logo.svg` | Full logo, brand colours, for light backgrounds |
| `public/logo-reverse.svg` | Full logo, light on dark |
| `public/logo-mark.svg` | Mark only, brand colours |
| `src/assets/logo-mark-reverse.svg` | Mark only, light on dark. Imported by the header |
| `public/logo.png` | Transparent PNG, 1200px wide, for documents and messaging |
| `public/favicon.png` | Mark only, 256px, transparent |
| `public/og.png` | 1200x630 social card |

Brand colours: `#2C415A` navy, `#589C9F` teal. Reverse variants use `#E8F0EF`
and `#3FC9C9`.

## Head and SEO

`src/useSiteHead.ts` uses `@unhead/vue` to declare title, description,
canonical, Open Graph and Twitter tags as computed values on the active locale.
`index.html` carries the same tags statically for crawlers that do not run
JavaScript. If the site ever grows a router, per-route meta is a `useSeoMeta()`
call in the route component; nothing else changes.

Careful with copy: `|` is vue-i18n's plural separator and silently truncates a
message. Use `·`.

## Design system

Defined once as a Tailwind theme in `src/styles/base.css` under `@theme`, so
every token is also a utility: `bg-drape-800`, `text-ink-500`, `text-section`,
`px-page`, `py-section`, `shadow-plate`, `ease-raking`. `DESIGN.md` documents
the system and why each decision was made; `PRODUCT.md` records product truth.
Neither ships to the browser.

## Adding the gynecology catalogue later

1. Drop the new page images into `public/plates/`.
2. Add entries to `sets.ts` with `specialty: 'gynecology'` and any new `family`
   keys.
3. Add the family labels and any new `component.*` keys to both locale files.
4. Filter or split the grid by `specialty` in `CatalogueSection.vue`. The data
   already carries the field; the section currently renders every set.
