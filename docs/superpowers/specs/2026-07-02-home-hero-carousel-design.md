# Home Hero Carousel Design

## Goal

Replace the home page's static hero background with an accessible, responsive
image carousel while preserving the existing heading, supporting text, overlay,
and call to action.

## Slide Configuration

The home component will define the slides in one ordered configuration array.
Each entry will contain an asset path and descriptive alternative text. Adding a
future slide will require only another array entry.

The initial order is:

1. `assets/images/imgAssets/hero.png`
2. `assets/images/imgAssets/afterChurch.png`
3. `assets/images/imgAssets/candle.png`

Every fresh component load starts on `hero.png`.

## Behavior

- The active slide advances every six seconds and wraps from the final slide to
  the first.
- Previous and next arrow buttons allow manual navigation and wrap in both
  directions.
- Manual navigation restarts the six-second interval so a selected image remains
  visible for a full interval.
- Automatic advancement pauses while the hero is hovered or keyboard focus is
  within it, then resumes when that interaction ends.
- When the user's system requests reduced motion, automatic advancement is
  disabled. Manual arrow navigation remains available.
- The component releases its timer when destroyed.

## Presentation

Slides fill the existing hero area with `object-fit: cover` on desktop and
mobile. A transition fades between slides without moving the hero content. The
existing dark overlay keeps the text legible over all three images.

The heading, description, and “Learn More” link remain centered above the
slides. Previous and next controls sit at the horizontal edges of the hero,
remain large enough for touch input, and use the existing navy, white, and gold
visual language. Mobile spacing keeps controls clear of the hero text.

## Accessibility

- Slides use real images with descriptive alternative text.
- Only the active slide is exposed as current content.
- Arrow controls are native buttons with explicit accessible labels.
- Keyboard users can operate both controls.
- Focus indicators remain clearly visible.
- Decorative transitions are removed for reduced-motion users.

## Component Structure

The existing `Home` component owns:

- the immutable slide configuration;
- an active-index signal;
- next and previous navigation methods;
- pause and resume handlers; and
- timer lifecycle management.

The home template renders the configured slides and controls. The home
stylesheet owns layering, fade states, control placement, touch sizing, and
responsive behavior. No third-party carousel dependency is introduced.

## Verification

Component tests will verify:

- the first slide is `hero.png`;
- next and previous navigation wrap correctly;
- automatic advancement uses the configured interval;
- interaction pauses and resumes automatic advancement; and
- reduced-motion mode does not start automatic advancement.

The production build must pass. The carousel will also be checked at desktop
and mobile viewport widths for cropping, text readability, control placement,
keyboard focus, and absence of horizontal overflow.
