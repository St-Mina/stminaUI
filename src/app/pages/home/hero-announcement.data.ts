export interface HeroAnnouncementItem {
  readonly message: string;
}

/** Add or edit entries for urgent parish notices (e.g. liturgy cancellations). */
export const heroAnnouncements = [
  {
    message:
      'Join us for Liturgy every Sunday at 8:30 a.m. - All are welcome; come rise with us in prayer.',
  },
] as const satisfies readonly HeroAnnouncementItem[];

/** How many times the announcement set repeats inside each marquee half. */
export const heroAnnouncementMarqueeCycleCount = 6;

export const heroAnnouncementsPlainText = heroAnnouncements.map(({ message }) => message).join(' ');
