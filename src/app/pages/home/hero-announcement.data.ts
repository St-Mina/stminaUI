export interface HeroAnnouncementItem {
  readonly message: string;
}

/** Add or edit entries for urgent parish notices (e.g. liturgy cancellations). */
export const heroAnnouncements = [
  {
    message:
      'Family Meeting with H.G. Bishop Philopateer on Friday at 6:30 pm',
  },
  {
    message:
      'اجتماع الأسرة مع نيافة الأنبا فيلوباتير يوم الجمعة الساعة ٦:٣٠',
  },
] as const satisfies readonly HeroAnnouncementItem[];

/** How many times the announcement set repeats inside each marquee half. */
export const heroAnnouncementMarqueeCycleCount = 6;

export const heroAnnouncementsPlainText = heroAnnouncements.map(({ message }) => message).join(' ');
