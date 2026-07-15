# Home Clergy Alignment Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Normalize clergy portrait framing, create a deliberate text hierarchy, and align collapsed biographies with accessible Read More controls.

**Architecture:** Extend each clergy entry with explicit crop values and maintain expanded biographies in one signal-backed set. Keep the existing data-driven template while adding crop styles, aligned content rows, a two-line clamp, and per-profile expansion buttons.

**Tech Stack:** Angular 21 signals/templates, TypeScript, SCSS, Vitest.

---

### Task 1: Crop and Expansion State

**Files:**
- Modify: `src/app/pages/home/home.ts`
- Modify: `src/app/pages/home/home.spec.ts`

- [ ] **Step 1: Write failing state tests**

Add tests that assert every clergy entry has `imageScale` and `imageOffsetY`, all
profiles begin collapsed, toggling one name expands only that name, and toggling
again collapses it:

```ts
it('defines an explicit crop for every clergy portrait', () => {
  const component = TestBed.createComponent(Home).componentInstance;
  expect(component.clergy.every((member) => member.imageScale > 0)).toBe(true);
  expect(component.clergy.every((member) => Number.isFinite(member.imageOffsetY))).toBe(true);
});

it('expands and collapses clergy biographies independently', () => {
  const component = TestBed.createComponent(Home).componentInstance;
  expect(component.isClergyExpanded('Fr. Boutros Boutros')).toBe(false);
  component.toggleClergyBiography('Fr. Boutros Boutros');
  expect(component.isClergyExpanded('Fr. Boutros Boutros')).toBe(true);
  expect(component.isClergyExpanded('Fr. Kyrillos Zaki')).toBe(false);
  component.toggleClergyBiography('Fr. Boutros Boutros');
  expect(component.isClergyExpanded('Fr. Boutros Boutros')).toBe(false);
});
```

- [ ] **Step 2: Run tests and confirm compilation failure**

Run `npm test -- --watch=false`.

- [ ] **Step 3: Implement crop data and expansion state**

Add required numeric `imageScale` and `imageOffsetY` fields to `ClergyMember`.
Use these crop values:

- Boutros: scale `1.08`, vertical offset `8`
- Kyrillos: scale `1.16`, vertical offset `-4`
- Youaness: scale `1.1`, vertical offset `-3`

Add:

```ts
private readonly expandedClergyNames = signal<ReadonlySet<string>>(new Set());

isClergyExpanded(name: string): boolean {
  return this.expandedClergyNames().has(name);
}

toggleClergyBiography(name: string): void {
  this.expandedClergyNames.update((current) => {
    const next = new Set(current);
    next.has(name) ? next.delete(name) : next.add(name);
    return next;
  });
}
```

- [ ] **Step 4: Run tests**

Run `npm test -- --watch=false`; expect all tests to pass.

### Task 2: Aligned Hierarchy and Read More UI

**Files:**
- Modify: `src/app/pages/home/home.html`
- Modify: `src/app/pages/home/home.scss`
- Modify: `src/app/pages/home/home.spec.ts`

- [ ] **Step 1: Write failing DOM tests**

Verify there are three `.clergy-toggle` buttons, all initially say `Read More`
with `aria-expanded="false"`, clicking the second changes only it to `Show Less`
and sets `aria-expanded="true"`.

- [ ] **Step 2: Run tests and confirm failure**

Run `npm test -- --watch=false`.

- [ ] **Step 3: Wire crop values and expansion controls**

Apply this image transform:

```html
[style.transform]="'translateY(' + member.imageOffsetY + 'px) scale(' + member.imageScale + ')'"
```

Bind the summary class:

```html
[class.is-expanded]="isClergyExpanded(member.name)"
```

Add after each summary:

```html
<button
  type="button"
  class="clergy-toggle"
  [attr.aria-expanded]="isClergyExpanded(member.name)"
  (click)="toggleClergyBiography(member.name)"
>
  {{ isClergyExpanded(member.name) ? 'Show Less' : 'Read More' }}
</button>
```

- [ ] **Step 4: Refine hierarchy and alignment**

Use fixed collapsed row minimums, muted role color, darker section subtitle,
two-line summary clamp, and a subtle gold-outline action:

```scss
.clergy-section > .container > .section-subtitle {
  color: #4f5663;
}

.clergy-card-content {
  display: grid;
  grid-template-rows: minmax(2rem, auto) minmax(3.25rem, auto) auto auto;
  max-width: 23rem;
  margin-inline: auto;
}

.clergy-role {
  min-height: 2.8em;
  color: #596579;
  font-weight: 600;
}

.clergy-summary {
  min-height: 3.3em;
  overflow: hidden;
  color: #60656f;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  &.is-expanded {
    display: block;
    -webkit-line-clamp: unset;
  }
}

.clergy-toggle {
  justify-self: center;
  margin-top: 1rem;
  padding: 0.55rem 1.1rem;
  border: 1px solid $gold;
  border-radius: 999px;
  background: transparent;
  color: $navy;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}
```

On mobile, reset the role and summary minimum heights to `0`. Add focus, hover,
and reduced-motion treatments consistent with existing gold accents.

- [ ] **Step 5: Run full verification**

Run:

```bash
npm test -- --watch=false
npm run build
```

Expected: all tests pass and the build succeeds, apart from the existing
unrelated livestream stylesheet warning.

- [ ] **Step 6: Commit**

```bash
git add src/app/pages/home/home.ts src/app/pages/home/home.html src/app/pages/home/home.scss src/app/pages/home/home.spec.ts
git commit -m "refine clergy section alignment and hierarchy"
```

### Task 3: Scope Check

- [ ] Run `git status --short` and preserve the user's untracked ministry assets.
