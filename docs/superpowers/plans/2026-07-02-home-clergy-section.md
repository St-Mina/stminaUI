# Home Clergy Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage's placeholder deacon cards with a responsive, data-driven clergy section using the three supplied portraits and approved concise biographies.

**Architecture:** Define immutable clergy content in the existing `Home` component and render semantic cards from that configuration. Keep presentation in the existing home stylesheet, with one responsive grid and optional per-image focal positioning.

**Tech Stack:** Angular 21 standalone components, TypeScript, SCSS, Vitest through Angular's unit-test builder.

---

## File Structure

- Modify `src/app/pages/home/home.ts`: clergy model and approved content.
- Modify `src/app/pages/home/home.html`: semantic, data-driven clergy section.
- Modify `src/app/pages/home/home.scss`: responsive portrait-card presentation.
- Modify `src/app/pages/home/home.spec.ts`: configuration and rendered-content tests.
- Add `src/assets/images/clergy/*.webp`: three approved portraits only.

### Task 1: Clergy Configuration

**Files:**
- Modify: `src/app/pages/home/home.spec.ts`
- Modify: `src/app/pages/home/home.ts`

- [ ] **Step 1: Write the failing configuration test**

Add:

```ts
it('defines the approved clergy content and portraits', () => {
  const component = TestBed.createComponent(Home).componentInstance;

  expect(component.clergy.map(({ name, role, imageSrc }) => ({ name, role, imageSrc }))).toEqual([
    {
      name: 'Fr. Boutros Boutros',
      role: 'Hegumen and priest of St. Mina Coptic Orthodox Church',
      imageSrc: 'assets/images/clergy/FrBoutrosBoutros.webp',
    },
    {
      name: 'Fr. Kyrillos Zaki',
      role: 'Priest of St. Mina Coptic Orthodox Church',
      imageSrc: 'assets/images/clergy/FrKyrillosZaki.webp',
    },
    {
      name: 'Fr. Youaness Seraphim',
      role: 'General priest of the Southern Diocese',
      imageSrc: 'assets/images/clergy/FrYoanessSerafeem.webp',
    },
  ]);
});
```

- [ ] **Step 2: Run tests and confirm failure**

Run `npm test -- --watch=false`.

Expected: compilation fails because `clergy` does not exist.

- [ ] **Step 3: Add the clergy model and approved content**

Add:

```ts
interface ClergyMember {
  readonly name: string;
  readonly role: string;
  readonly summary: string;
  readonly imageSrc: string;
  readonly imagePosition?: string;
}
```

Add to `Home`:

```ts
readonly clergy: readonly ClergyMember[] = [
  {
    name: 'Fr. Boutros Boutros',
    role: 'Hegumen and priest of St. Mina Coptic Orthodox Church',
    summary:
      'Ordained in 1997 and elevated to hegumen in 2017, Fr. Boutros has served St. Mina and the Southern Diocese for more than two decades.',
    imageSrc: 'assets/images/clergy/FrBoutrosBoutros.webp',
    imagePosition: 'center 30%',
  },
  {
    name: 'Fr. Kyrillos Zaki',
    role: 'Priest of St. Mina Coptic Orthodox Church',
    summary:
      'Ordained in 2025, Fr. Kyrillos serves the St. Mina congregation in Nashville within the Diocese of the Southern United States.',
    imageSrc: 'assets/images/clergy/FrKyrillosZaki.webp',
  },
  {
    name: 'Fr. Youaness Seraphim',
    role: 'General priest of the Southern Diocese',
    summary:
      'Ordained in 1978 and elevated to hegumen in 2005, Fr. Youaness serves churches throughout the Southern Diocese, especially in Nashville.',
    imageSrc: 'assets/images/clergy/FrYoanessSerafeem.webp',
  },
];
```

- [ ] **Step 4: Run tests**

Run `npm test -- --watch=false`.

Expected: all tests pass.

### Task 2: Semantic Responsive Cards

**Files:**
- Modify: `src/app/pages/home/home.spec.ts`
- Modify: `src/app/pages/home/home.html`
- Modify: `src/app/pages/home/home.scss`
- Add: `src/assets/images/clergy/FrBoutrosBoutros.webp`
- Add: `src/assets/images/clergy/FrKyrillosZaki.webp`
- Add: `src/assets/images/clergy/FrYoanessSerafeem.webp`

- [ ] **Step 1: Write failing DOM tests**

Add:

```ts
it('renders the Our Clergy section with three semantic portrait cards', () => {
  const fixture = TestBed.createComponent(Home);
  fixture.detectChanges();

  const element = fixture.nativeElement as HTMLElement;
  const heading = element.querySelector('.clergy-section .section-title');
  const cards = element.querySelectorAll<HTMLElement>('.clergy-card');
  const images = element.querySelectorAll<HTMLImageElement>('.clergy-card img');

  expect(heading?.textContent?.trim()).toBe('Our Clergy');
  expect(cards).toHaveLength(3);
  expect(images).toHaveLength(3);
  expect(images[0].alt).toBe('Fr. Boutros Boutros');
  expect(element.textContent).not.toContain('Our Deacons');
});
```

- [ ] **Step 2: Run tests and confirm failure**

Run `npm test -- --watch=false`.

Expected: the DOM test fails because the clergy section does not exist.

- [ ] **Step 3: Replace the deacon markup**

Replace the existing deacon section with:

```html
<section class="section clergy-section">
  <div class="container">
    <h2 class="section-title">Our Clergy</h2>
    <p class="section-subtitle">Faithful shepherds serving our parish and the Southern Diocese</p>
    <div class="clergy-grid">
      @for (member of clergy; track member.name) {
        <article class="clergy-card">
          <img
            [src]="member.imageSrc"
            [alt]="member.name"
            [style.object-position]="member.imagePosition ?? 'center top'"
            loading="lazy"
          />
          <div class="clergy-card-content">
            <h3>{{ member.name }}</h3>
            <p class="clergy-role">{{ member.role }}</p>
            <p class="clergy-summary">{{ member.summary }}</p>
          </div>
        </article>
      }
    </div>
  </div>
</section>
```

- [ ] **Step 4: Replace the deacon styles**

Replace `.deacons-*` and `.deacon-*` rules with:

```scss
.clergy-section {
  background: #fff;
}

.clergy-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2rem;
}

.clergy-card {
  overflow: hidden;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 16px rgba(15, 26, 46, 0.1);
  transition:
    transform 200ms ease,
    box-shadow 200ms ease;

  > img {
    display: block;
    width: 100%;
    aspect-ratio: 4 / 5;
    object-fit: cover;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 28px rgba(15, 26, 46, 0.16);
  }
}

.clergy-card-content {
  padding: 1.5rem;

  h3 {
    margin: 0 0 0.5rem;
    color: $navy;
    font-size: 1.3rem;
  }
}

.clergy-role {
  margin: 0 0 0.85rem;
  color: $gold;
  font-weight: 700;
  line-height: 1.4;
}

.clergy-summary {
  margin: 0;
  color: #555;
  line-height: 1.65;
}
```

Inside the mobile media query add:

```scss
.clergy-grid {
  grid-template-columns: 1fr;
  max-width: 32rem;
  margin-inline: auto;
}
```

Inside the reduced-motion query add `.clergy-card`.

- [ ] **Step 5: Stage only real portrait assets**

Run:

```bash
git add src/assets/images/clergy/FrBoutrosBoutros.webp
git add src/assets/images/clergy/FrKyrillosZaki.webp
git add src/assets/images/clergy/FrYoanessSerafeem.webp
```

Do not stage files beginning with `._`.

- [ ] **Step 6: Run verification**

Run:

```bash
npm test -- --watch=false
npm run build
```

Expected: all tests pass and the production build completes. The existing unrelated livestream stylesheet budget warning may remain.

- [ ] **Step 7: Commit**

```bash
git add src/app/pages/home/home.ts src/app/pages/home/home.html src/app/pages/home/home.scss src/app/pages/home/home.spec.ts
git commit -m "feat: replace deacons with clergy section"
```

### Task 3: Final Scope Check

**Files:**
- Verify the four home files, three WebP portraits, and clergy docs.

- [ ] **Step 1: Confirm branch scope and metadata exclusion**

Run:

```bash
git status --short
git diff --stat origin/qc...HEAD
git ls-files 'src/assets/images/clergy/*'
```

Expected: the three WebP portraits are tracked; no `._*` metadata files are tracked; branch changes remain limited to the approved homepage work and documentation.
