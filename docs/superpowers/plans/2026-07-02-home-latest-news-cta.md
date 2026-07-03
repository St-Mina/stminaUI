# Home Latest News CTA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the WordPress-backed home page news feed with a static three-card `Latest News` section that reads like an invitation to pray and still feels easy to swap to real church news later.

**Architecture:** Keep the section on the home page, but replace the async posts stream with a small immutable local data list that the template renders directly. The cards stay static, so there is no carousel or timer logic, and the layout uses a three-column desktop grid that collapses to a vertical stack on mobile.

**Tech Stack:** Angular standalone components, TypeScript, SCSS, Angular control-flow templates, Vitest.

---

## File Structure

- Create `src/app/pages/home/latest-news.data.ts`: local latest-news card content and types.
- Modify `src/app/pages/home/home.ts`: remove WordPress news fetching and expose static latest-news cards.
- Modify `src/app/pages/home/home.html`: render the `Latest News` section from the static cards.
- Modify `src/app/pages/home/home.scss`: style the static three-card layout for desktop and mobile.
- Modify `src/app/pages/home/home.spec.ts`: verify the static news cards, section label, and removal of WordPress-backed states.

### Task 1: Static Latest-News Content

**Files:**
- Create: `src/app/pages/home/latest-news.data.ts`
- Create: `src/app/pages/home/latest-news.data.spec.ts`

- [ ] **Step 1: Write the failing data test**

Add:

```ts
import { latestNewsCards } from './latest-news.data';

describe('latestNewsCards', () => {
  it('exposes the approved three-card feast-first CTA copy', () => {
    expect(latestNewsCards).toEqual([
      {
        title: 'St. Febronia the Ascetic',
        dateLabel: 'July 8, 2026',
        cta: 'Join us in prayer as we remember St. Febronia on July 8.',
      },
      {
        title: 'Sts. Peter and Paul, the Apostles',
        dateLabel: 'July 12, 2026',
        cta: "Join us in prayer as the Apostles' Feast concludes on July 12.",
      },
      {
        title: 'St. Aoulimpas the Apostle',
        dateLabel: 'July 13, 2026',
        cta: 'Join us in prayer as we continue the apostolic feast days.',
      },
    ]);
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run:

```bash
npx ng test --watch=false --filter='latestNewsCards'
```

Expected: the test fails because `latest-news.data.ts` does not exist yet.

- [ ] **Step 3: Add the shared latest-news module**

Add:

```ts
export interface LatestNewsCard {
  readonly title: string;
  readonly dateLabel: string;
  readonly cta: string;
}

export const latestNewsCards: readonly LatestNewsCard[] = [
  {
    title: 'St. Febronia the Ascetic',
    dateLabel: 'July 8, 2026',
    cta: 'Join us in prayer as we remember St. Febronia on July 8.',
  },
  {
    title: 'Sts. Peter and Paul, the Apostles',
    dateLabel: 'July 12, 2026',
    cta: "Join us in prayer as the Apostles' Feast concludes on July 12.",
  },
  {
    title: 'St. Aoulimpas the Apostle',
    dateLabel: 'July 13, 2026',
    cta: 'Join us in prayer as we continue the apostolic feast days.',
  },
] as const;
```

- [ ] **Step 4: Run the test again**

Run:

```bash
npx ng test --watch=false --filter='latestNewsCards'
```

Expected: the data test passes.

### Task 2: Home Page Latest News Section

**Files:**
- Modify: `src/app/pages/home/home.ts`
- Modify: `src/app/pages/home/home.html`
- Modify: `src/app/pages/home/home.scss`
- Modify: `src/app/pages/home/home.spec.ts`

- [ ] **Step 1: Write the failing home-page test**

Add:

```ts
it('renders three static latest-news cards with feast-first CTA copy', () => {
  const fixture = TestBed.createComponent(Home);
  fixture.detectChanges();

  const element = fixture.nativeElement as HTMLElement;
  const cards = element.querySelectorAll<HTMLElement>('.news-section .news-card');
  const heading = element.querySelector('.news-section .section-title');

  expect(heading?.textContent?.trim()).toBe('Latest News');
  expect(cards).toHaveLength(3);
  expect(element.textContent).toContain('St. Febronia the Ascetic');
  expect(element.textContent).toContain('Join us in prayer as we remember St. Febronia on July 8.');
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run:

```bash
npx ng test --watch=false --filter='Home'
```

Expected: the home test fails because the section is still backed by WordPress posts and dynamic loading states.

- [ ] **Step 3: Replace the WordPress-backed feed with static cards**

Update `home.ts` to remove the WordPress dependency and expose the local data:

```ts
import { latestNewsCards } from './latest-news.data';

export class Home {
  readonly latestNewsCards = latestNewsCards;
}
```

Delete the following from `home.ts`:

```ts
import { catchError, of } from 'rxjs';
import { WordpressService } from '../../services/wordpress.service';

private readonly wordpressService = inject(WordpressService);

protected readonly errorMessage = signal<string | null>(null);
protected readonly posts$ = this.wordpressService.getLatestPosts(3).pipe(
  catchError(() => {
    this.errorMessage.set('Unable to load posts right now.');
    return of([]);
  })
);
```

Update `home.html` to render the cards directly:

```html
<section class="section news-section">
  <div class="container">
    <h2 class="section-title">Latest News</h2>
    <p class="section-subtitle">Stay updated with our church announcements</p>

    <div class="news-grid">
      @for (card of latestNewsCards; track card.title) {
        <article class="news-card">
          <div class="news-card-inner">
            <p class="news-date">{{ card.dateLabel }}</p>
            <h3>{{ card.title }}</h3>
            <p class="news-cta">{{ card.cta }}</p>
          </div>
        </article>
      }
    </div>
  </div>
</section>
```

Update `home.scss` to use a static three-card layout:

```scss
.news-section {
  background: $bg-light;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}

.news-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.news-card-inner {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-height: 100%;
  padding: 1.5rem;
}

.news-date {
  margin: 0;
  color: $gold;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.news-card h3 {
  margin: 0;
  color: $navy;
  font-size: 1.15rem;
}

.news-cta {
  margin: 0;
  color: #555;
  font-size: 0.95rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 4: Run the home test again**

Run:

```bash
npx ng test --watch=false --filter='Home'
```

Expected: the home test passes and the `Latest News` section renders three static cards with no WordPress loading or error states.

### Task 3: Final Verification and Cleanup

**Files:**
- Modify: `src/app/pages/home/home.spec.ts`
- Modify: `src/app/pages/home/home.ts`
- Modify: `src/app/pages/home/home.html`
- Modify: `src/app/pages/home/home.scss`
- Create or modify: `src/app/pages/home/latest-news.data.spec.ts`

- [ ] **Step 1: Remove any leftover WordPress-specific news assertions**

Delete or rewrite any home-page tests that expect `posts$`, `errorMessage`, `No announcements yet.`, or `Unable to load posts right now.` so the test suite only reflects the new static section.

- [ ] **Step 2: Run the full test suite**

Run:

```bash
npx ng test --watch=false
```

Expected: the full unit-test suite passes.

- [ ] **Step 3: Run a production build**

Run:

```bash
npm run build
```

Expected: the build succeeds with the static latest-news section wired into the home page.

- [ ] **Step 4: Commit the implementation**

Run:

```bash
git add src/app/pages/home/latest-news.data.ts src/app/pages/home/latest-news.data.spec.ts src/app/pages/home/home.ts src/app/pages/home/home.html src/app/pages/home/home.scss src/app/pages/home/home.spec.ts
git commit -m "feat: add static latest news cards"
```
