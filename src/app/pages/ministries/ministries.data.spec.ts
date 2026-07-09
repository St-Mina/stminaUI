import { describe, expect, it } from 'vitest';

import { ministries } from './ministries.data';

describe('ministries.data', () => {
  it('exposes the five approved ministries in display order', () => {
    expect(ministries.map(({ title, imageSrc, alt }) => ({ title, imageSrc, alt }))).toEqual([
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
