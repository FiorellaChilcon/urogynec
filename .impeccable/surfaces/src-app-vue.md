---
version: 1
slug: "src-app-vue"
primary_target: "src/App.vue"
related_targets: []
---

Scope: the single-page public catalogue site (`src/App.vue` and its sections). Visitor mode: Persuade.

Audience: urologists, hospital procurement and distributors who already received the 2026 PDF and asked for a website; they arrive from WhatsApp or email, often on a phone. Job: confirm the company is real, find the set and its part codes, start an enquiry. Action: WhatsApp / email enquiry naming a set. Proof on hand: 16 scanned catalogue plates with real photography and codes, a real US address, 25 years of distribution. No testimonials, certifications, prices or customers exist — none may be invented.

Constraints: Vue 3 + TS, static, EN default with ES toggle from JSON locales, gynecology is a stated capability with no products yet (data model carries `specialty`).

## Direction contract

THESIS: The site is the instrument set-up before the procedure, not a product grid. It refuses the category's white-page-with-blue-rounded-cards arrangement and the stock-surgeon-photo hero; the only bright thing on the screen is the client's own steel.

OWN-WORLD: A deep surgical drape ground (#0C2C30 → #103B40 teal, carried from the logo's cyan) under raking light. Instruments ride light "tray plates" — near-white, cool, hairline-ruled, slightly lifted with a real offset shadow. Teal #3FC9C9 is the active mark only. Type: a tight grotesque for display, true tabular figures for every Fr size, angle and part code. Rules are 1px drape-ink; no rounded cards, no gradient text, no glass.

STORY: "These people actually make this equipment" → "my set and its codes are here, in daylight" → send a WhatsApp naming the set.

FIRST VIEWPORT: Drape-dark. Logo top-left, EN/ES toggle top-right on the same baseline. Left two-thirds: the company line in display scale with "Urology & Gynecology" set as the second line, one sentence of lineage below (since 2000, dozens of countries), then two actions — "Browse the catalogue" (teal, solid) and "WhatsApp" (hairline). Right third, bleeding off the right edge: the NP-18 cystoscopy set photographed on a light tray plate, lit from the left, overlapping the headline column's gutter. Along the bottom edge, a hairline Fr-gauge rule with the real range 11Fr–42Fr.

FORM: Candidate 4 of 7 on the grounded list — the sterile instrument tray on surgical drape under raking light (ordered after: print instrument catalogue, orthographic drawing, endoscopic field of view). Seed key 47f3d76f.

RAISE — from "Glazed Grid" (competitive challenger, glazier colour-field partition): one plate, one statement; hierarchy carried by plate size and position, never by font weight; type never crosses a rule.
RAISE — from "Ikeda datamatics" (declined): tabular density courage — part codes ship visible in a real tabular column, not hidden behind a "details" disclosure.
RAISE — from "Oscilloscope bench" (declined): every size is read against a scale — the Fr gauge rule is a real measured axis, not decoration.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
