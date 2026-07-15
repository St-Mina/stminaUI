# Home Clergy Alignment Refinement Design

## Goal

Make the clergy section feel intentional by normalizing portrait crops, aligning
text rows, refining color hierarchy, and providing equal-height collapsed
biographies with accessible inline expansion.

## Portrait Alignment

Each clergy configuration entry will define:

- an image focal position; and
- an image scale.

The shared circular frame remains unchanged. Individual transforms will align
the three faces to a common visual eye line and make head sizes appear
consistent. Crop values remain data-driven so future images can be adjusted
without new template rules.

## Content Alignment

Desktop profiles will use matching internal grid rows:

1. portrait;
2. name;
3. role;
4. summary; and
5. action.

Names, roles, summaries, and buttons therefore begin on shared horizontal lines.
On mobile, each profile stacks naturally and does not reserve unnecessary empty
space.

## Text Hierarchy

- Names remain the strongest text in navy.
- Roles change from bright gold to a quieter muted navy-gray with medium weight.
- Summaries use a softer neutral gray.
- Gold remains an accent for portrait borders, focus rings, and action buttons.
- The section subtitle uses a darker neutral gray for clearer contrast.

## Expandable Summaries

Each biography is clamped to two lines by default. Every profile includes a
native “Read More” button directly below the summary.

- Selecting “Read More” expands only that clergy member's full summary.
- The button label changes to “Show Less.”
- Selecting “Show Less” restores the two-line clamp.
- Each button exposes its state through `aria-expanded`.
- Expansion does not affect the state of the other profiles.

The `Home` component stores expanded clergy names in a signal-backed set and
provides a toggle method plus a query method. No individual profile routes or
external links are introduced.

## Accessibility and Motion

Buttons are keyboard operable and have visible gold focus treatment. Summary
content remains in the document rather than being removed. Portrait zoom
transitions and action transitions are disabled for reduced-motion users.

## Verification

Component tests will verify:

- all three clergy entries define explicit focal position and scale values;
- all three summaries begin collapsed;
- expanding one summary does not expand the others;
- the button label and `aria-expanded` value update together; and
- collapsing restores the initial state.

The full unit-test suite and production build must pass. Responsive review should
confirm aligned portrait faces, consistent desktop row alignment, natural mobile
stacking, readable text contrast, and aligned collapsed action buttons.
