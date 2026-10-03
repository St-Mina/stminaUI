export interface HeroAnnouncementItem {
  readonly message: string;
}

/** Add or edit entries for urgent parish notices (e.g. liturgy cancellations). */
export const heroAnnouncements = [
  {
    message: 'We are excited to be renovating our Sunday School classrooms, and we are asking for your help with purchasing some of the items needed to complete the classrooms',
  },
  {
   message: 'zeffy.com/ticketing/st-minas-shop'
  },
  {
    message: 'يسرنا تجديد فصول مدرسة الأحد. و نطلب مساعدتكم في شراء بعض اللوازم اللازمة لإكمال تجهيز الفصول',
  },
] as const satisfies readonly HeroAnnouncementItem[];

/** How many times the announcement set repeats inside each marquee half. */
export const heroAnnouncementMarqueeCycleCount = 6;

export const heroAnnouncementsPlainText = heroAnnouncements.map(({ message }) => message).join(' ');
