# Home Clergy Section Design

## Goal

Replace the homepage's placeholder “Our Deacons” section with a responsive “Our
Clergy” section presenting the three clergy members who serve St. Mina and the
Southern Diocese.

## Content

The section will use one ordered clergy configuration in the `Home` component:

1. **Fr. Boutros Boutros**
   - Image: `assets/images/clergy/FrBoutrosBoutros.webp`
   - Role: Hegumen and priest of St. Mina Coptic Orthodox Church
   - Summary: Ordained in 1997 and elevated to hegumen in 2017, Fr. Boutros has
     served St. Mina and the Southern Diocese for more than two decades.
2. **Fr. Kyrillos Zaki**
   - Image: `assets/images/clergy/FrKyrillosZaki.webp`
   - Role: Priest of St. Mina Coptic Orthodox Church
   - Summary: Ordained in 2025, Fr. Kyrillos serves the St. Mina congregation in
     Nashville within the Diocese of the Southern United States.
3. **Fr. Youaness Seraphim**
   - Image: `assets/images/clergy/FrYoanessSerafeem.webp`
   - Role: General priest of the Southern Diocese
   - Summary: Ordained in 1978 and elevated to hegumen in 2005, Fr. Youaness
     serves churches throughout the Southern Diocese, especially in Nashville.

The biography spelling “Fr. Youaness Seraphim” is the public display name even
though the existing asset filename uses a different transliteration.

The section will not include email links, individual profile links, or full
biographies.

## Structure and Presentation

The heading changes to “Our Clergy” with a short subtitle describing their
pastoral service. The template renders one semantic `article` per entry from the
clergy configuration.

Each card contains:

- a portrait image;
- the clergy member's name;
- role; and
- concise summary.

Desktop uses three equal-width cards in one row. Narrow screens use a
single-column layout. Images use a consistent portrait frame and
`object-fit: cover`. Each configuration entry supports an optional object-position
value so framing can be adjusted without changing the template.

The cards follow the existing navy, gold, white, rounded-corner, and soft-shadow
visual language. Hover motion is subtle and disabled for reduced-motion users.

## Assets

Only these three WebP images are part of the feature:

- `src/assets/images/clergy/FrBoutrosBoutros.webp`
- `src/assets/images/clergy/FrKyrillosZaki.webp`
- `src/assets/images/clergy/FrYoanessSerafeem.webp`

Files prefixed with `._` are macOS metadata and will not be committed.

## Accessibility

- Each card uses an `article`.
- Each image has meaningful alternative text naming the clergy member.
- Names use heading elements within the section hierarchy.
- Text contrast and keyboard behavior follow the existing homepage styles.
- The layout does not rely on hover to expose information.

## Verification

Component tests will verify:

- the configuration contains exactly the three approved displayed names;
- roles and image paths match the approved content;
- three clergy articles and images render; and
- the public “Our Clergy” heading replaces “Our Deacons.”

The full unit-test suite and production build must pass. Responsive review should
confirm balanced desktop cards, readable mobile stacking, appropriate portrait
cropping, and no horizontal overflow.
