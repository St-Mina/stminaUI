# Home Hero Carousel Indicators Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add accessible, clickable, data-driven position indicators to the home hero carousel.

**Architecture:** Extend the existing `Home` carousel with one direct-selection method that reuses its autoplay reset behavior. Render one native button per `heroSlides` entry and style the button group as centered, responsive dots without introducing another component or dependency.

**Tech Stack:** Angular 21 standalone components, Angular signals, TypeScript, SCSS, Vitest through Angular's unit-test builder.

---

## File Structure

- Modify `src/app/pages/home/home.spec.ts`: test direct selection, rendered indicator count, active semantics, clicking, and timer restart.
- Modify `src/app/pages/home/home.ts`: add validated direct slide selection.
- Modify `src/app/pages/home/home.html`: render accessible buttons from `heroSlides`.
- Modify `src/app/pages/home/home.scss`: position and style the responsive indicator group.

### Task 1: Direct Slide Selection

**Files:**
- Modify: `src/app/pages/home/home.spec.ts`
- Modify: `src/app/pages/home/home.ts`

- [ ] **Step 1: Write failing direct-selection tests**

Add:

```ts
it('selects a requested slide and restarts autoplay', () => {
  const component = TestBed.createComponent(Home).componentInstance;

  component.showSlide(2);
  expect(component.activeSlideIndex()).toBe(2);

  vi.advanceTimersByTime(5_999);
  expect(component.activeSlideIndex()).toBe(2);
  vi.advanceTimersByTime(1);
  expect(component.activeSlideIndex()).toBe(0);
});

it('ignores a direct-selection index outside the slide list', () => {
  const component = TestBed.createComponent(Home).componentInstance;

  component.showSlide(-1);
  expect(component.activeSlideIndex()).toBe(0);
  component.showSlide(component.heroSlides.length);
  expect(component.activeSlideIndex()).toBe(0);
});
```

- [ ] **Step 2: Run tests and confirm failure**

Run:

```bash
npm test -- --watch=false
```

Expected: compilation fails because `showSlide` does not exist.

- [ ] **Step 3: Implement validated direct selection**

Add to `Home`:

```ts
showSlide(index: number): void {
  if (index < 0 || index >= this.heroSlides.length) {
    return;
  }

  this.activeSlideIndex.set(index);
  this.restartAutoplay();
}
```

- [ ] **Step 4: Run tests**

Run:

```bash
npm test -- --watch=false
```

Expected: all tests pass.

### Task 2: Accessible Indicator Buttons

**Files:**
- Modify: `src/app/pages/home/home.spec.ts`
- Modify: `src/app/pages/home/home.html`
- Modify: `src/app/pages/home/home.scss`

- [ ] **Step 1: Write failing DOM tests**

Add:

```ts
it('renders one accessible indicator per slide with the first active', () => {
  const fixture = TestBed.createComponent(Home);
  fixture.detectChanges();

  const indicators = fixture.nativeElement.querySelectorAll<HTMLButtonElement>(
    '.hero-indicator'
  );

  expect(indicators).toHaveLength(3);
  expect(indicators[0].getAttribute('aria-label')).toBe('Show hero image 1');
  expect(indicators[0].getAttribute('aria-current')).toBe('true');
  expect(indicators[1].hasAttribute('aria-current')).toBe(false);
});

it('selects the corresponding slide when an indicator is clicked', () => {
  const fixture = TestBed.createComponent(Home);
  fixture.detectChanges();

  const indicators = fixture.nativeElement.querySelectorAll<HTMLButtonElement>(
    '.hero-indicator'
  );
  indicators[2].click();
  fixture.detectChanges();

  expect(fixture.componentInstance.activeSlideIndex()).toBe(2);
  expect(indicators[2].getAttribute('aria-current')).toBe('true');
  expect(indicators[0].hasAttribute('aria-current')).toBe(false);
});
```

- [ ] **Step 2: Run tests and confirm failure**

Run:

```bash
npm test -- --watch=false
```

Expected: DOM tests fail because no `.hero-indicator` buttons exist.

- [ ] **Step 3: Render data-driven indicators**

Insert before the hero's closing tag:

```html
<div class="hero-indicators" aria-label="Choose hero image">
  @for (slide of heroSlides; track slide.src; let index = $index) {
    <button
      type="button"
      class="hero-indicator"
      [class.is-active]="index === activeSlideIndex()"
      [attr.aria-label]="'Show hero image ' + (index + 1)"
      [attr.aria-current]="index === activeSlideIndex() ? 'true' : null"
      (click)="showSlide(index)"
    ></button>
  }
</div>
```

- [ ] **Step 4: Style positioning, touch targets, and states**

Add:

```scss
.hero-indicators {
  position: absolute;
  z-index: 3;
  bottom: clamp(1.25rem, 3vw, 2.5rem);
  left: 50%;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transform: translateX(-50%);
}

.hero-indicator {
  display: grid;
  width: 2rem;
  height: 2rem;
  place-items: center;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;

  &::before {
    width: 0.6rem;
    height: 0.6rem;
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.55);
    content: '';
    transition:
      background 200ms ease,
      border-color 200ms ease,
      transform 200ms ease;
  }

  &:hover::before {
    background: #fff;
  }

  &.is-active::before {
    border-color: $gold;
    background: $gold;
    transform: scale(1.25);
  }

  &:focus-visible {
    border-radius: 50%;
    outline: 3px solid $gold;
    outline-offset: 1px;
  }
}
```

Extend the reduced-motion selector:

```scss
@media (prefers-reduced-motion: reduce) {
  .hero-slide,
  .hero-arrow,
  .hero-indicator::before {
    transition: none;
  }
}
```

- [ ] **Step 5: Run tests and production build**

Run:

```bash
npm test -- --watch=false
npm run build
```

Expected: all tests pass and the production build completes. The existing unrelated livestream style-budget warning may remain.

- [ ] **Step 6: Commit the implementation**

```bash
git add src/app/pages/home/home.ts src/app/pages/home/home.html src/app/pages/home/home.scss src/app/pages/home/home.spec.ts
git commit -m "feat: add hero carousel indicators"
```

### Task 3: Final Scope Check

**Files:**
- Verify: `src/app/pages/home/home.ts`
- Verify: `src/app/pages/home/home.html`
- Verify: `src/app/pages/home/home.scss`
- Verify: `src/app/pages/home/home.spec.ts`

- [ ] **Step 1: Verify branch scope**

Run:

```bash
git status --short
git diff --stat origin/qc...HEAD
git log --oneline origin/qc..HEAD
```

Expected: the branch contains only the approved home carousel work and its documentation. The environment security correction remains present through the latest `qc` base.
