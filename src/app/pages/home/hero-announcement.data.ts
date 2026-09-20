export interface HeroAnnouncementItem {
  readonly message: string;
}

/** Add or edit entries for urgent parish notices (e.g. liturgy cancellations). */
export const heroAnnouncements = [
  {
    message: 'One Liturgy next Sunday (Feast of the Cross)',
  },
  {
    message: 'قداس واحد الأحد القادم (عيد الصليب)',
  },
] as const satisfies readonly HeroAnnouncementItem[];
] as const satisfies readonly HeroAnnouncementItem[];

/** How many times the announcement set repeats inside each marquee half. */
export const heroAnnouncementMarqueeCycleCount = 6;

export const heroAnnouncementsPlainText = heroAnnouncements.map(({ message }) => message).join(' ');
