# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vue 3 + TypeScript (user-specified), static build, i18n driven by JSON translation files. No deploy target chosen yet: build runs locally for now.

## Users

Primary: urologists, hospital procurement staff and medical-equipment distributors in Latin America and the USA who today receive a 18-page PDF catalogue by email or WhatsApp and reply asking "do you have a website?". They evaluate on an ordinary office laptop or a phone mid-conversation, need to confirm the company is real, find the instrument set and its part codes, and start a quote conversation.

Secondary: the owner (the user's father), who sends the link instead of the PDF attachment.

## Product Purpose

An online catalogue that makes the existing 2026 PDF browsable and credible on the web, so an interested client can identify sets and part numbers and contact the company without a file download. Success = a client who asked for a website gets a link, trusts it, and sends an enquiry naming a set code.

## Positioning

A specialist, not a general medical marketplace: Techno Standard Corp. has distributed urology and gynecology endoscopic instruments to dozens of countries since 2000, with named part codes and documented compatibility with Olympus, Storz, Wolf, ACMI and Stryker light-guide cables and resectoscopy systems. The compatibility matrix is the thing a general catalogue site cannot truthfully copy.

## Operating Context

- Evaluation happens alongside the PDF, often forwarded over WhatsApp.
- Buyers work in part codes (N6001, A1114, A3165.3S) and in French-gauge sizes (11Fr–42Fr) and scope angles (0°, 12°, 30°, 70°).
- Enquiries are person-to-person; there is no e-commerce, no pricing, no stock system.

## Capabilities and Constraints

- Static site. No backend, no cart, no prices, no inventory.
- Content source of truth: `Urology Gynecology Catalog 2026.pdf` (18 pages, scanned images: no selectable text), `Home Web Urogyn.docx` (company copy, ES + EN), `logo.jpeg`.
- Catalogue covers 16 urology instrument sets/option pages. **Gynecology product pages do not exist yet.** Gynecology ships as a stated capability only; the data model must carry a specialty field so a gynecology catalogue drops in later without restructuring.
- Languages: English default, Spanish toggle, strings in JSON translation files.
- Contact: address 83 Lewis St, Perth Amboy, NJ 08066, USA. WhatsApp +51 985250146 (confirmed). Email and office phone are **placeholders to be replaced by the owner**: never present an invented address as real.

## Brand Commitments

- Name: TECHNO STANDARD CORP. (also referred to as TECHNO CORP. (USA) in the Spanish copy).
- Logo: `logo.jpeg`: wordmark in cyan/teal on near-black, with a stacked-bar monogram.
- Catalogue's own print identity: warm taupe/greige bands on white with the teal logo: evidence of the incumbent look, not binding.
- Founded 2000; distribution to dozens of countries; endorsed by practicing urologists and gynecologists (claim present in owner's own copy).

## Evidence on Hand

- 16 scanned catalogue pages with real product photography, part codes, sizes and compatibility notes (extracted to JPEG).
- Company description in ES and EN from the owner's Word document.
- Logo raster.
- No testimonials, customer names, certifications, prices, lead times or distributor list exist. None may be invented.

## Product Principles

1. Part codes and sizes are the content: every set must surface them, searchable, not buried in a PDF.
2. Credibility before persuasion: a real address, a real catalogue, real photography; no invented proof.
3. One tap to a human: enquiry over e-commerce.
4. Built for a second specialty: gynecology is absent today and must be addable without a rebuild.
5. The English/Spanish split is equal-weight content, not an afterthought translation.

## Accessibility & Inclusion

Clients read this on phones in clinical and sales settings; text must stay legible at 4.5:1 contrast and the catalogue must be usable without the PDF download.
