# Home Ministries Image Wiring Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the placeholder ministry gradients on the home page and the full ministries page with the uploaded ministry images, using one shared data source so the two pages stay in sync.

**Architecture:** Put the ministry metadata in a single shared TypeScript module under the ministries page folder, then render both the home teaser and the full ministries listing from that same data. Keep the current page layouts, but switch the image containers to semantic `<img>` elements with `object-fit: cover` so the same assets work cleanly on mobile and desktop.

**Tech Stack:** Angular standalone components, TypeScript, SCSS, Angular control-flow templates, Vitest.

---

## File Structure

- Create `src/app/pages/ministries/ministries.data.ts`: shared ministry content and TypeScript types.
- Modify `src/app/pages/home/home.ts`: expose the shared ministry list to the home template.
- Modify `src/app/pages/home/home.html`: render the ministry teaser cards from data and add the fifth card.
- Modify `src/app/pages/home/home.scss`: restyle the teaser image containers for real images.
- Modify `src/app/pages/home/home.spec.ts`: verify the home teaser renders the expected cards and link.
- Modify `src/app/pages/ministries/ministries.ts`: expose the shared ministry list to the full page template.
- Modify `src/app/pages/ministries/ministries.html`: render the ministry detail blocks from data.
- Modify `src/app/pages/ministries/ministries.scss`: restyle the ministry image containers for real images.
- Create `src/app/pages/ministries/ministries.spec.ts`: verify the full page renders the expected image wiring and ordering.

### Task 1: Shared Ministry Content

**Files:**
- Create: `src/app/pages/ministries/ministries.data.ts`
- Create: `src/app/pages/ministries/ministries.data.spec.ts`

- [ ] **Step 1: Write the failing data test**

Add:

```ts
import { ministries } from './ministries.data';

describe('ministries.data', () => {
  it('exposes the five approved ministries in display order', () => {
    expect(
      ministries.map(({ title, imageSrc, alt }) => ({ title, imageSrc, alt }))
    ).toEqual([
      {
        title: 'Youth Ministry',
        imageSrc: 'assets/images/ministries/youthMinistry-upscaled-20260702-214734.webp',
        alt: 'Youth Ministry',
      },
      {
        title: 'Sunday School',
        imageSrc: 'assets/images/ministries/sundaySchool-upscaled-20260702-215436.webp',
        alt: 'Sunday School',
      },
      {
        title: 'Choir & Hymns',
        imageSrc: 'assets/images/ministries/choir-upscaled-20260702-215552.webp',
        alt: 'Choir and Hymns',
      },
      {
        title: 'Community Outreach',
        imageSrc: 'assets/images/ministries/communityOutreach-upscaled-20260702-220023.webp',
        alt: 'Community Outreach',
      },
      {
        title: 'Family Ministry',
        imageSrc: 'assets/images/ministries/familyOutreach-upscaled-20260702-220117.webp',
        alt: 'Family Ministry',
      },
    ]);
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run:

```bash
npm test -- --watch=false
```

Expected: the test fails because `ministries.data.ts` does not exist yet.

- [ ] **Step 3: Add the shared ministry module**

Add:

```ts
export interface MinistryContent {
  readonly title: string;
  readonly homeSummary: string;
  readonly detailSummary: string;
  readonly imageSrc: string;
  readonly alt: string;
  readonly bullets: readonly string[];
}

export const ministries = [
  {
    title: 'Youth Ministry',
    homeSummary: 'Engaging programs for teens and young adults to grow in faith.',
    detailSummary:
      'Our Youth Ministry provides a nurturing environment for teens and young adults to deepen their faith, build lasting friendships, and develop leadership skills.',
    imageSrc: 'assets/images/ministries/youthMinistry-upscaled-20260702-214734.webp',
    alt: 'Youth Ministry',
    bullets: [
      'Friday Youth Meetings — Bible studies, discussions, and fellowship',
      'Annual Youth Retreats — Spiritual growth in a camp setting',
      'Service Projects — Giving back to the community together',
      'Sports & Social Events — Building bonds through fun activities',
    ],
  },
  {
    title: 'Sunday School',
    homeSummary: 'Age-appropriate classes teaching the Orthodox faith to our children.',
    detailSummary:
      'Our Sunday School program serves children from pre-K through high school, teaching the Orthodox faith through engaging lessons, activities, and crafts.',
    imageSrc: 'assets/images/ministries/sundaySchool-upscaled-20260702-215436.webp',
    alt: 'Sunday School',
    bullets: [
      'Age-appropriate classes every Sunday after Liturgy',
      'Curriculum based on the Coptic Orthodox tradition',
      'Annual competitions and presentations',
      'Dedicated, trained teachers and volunteers',
    ],
  },
  {
    title: 'Choir & Hymns',
    homeSummary: 'Preserving the beautiful Coptic hymns and raising voices in worship.',
    detailSummary:
      "The Deacons' choir preserves and teaches the ancient Coptic hymns that have been sung for nearly two millennia, enriching our worship with beautiful melodies.",
    imageSrc: 'assets/images/ministries/choir-upscaled-20260702-215552.webp',
    alt: 'Choir and Hymns',
    bullets: [
      'Weekly hymns classes open to all ages',
      'Participation in Sunday Liturgy and special services',
      'Preservation of Coptic, Arabic, and English hymns',
      'Special presentations during feasts and celebrations',
    ],
  },
  {
    title: 'Community Outreach',
    homeSummary: 'Serving those in need through charity, food drives, and support programs.',
    detailSummary:
      'As servants of Christ, we are called to serve those in need. Our outreach ministry organizes initiatives to support our local community and beyond.',
    imageSrc: 'assets/images/ministries/communityOutreach-upscaled-20260702-220023.webp',
    alt: 'Community Outreach',
    bullets: [
      'Monthly food drives for local shelters',
      'Clothing and supply donations',
      'Hospital and nursing home visits',
      'Partnerships with local charitable organizations',
    ],
  },
  {
    title: 'Family Ministry',
    homeSummary: 'Supporting families in their spiritual journey through fellowship and formation.',
    detailSummary:
      'Supporting families in their spiritual journey through fellowship events, marriage enrichment programs, and parenting workshops.',
    imageSrc: 'assets/images/ministries/familyOutreach-upscaled-20260702-220117.webp',
    alt: 'Family Ministry',
    bullets: [
      'Family retreats and camping trips',
      'Marriage preparation and enrichment programs',
      'Parenting classes rooted in Orthodox principles',
      'Monthly family nights with food and fellowship',
    ],
  },
] as const satisfies readonly MinistryContent[];
```

- [ ] **Step 4: Run the test again**

Run:

```bash
npm test -- --watch=false
```

Expected: the new data test passes.

### Task 2: Home Ministry Teaser

**Files:**
- Modify: `src/app/pages/home/home.ts`
- Modify: `src/app/pages/home/home.html`
- Modify: `src/app/pages/home/home.scss`
- Modify: `src/app/pages/home/home.spec.ts`

- [ ] **Step 1: Write the failing home-page test**

Add:

```ts
it('renders five ministry teaser cards from the shared ministry data', () => {
  const fixture = TestBed.createComponent(Home);
  fixture.detectChanges();

  const element = fixture.nativeElement as HTMLElement;
  const cards = element.querySelectorAll<HTMLElement>('.ministries-preview .ministry-card');
  const images = element.querySelectorAll<HTMLImageElement>('.ministries-preview .ministry-card img');
  const explore = element.querySelector<HTMLAnchorElement>('.ministries-preview .section-action a');

  expect(cards).toHaveLength(5);
  expect(images).toHaveLength(5);
  expect(images[0].src).toContain('youthMinistry-upscaled-20260702-214734.webp');
  expect(images[4].src).toContain('familyOutreach-upscaled-20260702-220117.webp');
  expect(explore?.getAttribute('href')).toContain('/ministries');
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run:

```bash
npm test -- --watch=false
```

Expected: the home test fails because the teaser section still renders four placeholder gradient panels.

- [ ] **Step 3: Bind the home page to the shared ministry list**

Update `home.ts` to import the shared list:

```ts
import { ministries as ministryContent } from '../ministries/ministries.data';

export class Home {
  readonly ministries = ministryContent;
}
```

Update `home.html` to render the teaser cards from data:

```html
<section class="section ministries-preview">
  <div class="container">
    <h2 class="section-title">Our Ministries</h2>
    <p class="section-subtitle">Serving God through community, education, and outreach</p>
    <div class="ministries-grid">
      @for (ministry of ministries; track ministry.title) {
        <article class="ministry-card">
          <div class="ministry-image">
            <img [src]="ministry.imageSrc" [alt]="ministry.alt" loading="lazy" />
          </div>
          <div class="ministry-info">
            <h3>{{ ministry.title }}</h3>
            <p>{{ ministry.homeSummary }}</p>
          </div>
        </article>
      }
    </div>
    <div class="section-action">
      <a routerLink="/ministries" class="btn btn-navy">Explore Ministries</a>
    </div>
  </div>
</section>
```

Update `home.scss` to support real images:

```scss
.ministries-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1.5rem;
}

.ministry-image {
  height: 180px;
  overflow: hidden;
  background: #f2f2ed;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
```

- [ ] **Step 4: Run the home tests**

Run:

```bash
npm test -- --watch=false
```

Expected: the home test passes and the teaser section now shows five image cards.

### Task 3: Full Ministries Page

**Files:**
- Modify: `src/app/pages/ministries/ministries.ts`
- Modify: `src/app/pages/ministries/ministries.html`
- Modify: `src/app/pages/ministries/ministries.scss`
- Create: `src/app/pages/ministries/ministries.spec.ts`

- [ ] **Step 1: Write the failing ministries-page test**

Add:

```ts
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Ministries } from './ministries';

describe('Ministries page', () => {
  it('renders the five ministries from the shared image list', () => {
    const fixture = TestBed.configureTestingModule({
      imports: [Ministries],
      providers: [provideRouter([])],
    }).createComponent(Ministries);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const blocks = element.querySelectorAll<HTMLElement>('.ministries-list .ministry-block');
    const images = element.querySelectorAll<HTMLImageElement>('.ministries-list .ministry-image img');

    expect(blocks).toHaveLength(5);
    expect(images).toHaveLength(5);
    expect(images[0].src).toContain('youthMinistry-upscaled-20260702-214734.webp');
    expect(images[4].src).toContain('familyOutreach-upscaled-20260702-220117.webp');
    expect(
      element.querySelectorAll<HTMLElement>('.ministries-list .ministry-block')[0].textContent
    ).toContain('Youth Ministry');
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run:

```bash
npm test -- --watch=false
```

Expected: the ministries-page test fails because the page is still hard-coded with gradient panels.

- [ ] **Step 3: Render the ministries page from the shared data**

Update `ministries.ts` to expose the shared list:

```ts
import { ministries as ministryContent } from './ministries.data';

export class Ministries {
  readonly ministries = ministryContent;
}
```

Update `ministries.html` to render each ministry from the list:

```html
<section class="section">
  <div class="container">
    <div class="ministries-list">
      @for (ministry of ministries; track ministry.title; let odd = $odd) {
        <div class="ministry-block" [class.reverse]="odd">
          <div class="ministry-image">
            <img [src]="ministry.imageSrc" [alt]="ministry.alt" loading="lazy" />
          </div>
          <div class="ministry-details">
            <h2>{{ ministry.title }}</h2>
            <p>{{ ministry.detailSummary }}</p>
            <ul>
              @for (bullet of ministry.bullets; track bullet) {
                <li>{{ bullet }}</li>
              }
            </ul>
          </div>
        </div>
      }
    </div>
  </div>
</section>
```

Update `ministries.scss` for the image wrapper:

```scss
.ministry-image {
  min-height: 280px;
  background: #f2f2ed;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
```

- [ ] **Step 4: Run the ministries page test**

Run:

```bash
npm test -- --watch=false
```

Expected: the ministries-page test passes and the page keeps the same order and content, only with real images.

### Task 4: Final Verification and Cleanup

**Files:**
- Modify: `src/app/pages/home/home.scss`
- Modify: `src/app/pages/ministries/ministries.scss`
- Modify: `src/app/pages/home/home.spec.ts`
- Create or modify: `src/app/pages/ministries/ministries.spec.ts`

- [ ] **Step 1: Remove any leftover gradient-specific image classes**

Delete the old `.youth`, `.sunday-school`, `.choir`, `.outreach`, and `.family` background rules from both stylesheets so the UI no longer depends on CSS-painted placeholders.

- [ ] **Step 2: Run the full test suite**

Run:

```bash
npm test -- --watch=false
```

Expected: the full unit-test suite passes.

- [ ] **Step 3: Run a production build**

Run:

```bash
npm run build
```

Expected: the build succeeds with the ministry images wired through both pages.

- [ ] **Step 4: Commit the implementation**

Run:

```bash
git add src/app/pages/ministries/ministries.data.ts src/app/pages/ministries/ministries.data.spec.ts src/app/pages/home/home.ts src/app/pages/home/home.html src/app/pages/home/home.scss src/app/pages/home/home.spec.ts src/app/pages/ministries/ministries.ts src/app/pages/ministries/ministries.html src/app/pages/ministries/ministries.scss src/app/pages/ministries/ministries.spec.ts
git commit -m "feat: wire ministries images"
```
