export interface HeroAnnouncementItem {
  readonly message: string;
}

/** Add or edit entries for urgent parish notices (e.g. liturgy cancellations). */
export const heroAnnouncements = [
  {
    message: 'St. Mark Festival Carnival | Saturday (October 3) | 12:00 pm to 5:00 pm',
  },
  {
    message: 'كرنفال مهرجان الكرازة | يوم السبت (٣ أكتوبر) | من الساعة 12:00 ظهراً - 5:00 مساءً',
  },
] as const satisfies readonly HeroAnnouncementItem[];

/** How many times the announcement set repeats inside each marquee half. */
export const heroAnnouncementMarqueeCycleCount = 6;

export const heroAnnouncementsPlainText = heroAnnouncements.map(({ message }) => message).join(' ');
