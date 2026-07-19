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
      'Marriage preparation and enrichment programs',
      'Parenting classes rooted in Orthodox principles',
      'Monthly family nights with food and fellowship',
    ],
  },
] as const satisfies readonly MinistryContent[];
