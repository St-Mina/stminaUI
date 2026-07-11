# Give Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Give page's non-functional donation form and fabricated stewardship stats with a modern, honest directory of the church's real giving methods (Direct Deposit, Zelle, By Check, In Person, Planned Giving).

**Architecture:** Single Angular standalone component (`Give`) gets its template, styles, and component class rewritten in place. No new components, no new routes, no new dependencies, no new image assets — every photo used already exists in `src/assets/images/imgAssets/`.

**Tech Stack:** Angular (standalone components, signals, `@for`/`@if` control flow), SCSS.

Design spec: `docs/superpowers/specs/2026-07-10-give-page-redesign-design.md`

---

## Before You Start

Read `docs/superpowers/specs/2026-07-10-give-page-redesign-design.md` for the full rationale. The short version: the current page has a donation form wired to nothing (no payment processor exists anywhere in this codebase) and a "Transparent Stewardship" section with made-up percentages. Both are being deleted. What replaces them is a static directory of the real ways to give, styled to match the rest of the site (navy `#1B2A44` / gold `#C9A084`, Playfair Display headings, Inter body text).

Confirm these three files exist before editing:
- `src/app/pages/give/give.html`
- `src/app/pages/give/give.ts`
- `src/app/pages/give/give.scss`

Confirm these image assets exist (all reused, none created):
- `src/assets/images/imgAssets/hero.png`
- `src/assets/images/imgAssets/candle.png`
- `src/assets/images/imgAssets/family.png`
- `public/images/pages/give/zelle.png`

```bash
ls src/app/pages/give/give.html src/app/pages/give/give.ts src/app/pages/give/give.scss
ls src/assets/images/imgAssets/hero.png src/assets/images/imgAssets/candle.png src/assets/images/imgAssets/family.png
ls public/images/pages/give/zelle.png
```

Expected: all seven paths print with no "No such file" errors.

---

### Task 1: Rewrite the Give page template

**Files:**
- Modify: `src/app/pages/give/give.html` (full replacement)

- [ ] **Step 1: Replace the entire contents of `give.html`**

```html
<!-- Hero -->
<section class="hero">
  <img class="hero-photo" src="assets/images/imgAssets/hero.png" alt="St. Mina Coptic Orthodox Church at sunset" />
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <svg class="hero-cross" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M11 2v5H6v2h5v13h2V9h5V7h-5V2h-2z" fill="#C9A084"/>
    </svg>
    <h1>Give with <em>Faith &amp; Love</em></h1>
    <p class="hero-verse">
      "So let each one give as he purposes in his heart, not grudgingly or of necessity; for God loves a cheerful giver."
      <cite>2 Corinthians 9:7 (NKJV)</cite>
    </p>
  </div>
</section>

<!-- Ways to Give -->
<section class="ways-section">
  <div class="ways-container">
    <h2>Ways to Give</h2>

    <div class="ways-row methods-row">
      <div class="way-card">
        <div class="way-icon">
          <svg width="24" height="30" viewBox="0 0 24 24" fill="none">
            <path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z" fill="#C9A084"/>
          </svg>
        </div>
        <h3>Direct Deposit</h3>
        <p>
          <span>Account# 000112980412</span>
          <span>Routing# 064000020</span>
        </p>
      </div>

      <div class="way-card way-card--preferred">
        <span class="way-badge">Preferred</span>
        <div class="way-icon">
          <svg width="24" height="30" viewBox="0 0 24 24" fill="none">
            <path d="M13.559 24h-2.841a0.483 0.483 0 0 1 -0.483 -0.483v-2.765H5.638a0.667 0.667 0 0 1 -0.666 -0.666v-2.234a0.67 0.67 0 0 1 0.142 -0.412l8.139 -10.382h-7.25a0.667 0.667 0 0 1 -0.667 -0.667V3.914c0 -0.367 0.299 -0.666 0.666 -0.666h4.23V0.483c0 -0.266 0.217 -0.483 0.483 -0.483h2.841c0.266 0 0.483 0.217 0.483 0.483v2.765h4.323c0.367 0 0.666 0.299 0.666 0.666v2.137a0.67 0.67 0 0 1 -0.141 0.41l-8.19 10.481h7.665c0.367 0 0.666 0.299 0.666 0.666v2.477a0.667 0.667 0 0 1 -0.666 0.667h-4.32v2.765a0.483 0.483 0 0 1 -0.483 0.483Z" fill="#C9A084"/>
          </svg>
        </div>
        <h3>Zelle</h3>
        <p>Phone No. 615-293-1008</p>
        <img class="way-qr" src="images/pages/give/zelle.png" alt="Zelle QR code — scan to enroll and send a gift" loading="lazy" />
        <span class="way-note">Scan to give securely</span>
      </div>

      <div class="way-card">
        <div class="way-icon">
          <svg width="30" height="24" viewBox="0 0 24 18" fill="none">
            <path d="M22 0H2C.9 0 0 .9 0 2v14c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zm0 16H2V2h20v14zm-8-7h6v5h-6V9z" fill="#C9A084"/>
          </svg>
        </div>
        <h3>By Check</h3>
        <p>Make Check Payable to:</p>
        <p>
          <span>St. Mina Church</span>
          <span>476 McMurray Dr</span>
          <span>Nashville, TN 37211</span>
        </p>
      </div>
    </div>

    <div class="ways-row photo-row">
      <div class="photo-card">
        <img src="assets/images/imgAssets/candle.png" alt="A candle lit in the sanctuary" loading="lazy" />
        <div class="photo-card-text">
          <h3>In Person</h3>
          <p>Gifts can be placed in the collection boxes during any of our liturgical services.</p>
        </div>
      </div>
      <div class="photo-card">
        <img src="assets/images/imgAssets/family.png" alt="A family walking into church together" loading="lazy" />
        <div class="photo-card-text">
          <h3>Planned Giving</h3>
          <p>Contact our treasury team for information on legacies, stocks, or estate gifts.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="faq">
  <div class="faq-container">
    <h2>Frequently Asked Questions</h2>
    <div class="faq-list">
      @for (faq of faqs; track faq.question; let i = $index) {
        <div class="faq-item" [class.expanded]="expandedFaq() === i">
          <button class="faq-header" (click)="toggleFaq(i)">
            <span>{{ faq.question }}</span>
            <svg class="faq-chevron" width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1.41 0.59L6 5.17L10.59 0.59L12 2L6 8L0 2L1.41 0.59Z" fill="#A99A8D"/>
            </svg>
          </button>
          @if (expandedFaq() === i) {
            <div class="faq-answer">
              <p>{{ faq.answer }}</p>
            </div>
          }
        </div>
      }
    </div>
  </div>
</section>
```

Note what's gone compared to the current file: the entire form card (frequency toggle, amount grid, fund dropdown, "Give Now" button, security note), the impact sidebar (Worship/Community/Outreach), the "Transparent Stewardship" progress-bar section, and the closing Scripture Quote band. The page now ends after the FAQ section — the shared `<app-footer>` (rendered globally in `src/app/app.html`) closes out the page from here, same as every other route.

- [ ] **Step 2: Commit**

```bash
git add src/app/pages/give/give.html
git commit -m "Rewrite Give page template around real giving methods"
```

---

### Task 2: Update the Give component class

**Files:**
- Modify: `src/app/pages/give/give.ts` (full replacement)

- [ ] **Step 1: Replace the entire contents of `give.ts`**

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-give',
  standalone: true,
  templateUrl: './give.html',
  styleUrl: './give.scss',
})
export class Give {
  protected readonly expandedFaq = signal<number | null>(null);

  readonly faqs = [
    {
      question: 'Is my gift tax-deductible?',
      answer:
        'Yes. St. Mina Coptic Orthodox Church is a registered 501(c)(3) nonprofit organization. You will receive a year-end giving statement for your records.',
    },
    {
      question: 'How do I set up a recurring gift?',
      answer:
        "You can set up a recurring transfer through Zelle or your bank's direct deposit / bill pay feature using the account details above. For help setting one up, contact our treasury team.",
    },
    {
      question: 'Is giving by Zelle or direct deposit secure?',
      answer:
        "Yes. Both move funds directly between bank accounts using your own bank's encryption and security — there's no third-party platform involved.",
    },
  ];

  toggleFaq(index: number) {
    this.expandedFaq.update((v) => (v === index ? null : index));
  }
}
```

This removes the `frequency`, `selectedAmount`, `customAmount`, and `fund` signals, the `amounts` array, and the `selectAmount`/`selectCustom` methods — all of it existed only to drive the deleted donation form. `expandedFaq`, `toggleFaq`, and `faqs` are kept; `faqs` content is updated to drop the Tithe.ly-specific Q&A.

- [ ] **Step 2: Commit**

```bash
git add src/app/pages/give/give.ts
git commit -m "Drop unused donation-form state from Give component"
```

---

### Task 3: Rewrite the Give page styles

**Files:**
- Modify: `src/app/pages/give/give.scss` (full replacement)

- [ ] **Step 1: Replace the entire contents of `give.scss`**

```scss
$navy: #1B2A44;
$gold: #C9A084;
$muted: #A99A8D;
$slate: #475569;
$border-light: #E2E8F0;
$bg-light: #F5F5F5;

// ─── Hero ───────────────────────────────────────────────
.hero {
  position: relative;
  height: 260px;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.hero-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(27, 42, 68, 0.93) 0%,
    rgba(27, 42, 68, 0.6) 50%,
    rgba(27, 42, 68, 0.2) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.hero-cross {
  margin-bottom: 4px;
}

.hero-content h1 {
  font-family: 'Playfair Display', serif;
  font-weight: 400;
  font-size: 48px;
  line-height: 48px;
  color: white;
  margin: 0;

  em {
    color: $gold;
    font-style: italic;
  }
}

.hero-verse {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-style: italic;
  font-size: 16px;
  line-height: 26px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  max-width: 460px;

  cite {
    display: block;
    margin-top: 4px;
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 1.6px;
    text-transform: uppercase;
    color: $gold;
  }
}

// ─── Ways to Give ───────────────────────────────────────
.ways-section {
  padding: 80px 0;
  background: $bg-light;
}

.ways-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 40px;

  & > h2 {
    font-family: 'Playfair Display', serif;
    font-weight: 400;
    font-size: 36px;
    line-height: 40px;
    color: $navy;
    text-align: center;
    margin: 0;
  }
}

.ways-row {
  display: flex;
  gap: 24px;
}

.way-card {
  flex: 1;
  position: relative;
  background: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  border-top: 4px solid $gold;
  padding: 36px 28px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.way-card--preferred {
  border: 2px solid $gold;
}

.way-badge {
  align-self: center;
  margin-bottom: 12px;
  background: rgba(201, 160, 132, 0.12);
  color: $gold;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 9999px;
}

.way-icon {
  margin-bottom: 10px;
}

.way-card h3 {
  font-family: 'Playfair Display', serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: $navy;
  margin: 0 0 10px;
}

.way-card p {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 22.75px;
  color: $slate;
  margin: 0;
}

.way-card p span {
  text-align: left;
  white-space: pre-line;
  display: block;
}

.way-qr {
  width: 75%;
  margin-top: 16px;
}

.way-note {
  margin-top: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: $gold;
}

.photo-row {
  flex-wrap: wrap;
}

.photo-card {
  flex: 1 1 320px;
  display: flex;
  background: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  overflow: hidden;

  img {
    width: 160px;
    flex-shrink: 0;
    object-fit: cover;
  }
}

.photo-card-text {
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h3 {
    font-family: 'Playfair Display', serif;
    font-weight: 400;
    font-size: 20px;
    line-height: 28px;
    color: $navy;
    margin: 0 0 8px;
  }

  p {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 22.75px;
    color: $slate;
    margin: 0;
  }
}

// ─── FAQ ────────────────────────────────────────────────
.faq {
  padding: 80px 0;
  background: white;
}

.faq-container {
  max-width: 768px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 48px;

  & > h2 {
    font-family: 'Playfair Display', serif;
    font-weight: 400;
    font-size: 36px;
    line-height: 40px;
    color: $navy;
    text-align: center;
    margin: 0;
  }
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.faq-item {
  background: $bg-light;
  border-radius: 10px;
  border: 1px solid $border-light;
  overflow: hidden;
}

.faq-header {
  width: 100%;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;

  span {
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: $navy;
    text-align: left;
  }
}

.faq-chevron {
  flex-shrink: 0;
  transition: transform 0.2s;

  .expanded & {
    transform: rotate(180deg);
  }
}

.faq-answer {
  padding: 0 24px 24px;

  p {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: $slate;
    margin: 0;
  }
}

// ─── Responsive ─────────────────────────────────────────
@media (max-width: 900px) {
  .methods-row {
    flex-direction: column;
  }

  .way-card--preferred {
    order: -1;
  }
}

@media (max-width: 640px) {
  .hero {
    height: auto;
    min-height: 280px;
    padding: 48px 0;
  }

  .hero-overlay {
    background: rgba(27, 42, 68, 0.85);
  }

  .hero-content h1 {
    font-size: 32px;
    line-height: 36px;
  }

  .ways-section,
  .faq {
    padding: 48px 0;
  }

  .photo-card {
    flex-direction: column;

    img {
      width: 100%;
      height: 160px;
    }
  }
}
```

This deletes every rule tied to the removed sections (`.form-section`, `.form-card*`, `.frequency-toggle`, `.amount-*`, `.designation`, `.select-*`, `.btn-give`, `.security-note`, `.impact-sidebar` and children, `.other-ways*`, `.stewardship*`, `.progress-*`, `.scripture*`, `blockquote`, and the top-level `cite` rule that only the scripture band used). The `$slate-dark`, `$slate-mid`, `$bar-bg`, and `$security` SCSS variables are dropped since nothing left in the file uses them.

- [ ] **Step 2: Commit**

```bash
git add src/app/pages/give/give.scss
git commit -m "Restyle Give page for the ways-to-give redesign"
```

---

### Task 4: Verify the build and the page in the browser

**Files:** none (verification only)

- [ ] **Step 1: Run the production build**

```bash
npm run build
```

Expected: build completes with no errors. Angular's template type-checker will fail loudly if `give.html` references anything `give.ts` no longer exposes (e.g. leftover `frequency()` or `amounts` bindings), so a clean build here confirms Task 1 and Task 2 stayed in sync.

- [ ] **Step 2: Start the dev server**

```bash
npm start
```

Expected: server starts (default `http://localhost:4200`).

- [ ] **Step 3: Manually check the page at `/give`**

Open `http://localhost:4200/give` and check, per the design spec's Verification section:

- Hero photo (`hero.png`) is visible with the navy gradient overlay, "Give with *Faith & Love*" heading, and the NKJV 2 Corinthians 9:7 verse — text is legible against the photo.
- The three method cards (Direct Deposit, Zelle, By Check) render at equal height in one row; the Zelle card is distinguished only by its gold border and "Preferred" badge — not by size or vertical offset.
- The Zelle QR code image loads and is legible.
- In Person (candle photo) and Planned Giving (family photo) cards render side by side below the method row, each with a photo and matching text.
- FAQ accordion still expands/collapses on click, one question at a time, and none of the three questions/answers mention Tithe.ly.
- Scrolling past the FAQ goes directly into the site's normal footer (address, quick links, contact, copyright) — no extra navy band in between.
- Resize the browser to a mobile width (~375px): method cards stack to one column, photo cards stack image-above-text, hero text stays readable against the (now more opaque) overlay, and nothing overflows horizontally.

- [ ] **Step 4: Stop the dev server**

Press `Ctrl+C` in the terminal running `npm start`.

---

## Done

The Give page now shows only real, working ways to give — no fake form, no invented stewardship stats, no stale Tithe.ly references — styled to match the rest of the site and ending in the same shared footer every other page uses.
