# Home Latest News CTA Design

## Goal

Replace the WordPress-backed home page news feed with a custom static `Latest
News` section that reads like a church invitation, while keeping the section
name itself unchanged.

## Scope

This change covers the homepage `Latest News` section only.

It will:

- remove the WordPress post fetch from the home component;
- replace the current dynamic feed with three static cards;
- keep the heading `Latest News`; and
- use feast-first placeholder copy that can later be swapped for real church
  news when the site is handed off.

The section will not introduce animation or a carousel. It is intentionally
static for the MVP.

## Content

The cards should feel invitational rather than bulletin-like. Each card should
combine a feast name, a short date cue, and a call to action such as joining in
prayer.

Approved placeholder cards:

- July 8, 2026: St. Febronia the Ascetic
  - CTA copy: `Join us in prayer as we remember St. Febronia on July 8.`
- July 12, 2026: Sts. Peter and Paul, the Apostles
  - CTA copy: `Join us in prayer as the Apostles' Feast concludes on July 12.`
- July 13, 2026: St. Aoulimpas the Apostle
  - CTA copy: `Join us in prayer as we continue the apostolic feast days.`

The cards are placeholders for now, but the structure should be easy to update
with real news items later without changing the layout.

## Structure

The home component will own a small immutable list of latest-news cards. Each
entry will include:

- a title or feast name;
- a short date label;
- a brief CTA sentence; and
- an optional link label if a future update wants one.

The template will render those cards directly with Angular control flow. The
WordPress service, async post stream, loading-empty states, and error state are
removed from the home page.

## Layout

Desktop layout:

- three cards displayed horizontally in a single row or balanced three-column
  grid;
- consistent card heights;
- easy-to-scan CTA copy.

Mobile layout:

- the cards stack vertically;
- spacing stays generous enough that the section reads like a clean list rather
  than a cramped feed.

The section should remain visually calm and consistent with the rest of the
homepage. The intent is clear information, not motion.

## Maintainability

This MVP should stay simple enough to hand off easily later.

- The copy lives in one small local data structure.
- The cards can be replaced with real news content by editing that data only.
- No external data source is required for the first version.

## Testing

Tests will verify:

- the home page renders exactly three latest-news cards;
- the titles and CTA copy match the approved placeholder content;
- the section still renders under the `Latest News` heading;
- the WordPress-specific loading and error states are gone from the home page;
- the layout remains responsive at desktop and mobile widths.

The implementation will also be checked visually to confirm the cards feel like
an invitational church section rather than a dated calendar widget.
