# Home Ministries Image Wiring Design

## Goal

Replace the placeholder ministry gradient panels on the home page and the full
ministries page with the uploaded ministry images, while keeping the content
easy to extend when a new ministry is added later.

## Scope

This change covers:

- the `Our Ministries` teaser section on the home page;
- the full ministries listing page; and
- the ministry image assets already uploaded under `src/assets/images/ministries/`.

The home teaser will show the same five ministries as the full page so the two
sections stay aligned:

- Youth Ministry
- Sunday School
- Choir & Hymns
- Community Outreach
- Family Ministry

The `Explore Ministries` button stays in place and continues to route to
`/ministries`.

## Structure

The ministry metadata will live in one shared TypeScript data structure instead
of being duplicated in two templates. Each ministry entry will include:

- title;
- summary or detail copy;
- image path;
- alt text; and
- ordering information.

The home page will render the teaser cards from that shared list. The ministries
page will render the detailed blocks from the same source, with the existing
long-form copy preserved.

## Images

Each ministry image will be wired to a real `<img>` element rather than a CSS
background. That gives us:

- explicit `alt` text;
- standard browser image loading behavior;
- easier future reordering; and
- a single `object-fit: cover` crop strategy for all cards.

The uploaded files will map as follows:

- `youthMinistry-upscaled-20260702-214734.webp` for Youth Ministry
- `sundaySchool-upscaled-20260702-215436.webp` for Sunday School
- `choir-upscaled-20260702-215552.webp` for Choir & Hymns
- `communityOutreach-upscaled-20260702-220023.webp` for Community Outreach
- `familyOutreach-upscaled-20260702-220117.webp` for Family Ministry

## Layout

The home page teaser grid will keep its current responsive behavior and simply
swap the placeholder panels for images. The ministries page will keep its
current block layout, but each block will use the real image instead of the
gradient tile.

No content rewording is planned beyond what is needed to align the displayed
cards with the available assets.

## Maintainability

The shared ministry data structure is the main maintainability improvement.
When a future ministry is added, the change should be limited to one new data
entry plus the new image file. Both pages should pick it up from the same
source.

## Testing

Tests will cover:

- the home page renders five ministry teaser cards with the expected image
  sources and alt text;
- the ministries page renders five detail blocks with the same image sources;
- the `Explore Ministries` link still points to `/ministries`;
- the shared ministry ordering stays consistent between the two pages; and
- the pages no longer depend on the old gradient placeholder classes for their
  primary visuals.

The implementation will also be verified visually at desktop and mobile sizes
to confirm the images crop cleanly and the sections still feel balanced.
