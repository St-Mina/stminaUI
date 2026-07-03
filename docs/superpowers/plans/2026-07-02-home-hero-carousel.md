# Home Hero Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the home page's static hero image with an accessible three-image carousel that starts on the current hero, advances automatically, supports manual arrows, and works responsively.

**Architecture:** Keep carousel state and timer lifecycle inside the existing standalone `Home` component using Angular signals and `DestroyRef`. Render slides from one immutable configuration array so future images only require another entry, while the template and SCSS handle semantic controls, layering, fading, and responsive placement.

**Tech Stack:** Angular 21 standalone components, Angular signals, TypeScript, SCSS, Vitest through Angular's unit-test builder.

---

## File Structure

- Create `src/app/pages/home/home.spec.ts`: focused component tests for slide configuration, navigation, wrapping, timer lifecycle, pause behavior, and reduced motion.
- Modify `src/app/pages/home/home.ts`: slide model, active-index signal, navigation methods, reduced-motion detection, and interval lifecycle.
- Modify `src/app/pages/home/home.html`: data-driven slide images, interaction handlers, and accessible arrow buttons.
- Modify `src/app/pages/home/home.scss`: slide layering and fade states, arrow styling, responsive positioning, and reduced-motion styling.

### Task 1: Carousel State and Timer Behavior

**Files:**
- Create: `src/app/pages/home/home.spec.ts`
- Modify: `src/app/pages/home/home.ts`

- [ ] **Step 1: Write failing state and navigation tests**

Create `src/app/pages/home/home.spec.ts` with a mocked WordPress service and tests that directly exercise the component:

```ts
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { WordpressService } from '../../services/wordpress.service';
import { Home } from './home';

describe('Home hero carousel', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: false,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });

    TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        {
          provide: WordpressService,
          useValue: { getLatestPosts: () => of([]) },
        },
      ],
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('starts with the current hero and keeps slides data-driven', () => {
    const fixture = TestBed.createComponent(Home);
    const component = fixture.componentInstance;

    expect(component.heroSlides.map((slide) => slide.src)).toEqual([
      'assets/images/imgAssets/hero.png',
      'assets/images/imgAssets/afterChurch.png',
      'assets/images/imgAssets/candle.png',
    ]);
    expect(component.activeSlideIndex()).toBe(0);
  });

  it('wraps next and previous navigation', () => {
    const component = TestBed.createComponent(Home).componentInstance;

    component.showPreviousSlide();
    expect(component.activeSlideIndex()).toBe(2);

    component.showNextSlide();
    expect(component.activeSlideIndex()).toBe(0);
  });
});
```

- [ ] **Step 2: Run tests and confirm they fail**

Run:

```bash
npm test -- --watch=false
```

Expected: FAIL because `heroSlides`, `activeSlideIndex`, `showPreviousSlide`, and `showNextSlide` do not exist.

- [ ] **Step 3: Add the minimal slide configuration and navigation state**

Update `src/app/pages/home/home.ts` to import `DestroyRef`, add the slide type and ordered configuration, expose the active-index signal, and implement wrapping:

```ts
import { Component, DestroyRef, inject, signal } from '@angular/core';

interface HeroSlide {
  readonly src: string;
  readonly alt: string;
}

export class Home {
  private readonly wordpressService = inject(WordpressService);
  private readonly destroyRef = inject(DestroyRef);

  readonly heroSlides: readonly HeroSlide[] = [
    {
      src: 'assets/images/imgAssets/hero.png',
      alt: 'St. Mina Coptic Orthodox Church sanctuary',
    },
    {
      src: 'assets/images/imgAssets/afterChurch.png',
      alt: 'St. Mina church community gathered after the liturgy',
    },
    {
      src: 'assets/images/imgAssets/candle.png',
      alt: 'A lit candle representing prayer and worship',
    },
  ];
  readonly activeSlideIndex = signal(0);

  showNextSlide(): void {
    this.activeSlideIndex.update((index) => (index + 1) % this.heroSlides.length);
    this.restartAutoplay();
  }

  showPreviousSlide(): void {
    this.activeSlideIndex.update(
      (index) => (index - 1 + this.heroSlides.length) % this.heroSlides.length
    );
    this.restartAutoplay();
  }
}
```

The timer methods referenced here are added in Step 5; temporarily define empty private `restartAutoplay(): void {}` so this state-only increment compiles.

- [ ] **Step 4: Run tests and confirm state/navigation pass**

Run:

```bash
npm test -- --watch=false
```

Expected: PASS for the initial slide and wrapping tests.

- [ ] **Step 5: Add failing autoplay, pause, teardown, and reduced-motion tests**

Append these tests to `home.spec.ts`:

```ts
it('advances after six seconds and restarts the interval after manual navigation', () => {
  const component = TestBed.createComponent(Home).componentInstance;

  vi.advanceTimersByTime(6_000);
  expect(component.activeSlideIndex()).toBe(1);

  component.showNextSlide();
  expect(component.activeSlideIndex()).toBe(2);

  vi.advanceTimersByTime(5_999);
  expect(component.activeSlideIndex()).toBe(2);
  vi.advanceTimersByTime(1);
  expect(component.activeSlideIndex()).toBe(0);
});

it('pauses and resumes autoplay during interaction', () => {
  const component = TestBed.createComponent(Home).componentInstance;

  component.pauseAutoplay();
  vi.advanceTimersByTime(12_000);
  expect(component.activeSlideIndex()).toBe(0);

  component.resumeAutoplay();
  vi.advanceTimersByTime(6_000);
  expect(component.activeSlideIndex()).toBe(1);
});

it('does not autoplay when reduced motion is requested', () => {
  vi.mocked(window.matchMedia).mockReturnValue({
    ...window.matchMedia('(prefers-reduced-motion: reduce)'),
    matches: true,
  });

  const component = TestBed.createComponent(Home).componentInstance;
  vi.advanceTimersByTime(12_000);

  expect(component.activeSlideIndex()).toBe(0);
});

it('clears autoplay when the component is destroyed', () => {
  const clearIntervalSpy = vi.spyOn(window, 'clearInterval');
  const fixture = TestBed.createComponent(Home);

  fixture.destroy();

  expect(clearIntervalSpy).toHaveBeenCalled();
});
```

- [ ] **Step 6: Run tests and confirm timer tests fail**

Run:

```bash
npm test -- --watch=false
```

Expected: FAIL because autoplay and pause/resume lifecycle behavior is not implemented.

- [ ] **Step 7: Implement autoplay and lifecycle cleanup**

Replace the temporary timer stub in `home.ts` with:

```ts
private readonly autoplayDelay = 6_000;
private readonly prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
private autoplayTimer: ReturnType<typeof setInterval> | undefined;
private interactionPaused = false;

constructor() {
  this.startAutoplay();
  this.destroyRef.onDestroy(() => this.stopAutoplay());
}

pauseAutoplay(): void {
  this.interactionPaused = true;
  this.stopAutoplay();
}

resumeAutoplay(): void {
  this.interactionPaused = false;
  this.startAutoplay();
}

private restartAutoplay(): void {
  this.stopAutoplay();
  this.startAutoplay();
}

private startAutoplay(): void {
  if (this.prefersReducedMotion || this.interactionPaused || this.heroSlides.length < 2) {
    return;
  }

  this.autoplayTimer = window.setInterval(() => {
    this.activeSlideIndex.update((index) => (index + 1) % this.heroSlides.length);
  }, this.autoplayDelay);
}

private stopAutoplay(): void {
  if (this.autoplayTimer !== undefined) {
    window.clearInterval(this.autoplayTimer);
    this.autoplayTimer = undefined;
  }
}
```

- [ ] **Step 8: Run tests and confirm carousel logic passes**

Run:

```bash
npm test -- --watch=false
```

Expected: PASS for all `Home hero carousel` tests and the existing app tests.

- [ ] **Step 9: Commit the tested carousel logic**

```bash
git add src/app/pages/home/home.ts src/app/pages/home/home.spec.ts
git commit -m "feat: add home hero carousel behavior"
```

### Task 2: Accessible Responsive Carousel Presentation

**Files:**
- Modify: `src/app/pages/home/home.html`
- Modify: `src/app/pages/home/home.scss`
- Modify: `src/app/pages/home/home.spec.ts`

- [ ] **Step 1: Write failing DOM accessibility tests**

Append to `home.spec.ts`:

```ts
it('renders configured slides and accessible arrow controls', () => {
  const fixture = TestBed.createComponent(Home);
  fixture.detectChanges();

  const element = fixture.nativeElement as HTMLElement;
  const slides = element.querySelectorAll<HTMLImageElement>('.hero-slide');
  const previous = element.querySelector<HTMLButtonElement>('[aria-label="Show previous hero image"]');
  const next = element.querySelector<HTMLButtonElement>('[aria-label="Show next hero image"]');

  expect(slides).toHaveLength(3);
  expect(slides[0].classList.contains('is-active')).toBe(true);
  expect(slides[0].alt).toContain('St. Mina');
  expect(previous).not.toBeNull();
  expect(next).not.toBeNull();
});

it('updates the rendered active slide when an arrow is clicked', () => {
  const fixture = TestBed.createComponent(Home);
  fixture.detectChanges();

  const next = fixture.nativeElement.querySelector(
    '[aria-label="Show next hero image"]'
  ) as HTMLButtonElement;
  next.click();
  fixture.detectChanges();

  const slides = fixture.nativeElement.querySelectorAll('.hero-slide');
  expect(slides[1].classList.contains('is-active')).toBe(true);
});
```

- [ ] **Step 2: Run tests and confirm template tests fail**

Run:

```bash
npm test -- --watch=false
```

Expected: FAIL because the hero does not yet render `.hero-slide` images or arrow controls.

- [ ] **Step 3: Render slides and accessible controls**

Replace the opening hero section in `src/app/pages/home/home.html` with:

```html
<section
  class="hero"
  aria-roledescription="carousel"
  aria-label="Featured church images"
  (mouseenter)="pauseAutoplay()"
  (mouseleave)="resumeAutoplay()"
  (focusin)="pauseAutoplay()"
  (focusout)="resumeAutoplay()"
>
  <div class="hero-slides">
    @for (slide of heroSlides; track slide.src; let index = $index) {
      <img
        class="hero-slide"
        [class.is-active]="index === activeSlideIndex()"
        [src]="slide.src"
        [alt]="slide.alt"
        [attr.aria-hidden]="index !== activeSlideIndex()"
      />
    }
  </div>
  <div class="hero-overlay"></div>

  <button
    type="button"
    class="hero-arrow hero-arrow-previous"
    aria-label="Show previous hero image"
    (click)="showPreviousSlide()"
  >
    <span aria-hidden="true">&#10094;</span>
  </button>

  <div class="hero-content">
    <h1>Welcome<br /><span class="accent">Home</span></h1>
    <p>A place of worship, community, and spiritual growth in the Coptic Orthodox tradition.</p>
    <div class="hero-actions">
      <a routerLink="/about" class="btn btn-outline">Learn More</a>
    </div>
  </div>

  <button
    type="button"
    class="hero-arrow hero-arrow-next"
    aria-label="Show next hero image"
    (click)="showNextSlide()"
  >
    <span aria-hidden="true">&#10095;</span>
  </button>
</section>
```

- [ ] **Step 4: Add slide, transition, and arrow styles**

In `src/app/pages/home/home.scss`, remove `.hero-image` and its background image. Add:

```scss
.hero-slides,
.hero-slide {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.hero-slides {
  overflow: hidden;
}

.hero-slide {
  object-fit: cover;
  opacity: 0;
  transition: opacity 600ms ease;

  &.is-active {
    opacity: 1;
  }
}

.hero-overlay {
  z-index: 1;
  background:
    linear-gradient(to bottom, rgba(15, 26, 46, 0.25) 35%, rgba(26, 42, 74, 0.95)),
    linear-gradient(135deg, rgba(26, 42, 74, 0.55), rgba(15, 26, 46, 0.45));
}

.hero-content {
  z-index: 2;
}

.hero-arrow {
  position: absolute;
  z-index: 3;
  top: 50%;
  display: grid;
  width: 3rem;
  height: 3rem;
  place-items: center;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.55);
  border-radius: 50%;
  background: rgba(15, 26, 46, 0.55);
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  transform: translateY(-50%);
  transition:
    background 200ms ease,
    border-color 200ms ease;

  &:hover {
    border-color: $gold;
    background: rgba(15, 26, 46, 0.85);
  }

  &:focus-visible {
    outline: 3px solid $gold;
    outline-offset: 3px;
  }
}

.hero-arrow-previous {
  left: clamp(1rem, 4vw, 4rem);
}

.hero-arrow-next {
  right: clamp(1rem, 4vw, 4rem);
}
```

- [ ] **Step 5: Add mobile and reduced-motion rules**

Inside the existing `@media (max-width: 768px)` block, add:

```scss
.hero {
  min-height: 75vh;
}

.hero-content {
  padding-inline: 4.75rem;
}

.hero-arrow {
  width: 2.75rem;
  height: 2.75rem;
}

.hero-arrow-previous {
  left: 0.75rem;
}

.hero-arrow-next {
  right: 0.75rem;
}
```

Then add:

```scss
@media (prefers-reduced-motion: reduce) {
  .hero-slide,
  .hero-arrow {
    transition: none;
  }
}
```

- [ ] **Step 6: Run unit tests**

Run:

```bash
npm test -- --watch=false
```

Expected: PASS for all tests.

- [ ] **Step 7: Run the production build**

Run:

```bash
npm run build
```

Expected: build completes successfully with no TypeScript, Angular template, or component-style budget errors.

- [ ] **Step 8: Check desktop and mobile rendering**

Run:

```bash
npm start
```

At desktop width around 1440px and mobile width around 390px, verify:

- `hero.png` is initially active;
- arrows are visible, clickable, and do not overlap the heading;
- images cover the hero without horizontal overflow;
- overlay preserves readable text;
- focus pauses rotation and shows a visible focus ring;
- manual arrows wrap in both directions; and
- reduced-motion emulation disables autoplay and fades.

- [ ] **Step 9: Commit the presentation**

```bash
git add src/app/pages/home/home.html src/app/pages/home/home.scss src/app/pages/home/home.spec.ts
git commit -m "feat: render accessible responsive hero carousel"
```

### Task 3: Final Branch Verification

**Files:**
- Verify: `src/app/pages/home/home.ts`
- Verify: `src/app/pages/home/home.html`
- Verify: `src/app/pages/home/home.scss`
- Verify: `src/app/pages/home/home.spec.ts`

- [ ] **Step 1: Confirm only intended changes are present**

Run:

```bash
git status --short
git diff origin/qc...HEAD --stat
```

Expected: the carousel design/plan, home carousel implementation, and the user's pre-existing environment example correction are clearly distinguishable; no unrelated files are included in carousel commits.

- [ ] **Step 2: Run the complete verification suite**

Run:

```bash
npm test -- --watch=false
npm run build
```

Expected: both commands exit successfully.

- [ ] **Step 3: Review commits**

Run:

```bash
git log --oneline origin/qc..HEAD
```

Expected: focused documentation, carousel behavior, and carousel presentation commits are listed. The environment example correction remains outside carousel commits unless the user separately requests it be committed.
