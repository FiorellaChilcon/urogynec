# Design

<!-- impeccable:design-schema 1 -->

The world is **Sterile Field**: the instrument set-up before a procedure. A deep
surgical-drape ground, instruments riding light tray plates under raking light,
teal reserved for what is active. Documented from the shipped build.

Every token below lives in one place: the `@theme` block in
`src/styles/base.css`. Tailwind turns each one into a utility, so the system is
the stylesheet rather than a document describing one. `--color-drape-800` gives
`bg-drape-800` / `text-drape-800` / `border-drape-800`; `--text-section` gives
`text-section` with its line height and tracking attached; `--spacing-page`
gives `px-page` and the negative bleed `-mr-page`.

## Ground rules

- The only bright thing on a dark screen is the client's own steel. Drape is the
  frame; the plate is the content.
- One plate, one statement. Hierarchy is carried by **plate size and position**,
  never by font weight. Type never crosses a rule.
- Part codes ship visible, in a real tabular column: never behind a disclosure.
- Every size is read against a scale (the French-gauge rule in the hero is a
  measured axis, not decoration).
- No rounded cards, no gradient text, no glass, no eyebrows above headings,
  no invented proof.

## Color

Restrained-plus-one: drape neutrals carry the page, teal is the single active
mark.

| Token | Value | Role |
| --- | --- | --- |
| `--drape-900` | `#061d20` | Page ground, header, footer |
| `--drape-800` | `#0c2c30` | Hero ground, contact ground, lit panel |
| `--drape-700` / `--drape-600` | `#103b40` / `#164c52` | Raised drape, control hover |
| `--drape-line` | `#23585f` | Hairline on drape |
| `--plate-000` | `#ffffff` | Tray plate (cards, dialog, company) |
| `--plate-050` | `#f4f6f6` | Documentation ground (catalogue section) |
| `--plate-100` / `--plate-line` | `#e9eded` / `#d3dadb` | Plate fill / plate hairline |
| `--ink-900` / `--ink-700` / `--ink-500` | `#0a1f28` / `#22414e` / `#4c6a76` | Type on plates |
| `--on-drape` / `--on-drape-dim` | `#e8f0ef` / `#9db4b8` | Type on drape (dim is hue-tinted, never gray) |
| `--teal-400` / `--teal-500` / `--teal-600` | `#3fc9c9` / `#2aa6a2` / `#1d7b78` | Accent on dark / solid action / accent on light |
| `--color-pending` | `#d9ad72` | A placeholder that must not be mistaken for a real value |

Teal-600 is the only teal used as ink on white (contrast); teal-400 the only one
used as ink on drape. Solid buttons are teal-500 with `#04161c` ink.

Light vs dark is not a category default: the scene is a sales conversation on a
phone or laptop, often forwarded over WhatsApp: the drape makes the steel read
instantly at thumbnail size, and the catalogue itself flips to a light
documentation ground where codes are read.

## Type

- **Archivo Variable** (self-hosted, `@fontsource-variable/archivo`): display and
  body. Display weight 620, tracking `-0.03em`, line-height 1.04, balanced.
- **Martian Mono Variable** (`@fontsource-variable/martian-mono`): part codes,
  gauges, plate numbers only. Class `.code`, sized `0.68em` of its context,
  tabular figures. Mono is for measurement, never for atmosphere.
- Scale: `text-display` (hero), `text-section` (section headings), `text-lead`
  (body lead), `text-code`, `text-label`. Each carries its own line height and
  tracking, so a size change never needs three more classes.
- Body measure capped at 62ch; lead paragraphs 42 to 46ch.
- Every numeral that can be compared uses `.num` → `font-variant-numeric: tabular-nums`.

## Depth and surface

- `--shadow-plate` / `--shadow-lift`: real offset plus soft blur, tinted from the
  drape (`rgb(3 16 22 / …)`). No zero-offset halos, no hard block shadows.
- Plates are 1px `--plate-line` on white. Drape panels are 1px `--drape-line`.
- Browser surfaces are themed: selection, placeholder, focus ring, scrollbar
  track and thumb all come from the palette.

## Motion

One authored moment: the light **rakes** once across the hero plate on arrival
(`@keyframes rake`, 1.7s, `--ease-out` = `cubic-bezier(0.16, 1, 0.3, 1)`).
The same gesture is the signature interaction: hovering a set card lifts it
under the lamp: the plate brightens, a highlight sweeps, the shadow deepens.
`prefers-reduced-motion` removes the sweep and all transitions.

## Logo

Rebuilt from the original flat JPEG: the two brand colours were separated by
exact-colour remap and traced separately with potrace, so each layer can be
recoloured. The header uses the mark alone (`logo-mark-reverse.svg`) beside a
typographic wordmark set in Archivo, because the drawn wordmark is illegible at
header height. The full logo survives for documents, the favicon and sharing.

## Components

Plates are served responsively: `vite-imagetools` emits 480 / 880 / 1400px
variants and each image site declares its own `sizes`, because the card slot,
the hero column and the opened plate are three different widths.

- **Plate card** (`SetCard.vue`): the catalogue unit. A plate strip framed
  `1400 / 420` showing ~19% of the scanned page at full width (long thin
  instruments want a long thin frame), then model code, name, gauge chips, and a
  footer rule carrying component count and compatibility. The first set spans two
  columns with a taller strip; that span is the only hierarchy device.
- **Plate dialog** (`PlateDialog.vue`): native `<dialog>`. The scanned catalogue
  page on the left, the real selectable part table on the right, one WhatsApp
  action prefilled with the set's name and model.
- **Filter bar**: square chips, active chip inverts to drape; a single search
  field that matches model, set name, family, compatibility, component names,
  part codes and specs, accent- and punctuation-insensitive, in the active
  language. Horizontally scrollable on narrow screens.
- **Gauge rule**: the hero's measured axis. Ticks are derived from the
  catalogue data itself (every French gauge printed on any component), spaced
  linearly from 3 Fr to 42 Fr; only 3 / 11 / 21 / 30 / 42 are labelled, and
  below 48rem only the ends and 21 Fr survive. It moves when the data moves.
- **Pending contact row**: dashed border plus an amber note. Placeholders are
  marked, never dressed up as real values.

## Head and language

`useSiteHead()` (`@unhead/vue`) declares the head as computed values on the
active locale: `<html lang>`, title, description, canonical, the Open Graph set
and the Twitter card. This is a single route, so nothing varies per page;
language is the only axis. `index.html` keeps a static copy of the same tags
because social crawlers do not run JavaScript, and unhead reconciles against
them rather than duplicating them.

A pipe character is vue-i18n's plural separator, so it can never appear in a
message string. Titles use `·`.

## Content and language

- English default, Spanish toggle, persisted to `localStorage`, `<html lang>`
  updated. All strings in `src/locales/{en,es}.json`.
- Component names are composed from a small translated vocabulary
  (`component.*` + `variant.*`), so adding a set costs no new copy.
- Specs stay language-neutral (codes, French gauges, angles, millimetres).
- Product data in `src/data/sets.ts` carries `specialty` so the gynecology
  catalogue drops in without restructuring.
