# Give Page Redesign Design

## Goal

Replace the current Give page — a decorative but non-functional donation form
(amount picker, frequency toggle, fund dropdown, "Give Now" button that isn't
wired to any payment processor) plus a stewardship section with fabricated
fund percentages — with a modern, honest directory of the real ways to give
to St. Mina Coptic Orthodox Church. Every element on the page must correspond
to something that actually exists.

## What's Removed

- The entire donation form card: frequency toggle, amount grid, fund
  designation dropdown, "Give Now" button, "Secure giving powered by
  Tithe.ly" note. There is no payment processor integrated anywhere in the
  codebase — this form did nothing.
- The "Your Impact" sidebar (Worship / Community / Outreach blurbs) that sat
  next to the form.
- The "Transparent Stewardship" section with hardcoded fund progress bars
  (64%, 39%, 84%, 25%) — placeholder numbers with no data source.
- The closing "Scripture Quote" navy band (Hebrews 13:16). The page now ends
  after the FAQ and flows directly into the site's existing shared
  `<app-footer>` (`src/app/shared/footer`), exactly like every other page.
  No page-specific closing band.

## What's Kept / Added

### Hero

Full-bleed photo hero using the existing `assets/images/imgAssets/hero.png`
(St. Mina church exterior at sunset — already used elsewhere on the site, no
new image asset needed). A navy gradient overlay
(`rgba(27,42,68,0.93) → rgba(27,42,68,0.2)`, left to right) keeps the text
legible against the photo, consistent with the site's navy/gold palette.

Heading and verse sit left-aligned over the darker side of the gradient:

- Small gold cross glyph, as in the current hero.
- `Give with Faith & Love` — "Faith & Love" in italic gold, matching the
  concept mockup's emphasis treatment.
- Supporting verse, **New King James Version**: *"So let each one give as he
  purposes in his heart, not grudgingly or of necessity; for God loves a
  cheerful giver."* — 2 Corinthians 9:7 (NKJV). This replaces the current
  hero's non-NKJV paraphrase of the same verse.

Hero height stays comparable to the current 200px band, expanding slightly
on desktop to accommodate the photo without cropping the towers/cross
awkwardly (target ~260px desktop, auto height on mobile with the image still
visible via `object-fit: cover`).

### Ways to Give

Section heading: "Ways to Give". Two rows, both inside the section:

**Row 1 — three equal-size method cards** (Direct Deposit, Zelle, By Check).
All three cards share the same height, padding, and border treatment so the
row reads as one consistent set — no card is enlarged or vertically offset.
Zelle is the church's preferred method, so it gets a **subtle** highlight
only:

- A gold border (2px) instead of the plain top accent the other two cards
  use.
- A small "Preferred" label near the card title.

No elevation, no size change, no badge sticking out above the card — the
highlight is a color/label cue, not a structural one.

Card contents (all real, existing data — reused verbatim from the current
page):

- **Direct Deposit** — bank icon, Account# 000112980412, Routing#
  064000020.
- **Zelle** — Z icon, phone 615-293-1008, the existing QR code image
  (`public/images/pages/give/zelle.png`, which already links to
  `enroll.zellepay.com`), caption "Scan to give securely."
- **By Check** — check icon, payable to St. Mina Church, 476 McMurray Dr,
  Nashville, TN 37211.

Details are shown directly on each card (no "View Details" expand/modal —
the current page already shows this information inline, and there's no
detail page to link to, so adding a click-through would be complexity with
nothing behind it).

**Row 2 — two wider photo-accent cards** (In Person, Planned Giving), each a
photo on one side and text on the other, reusing existing image assets:

- **In Person** — `assets/images/imgAssets/candle.png`, "Gifts can be placed
  in the collection boxes during any of our liturgical services."
- **Planned Giving** — `assets/images/imgAssets/family.png`, "Contact our
  treasury team for information on legacies, stocks, or estate gifts."

No new images are introduced anywhere on the page; every photo is one
already present in the codebase.

### FAQ

Kept, with content rewritten to remove all Tithe.ly references (Tithe.ly is
not used anywhere in the app):

1. **Is my gift tax-deductible?** — Unchanged: St. Mina is a registered
   501(c)(3); a year-end giving statement is provided.
2. **How do I set up a recurring gift?** — New: set up a recurring transfer
   through Zelle or your bank's direct deposit / bill pay using the account
   details above; contact the treasury team for help.
3. **Is giving by Zelle or direct deposit secure?** — New: yes, both move
   funds directly bank-to-bank using your own bank's encryption, with no
   third-party platform involved.

Accordion behavior (click to expand/collapse, one open at a time) stays as
it is today.

## Component Structure

`Give` component (`src/app/pages/give/give.ts`) loses everything related to
the fake form: `frequency`, `selectedAmount`, `customAmount`, `fund`
signals, the `amounts` array, and the `selectAmount` / `selectCustom`
methods. It keeps `expandedFaq` and `toggleFaq`, and the `faqs` array is
updated to the three rewritten Q&As above. No new component state is
needed — the ways-to-give cards are static markup, not signal-driven.

## Visual Language

No new colors or fonts. Continues using the page's existing SCSS variables
(`$navy: #1B2A44`, `$gold: #C9A084`, `$muted`, `$slate` family), Playfair
Display for headings, Inter for body text — unchanged from the current
`give.scss`.

## Responsive

Row 1 (three method cards) stacks to a single column below the existing
`900px` breakpoint used elsewhere on this page, matching how `.ways-grid`
already collapses today. Row 2 (photo cards) stacks image-above-text on
narrow viewports. Hero gradient and text placement adapt the same way the
current hero already handles its `640px` breakpoint.

## Verification

No business logic beyond the existing FAQ toggle, so no new unit tests are
needed — the FAQ accordion is already exercised by hand today and its
behavior doesn't change. After implementation: run the production build,
and check the page at desktop and mobile widths for the hero photo/gradient
legibility, the three-card row's equal sizing with the Zelle highlight
visible but subtle, image aspect ratios on the two photo cards, and that
the page flows into the shared footer with no leftover gap or duplicate
closing band.
