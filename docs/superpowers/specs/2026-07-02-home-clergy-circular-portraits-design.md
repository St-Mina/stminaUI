# Home Clergy Circular Portraits Design

## Goal

Replace the clergy section's large portrait cards with a lighter, open profile
layout featuring circular portraits and the existing approved clergy content.

## Presentation

- Keep three evenly spaced clergy profiles in one desktop row.
- Stack profiles in one centered column on narrow screens.
- Display each portrait in a responsive circle between 190px and 220px.
- Use `object-fit: cover` and the existing per-person focal-position value.
- Add a subtle 3px gold border and soft navy-tinted outer shadow.
- Remove card backgrounds, rounded rectangular frames, and whole-card hover lift.
- Center each name, role, and short biography below its portrait.
- Limit text width so summaries remain readable and visually balanced.
- Apply a subtle portrait-only hover scale and shadow change.
- Disable portrait transitions for reduced-motion users.

## Structure

The existing data-driven `clergy` configuration and content remain unchanged.
Each `article` becomes an open profile containing a dedicated circular portrait
wrapper followed by the existing name, role, and summary. No dependency or new
component is introduced.

## Accessibility

Existing semantic articles, heading hierarchy, image alternative text, and
visible text remain intact. No information depends on hover. Circular cropping
is presentational only.

## Verification

Component tests will confirm three portrait wrappers render around the existing
clergy images. The full unit-test suite and production build must pass.
Responsive review should confirm circular cropping, centered alignment, balanced
spacing, readable summaries, and no horizontal overflow on desktop or mobile.
