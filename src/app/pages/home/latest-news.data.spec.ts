import { describe, expect, it } from 'vitest';

import { latestNewsCards } from './latest-news.data';

describe('latestNewsCards', () => {
  it('exposes the approved three-card feast-first CTA copy', () => {
    expect(latestNewsCards).toEqual([
  {
    title: 'The Feast of Transfiguration',
    dateLabel: 'August 19, 2026',
    cta: 'Join us in prayer as we celebrate the Feast of Transfiguration on Wednesday, August 19',
  },
  {
    title: 'Assumption of the Body of St. Mary',
    dateLabel: 'August 22, 2026',
    cta: 'Join us in prayer as we celebrate the Assumption of the Body of St. Mary on Saturday, August 22.',
  },
    title: '2026 Liturgy and Life Convention',
    dateLabel: 'November 6-8, 2026',
    cta: "Tickets go on sale: August 2 - September 27. Visit: events.ticketleap.com/tickets/liturgy-and-life-convention/2026-liturgy-and-life-
    ]);
  });
});
