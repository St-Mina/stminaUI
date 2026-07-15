# Home Clergy Circular Portraits Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the homepage clergy section as open profiles with compact circular portraits while preserving all approved content.

**Architecture:** Add one presentational portrait wrapper to the existing data-driven clergy template. Replace rectangular card styles with centered profile columns and circular image treatment; no content model or component changes are required.

**Tech Stack:** Angular 21 templates, SCSS, Vitest through Angular's unit-test builder.

---

### Task 1: Circular Profile Markup and Styling

**Files:**
- Modify: `src/app/pages/home/home.spec.ts`
- Modify: `src/app/pages/home/home.html`
- Modify: `src/app/pages/home/home.scss`

- [ ] **Step 1: Write the failing structure test**

Extend the existing clergy DOM test:

```ts
const portraits = element.querySelectorAll<HTMLElement>('.clergy-portrait');
expect(portraits).toHaveLength(3);
expect(portraits[0].querySelector('img')?.alt).toBe('Fr. Boutros Boutros');
```

- [ ] **Step 2: Run tests and confirm failure**

Run `npm test -- --watch=false`.

Expected: the clergy test fails because `.clergy-portrait` does not exist.

- [ ] **Step 3: Add the portrait wrapper**

Replace the direct image inside each clergy article with:

```html
<div class="clergy-portrait">
  <img
    [src]="member.imageSrc"
    [alt]="member.name"
    [style.object-position]="member.imagePosition ?? 'center top'"
    loading="lazy"
  />
</div>
```

- [ ] **Step 4: Replace card presentation with open profiles**

Update the clergy rules to:

```scss
.clergy-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(2rem, 5vw, 4rem);
}

.clergy-card {
  text-align: center;
}

.clergy-portrait {
  width: clamp(11.875rem, 18vw, 13.75rem);
  aspect-ratio: 1;
  margin: 0 auto 1.5rem;
  overflow: hidden;
  border: 3px solid rgba($gold, 0.85);
  border-radius: 50%;
  box-shadow: 0 8px 24px rgba(15, 26, 46, 0.16);
  transition:
    transform 200ms ease,
    box-shadow 200ms ease;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    transform: scale(1.025);
    box-shadow: 0 12px 30px rgba(15, 26, 46, 0.22);
  }
}

.clergy-card-content {
  max-width: 23rem;
  margin-inline: auto;

  h3 {
    margin: 0 0 0.5rem;
    color: $navy;
    font-size: 1.3rem;
  }
}
```

Remove the old card background, rectangular image, overflow, radius, whole-card
shadow, padding, and hover-lift rules.

Inside the mobile media query retain the single-column clergy grid and add:

```scss
.clergy-grid {
  gap: 3rem;
}
```

Update reduced motion to target `.clergy-portrait` instead of `.clergy-card`.

- [ ] **Step 5: Run tests**

Run `npm test -- --watch=false`.

Expected: all tests pass.

- [ ] **Step 6: Run production build**

Run `npm run build`.

Expected: build succeeds; the existing unrelated livestream stylesheet warning may remain.

- [ ] **Step 7: Commit**

```bash
git add src/app/pages/home/home.html src/app/pages/home/home.scss src/app/pages/home/home.spec.ts
git commit -m "style: use circular clergy portraits"
```

### Task 2: Final Scope Check

- [ ] **Step 1: Verify clean branch state**

Run:

```bash
git status --short
git diff --stat origin/qc...HEAD
```

Expected: a clean `fix/homepage` branch containing only approved homepage work, assets, and documentation.
