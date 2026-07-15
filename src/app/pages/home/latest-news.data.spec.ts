import { describe, expect, it } from 'vitest';

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
