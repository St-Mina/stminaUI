export interface HeroAnnouncementItem {
  readonly message: string;
}

/** Add or edit entries for urgent parish notices (e.g. liturgy cancellations). */
export const heroAnnouncements = [
  {
    message: 'One Liturgy next Sunday at 7 am (Feast of the Cross)',
  },
  {
    message: 'قداس واحد الأحد القادم الساعة ٧ص (عيد الصليب)',
  },
] as const satisfies readonly HeroAnnouncementItem[];

/** How many times the announcement set repeats inside each marquee half. */
export const heroAnnouncementMarqueeCycleCount = 6;

export const heroAnnouncementsPlainText = heroAnnouncements.map(({ message }) => message).join(' ');
