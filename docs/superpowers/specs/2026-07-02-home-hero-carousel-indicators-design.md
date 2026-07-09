# Home Hero Carousel Indicators Design

## Goal

Add centered, clickable slide indicators to the existing home hero carousel so
visitors can see the current position and jump directly to any image.

## Behavior

- Render one indicator for every entry in the existing `heroSlides` array.
- Position the indicator group at the horizontal center near the bottom of the
  hero on desktop and mobile.
- Mark the indicator corresponding to `activeSlideIndex` as active.
- Selecting an indicator immediately displays its slide.
- Direct selection restarts the carousel timer, giving the selected image a full
  six-second interval before automatic advancement.
- Existing arrow, autoplay, pause, wrapping, and reduced-motion behavior remains
  unchanged.
- Adding or removing a slide automatically updates the indicator count without
  template or styling changes.

## Presentation

Each indicator appears as a circular dot with a touch-friendly invisible button
area. Inactive dots use translucent white. The active dot uses the existing gold
accent and is slightly larger. Hover and keyboard-focus states remain visible
against all hero images and the dark overlay.

The indicator group sits above the hero's lower edge and below the centered
content. Its placement avoids the heading, call to action, and side arrows at
desktop and mobile widths.

## Accessibility

- Each indicator is a native `button`.
- Each button has an explicit label in the form `Show hero image N`.
- The active button exposes `aria-current="true"`.
- Keyboard users can focus and activate every indicator.
- Focus rings meet the same visible-focus treatment as the arrow controls.
- Indicator size changes and transitions are disabled when reduced motion is
  requested.

## Component Changes

The `Home` component adds a public `showSlide(index)` method. It validates that
the requested index exists, updates `activeSlideIndex`, and restarts autoplay.
The template renders indicator buttons from `heroSlides`. The stylesheet owns
indicator positioning, visual states, touch targets, and responsive spacing.

No new component or third-party dependency is needed.

## Verification

Component tests will verify:

- indicator count matches slide count;
- the first indicator is active initially;
- clicking an indicator activates its corresponding slide;
- selecting a slide restarts the six-second autoplay interval; and
- active and inactive buttons expose the correct `aria-current` state.

The full unit-test suite and production build must pass. Manual responsive
verification should confirm centered placement, visible focus, touch-friendly
targets, and no overlap at desktop and mobile widths.
