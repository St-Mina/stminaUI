export interface HeroAnnouncementItem {
  readonly message: string;
}

/** Add or edit entries for urgent parish notices (e.g. liturgy cancellations). */
export const heroAnnouncements = [
  {
    message:
      'Join us for Transfiguration Liturgy on Wednesday, August 19  |  Join us in celebrating the Feast of the Assumption of St. Mary in the gym on Sunday, August 23  |',
  },
] as const satisfies readonly HeroAnnouncementItem[];

/** How many times the announcement set repeats inside each marquee half. */
export const heroAnnouncementMarqueeCycleCount = 6;

export const heroAnnouncementsPlainText = heroAnnouncements.map(({ message }) => message).join(' ');
