import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  heroAnnouncementMarqueeCycleCount,
  heroAnnouncements,
  heroAnnouncementsPlainText,
} from './hero-announcement.data';
import { latestNewsCards } from './latest-news.data';

interface HeroSlide {
  readonly src: string;
  readonly alt: string;
}

interface GoogleCalendarEvent {
  readonly id: string;
  readonly summary?: string;
  readonly location?: string;
  readonly htmlLink?: string;
  readonly start?: {
    readonly date?: string;
    readonly dateTime?: string;
  };
  readonly end?: {
    readonly date?: string;
    readonly dateTime?: string;
  };
}

interface CalendarEvent {
  readonly id: string;
  readonly title: string;
  readonly date: Date;
  readonly endDate?: Date;
  readonly location?: string;
  readonly link?: string;
  readonly allDay: boolean;
}

interface CalendarDayGroup {
  readonly date: Date;
  readonly events: readonly CalendarEvent[];
}

interface ClergyMember {
  readonly name: string;
  readonly role: string;
  readonly summary: string;
  readonly email: string;
  readonly phone: string;
  readonly confessionCalendar?: string;
  readonly imageSrc: string;
  readonly imagePosition?: string;
  readonly imageScale: number;
  readonly imageOffsetY: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly destroyRef = inject(DestroyRef);
  private readonly autoplayDelay = 6_000;

  private readonly prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  private autoplayTimer: ReturnType<typeof setInterval> | undefined;
  private interactionPauseCount = 0;

  private readonly expandedClergyNames =
    signal<ReadonlySet<string>>(new Set());

  readonly heroSlides: readonly HeroSlide[] = [
    {
      src: 'assets/images/imgAssets/hero.png',
      alt: 'St. Mina Coptic Orthodox Church sanctuary',
    },
    {
      src: 'assets/images/imgAssets/StMinaHome.png',
      alt: 'St. Mina Veneration',
    },
    {
      src: 'assets/images/imgAssets/ClergyWorship.jpg',
      alt: 'St. Mina clergy during worship',
    },
  ];

  readonly calendarEvents = signal<readonly CalendarEvent[]>([]);
  readonly calendarDayGroups = signal<readonly CalendarDayGroup[]>([]);
  readonly calendarLoading = signal(true);
  readonly calendarError = signal(false);

  private readonly googleCalendarId = 'stminanashvilleit@gmail.com';

  private readonly googleCalendarApiKey =
    'AIzaSyAMw7h-J6dW6vU8Ebz2hwbbSlCvQBUkqHc';

readonly announcementSlides = [
  {
    src: 'assets/announcements/OpenHouse2.JPG',
    alt: 'Church announcement 1',
  },
  {
    src: 'assets/announcements/OpenHouse.jpg',
    alt: 'Church announcement 2',
  },  
  {
    src: 'assets/announcements/IMG_2096.jpeg',
    alt: 'Church announcement 3',
  },
  {
    src: 'assets/announcements/IMG_2097.jpeg',
    alt: 'Church announcement 4',
  },
  {
    src: 'assets/announcements/IMG_2098.jpeg',
    alt: 'Church announcement 5',
  },
     {
    src: 'assets/announcements/IMG_2133.jpeg',
    alt: 'Church announcement 6',
  }, 
  {
    src: 'assets/announcements/IMG_2099.jpeg',
    alt: 'Church announcement 7',
  },
  {
    src: 'assets/announcements/IMG_2102.jpeg',
    alt: 'Church announcement 8',
  },
  {
    src: 'assets/announcements/IMG_2103.jpeg',
    alt: 'Church announcement 9',
  },
  {
    src: 'assets/announcements/IMG_2105.jpeg',
    alt: 'Church announcement 10',
  },
  {
    src: 'assets/announcements/IMG_2108.jpeg',
    alt: 'Church announcement 11',
  },
];

announcementIndex = 0;

  readonly latestNewsCards = latestNewsCards;
  readonly heroAnnouncements = heroAnnouncements;
  readonly heroAnnouncementsPlainText = heroAnnouncementsPlainText;
  readonly heroAnnouncementMarqueeCycles = Array.from(
    { length: heroAnnouncementMarqueeCycleCount },
    (_, index) => index
  );
  readonly heroAnnouncementMarqueeCopies = [0, 1] as const;
  readonly activeSlideIndex = signal(0);
  readonly clergy: readonly ClergyMember[] = [
    {
      name: 'Fr. Boutros Boutros',
      role: 'Hegumen and priest of St. Mina Coptic Orthodox Church',
      summary:
        'Ordained in 1997 and elevated to hegumen in 2017, Fr. Boutros has served St. Mina and the Southern Diocese for more than two decades.',
      email: 'frbboutros@gmail.com',
      phone: '(615) 293-1008',
      imageSrc: 'assets/images/clergy/FrBoutrosBoutros.webp',
      imagePosition: 'center 30%',
      imageScale: 1.08,
      imageOffsetY: 8,
    },
    {
      name: 'Fr. Youaness Seraphim',
      role: 'Hegumen and priest of St. Mina Coptic Orthodox Church',
      summary:
        'Ordained in 1978 and elevated to hegumen in 2005, Fr. Youaness served churches throughout the Southern Diocese, especially in Nashville. Currently, he serves at St. Mina.',
      email: 'fr.yoaness1950@gmail.com',
      phone: '(615) 500-1950',
      imageSrc: 'assets/images/clergy/FrYoanessSerafeem.webp',
      imageScale: 1.1,
      imageOffsetY: -3,
    },
    {
      name: 'Fr. Kyrillos Zaki',
      role: 'Priest of St. Mina Coptic Orthodox Church',
      summary:
        'Ordained in 2025, Fr. Kyrillos serves the St. Mina congregation in Nashville within the Diocese of the Southern United States.',
      email: 'frkyrilloszaki@gmail.com',
      phone: '(615) 243-5636',
      confessionCalendar: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2ViJLSJ3eEHFsY0EOWxK3Va7pgk4Z-xSF9lmspVGPobptc-p3F7shXkryU2H4K3wExa7mWSKSb',
      imageSrc: 'assets/images/clergy/FrKyrillosZaki.webp',
      imageScale: 1.16,
      imageOffsetY: -15,
    },
  ];

constructor() {
  this.startAutoplay();

  if (typeof window !== 'undefined') {
    void this.loadCalendarEvents();
  }

  this.destroyRef.onDestroy(() => this.stopAutoplay());
}

  showNextSlide(): void {
    this.activeSlideIndex.update((index) => (index + 1) % this.heroSlides.length);
    this.restartAutoplay();
  }

  showPreviousSlide(): void {
    this.activeSlideIndex.update(
      (index) => (index - 1 + this.heroSlides.length) % this.heroSlides.length
    );
    this.restartAutoplay();
  }

  showSlide(index: number): void {
    if (index < 0 || index >= this.heroSlides.length) {
      return;
    }

    this.activeSlideIndex.set(index);
    this.restartAutoplay();
  }

showPreviousAnnouncement(): void {
  this.announcementIndex =
    this.announcementIndex === 0
      ? this.announcementSlides.length - 1
      : this.announcementIndex - 1;
}

showNextAnnouncement(): void {
  this.announcementIndex =
    (this.announcementIndex + 1) % this.announcementSlides.length;
}

showAnnouncement(index: number): void {
  this.announcementIndex = index;
}

  isClergyExpanded(name: string): boolean {
    return this.expandedClergyNames().has(name);
  }

  toggleClergyBiography(name: string): void {
    this.expandedClergyNames.update((current) => {
      const next = new Set(current);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  }

  pauseAutoplay(): void {
    this.interactionPauseCount += 1;
    this.stopAutoplay();
  }

  resumeAutoplay(): void {
    this.interactionPauseCount = Math.max(0, this.interactionPauseCount - 1);
    this.startAutoplay();
  }

  private restartAutoplay(): void {
    this.stopAutoplay();
    this.startAutoplay();
  }

  private startAutoplay(): void {
    if (
      this.prefersReducedMotion ||
      this.interactionPauseCount > 0 ||
      this.heroSlides.length < 2 ||
      this.autoplayTimer !== undefined
    ) {
      return;
    }

    this.autoplayTimer = window.setInterval(() => {
      this.activeSlideIndex.update((index) => (index + 1) % this.heroSlides.length);
    }, this.autoplayDelay);
  }

  private stopAutoplay(): void {
    if (this.autoplayTimer !== undefined) {
      window.clearInterval(this.autoplayTimer);
      this.autoplayTimer = undefined;
    }
  }

private async loadCalendarEvents(): Promise<void> {
  this.calendarLoading.set(true);
  this.calendarError.set(false);

  try {
    const now = new Date();
    const timeMaxDate = new Date(now);

    timeMaxDate.setMonth(timeMaxDate.getMonth() + 3);

    const calendarId = encodeURIComponent(this.googleCalendarId);

    const params = new URLSearchParams({
      key: this.googleCalendarApiKey,
      timeMin: now.toISOString(),
      timeMax: timeMaxDate.toISOString(),
      singleEvents: 'true',
      orderBy: 'startTime',
      maxResults: '15',
    });

    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(`Calendar request failed: ${response.status}`);
    }

    const data = (await response.json()) as {
      items?: GoogleCalendarEvent[];
    };

    const events: CalendarEvent[] = (data.items ?? [])
      .filter((event) => event.start?.dateTime || event.start?.date)
      .map((event) => {
        const allDay =
          !!event.start?.date &&
          !event.start?.dateTime;

        const startValue =
          event.start?.dateTime ??
          `${event.start?.date}T00:00:00`;

        const endValue = event.end?.dateTime
          ? event.end.dateTime
          : event.end?.date
            ? `${event.end.date}T00:00:00`
            : undefined;

        return {
          id: event.id,
          title: event.summary ?? 'Church Event',
          date: new Date(startValue),
          endDate: endValue
            ? new Date(endValue)
            : undefined,
          location: event.location,
          link: event.htmlLink,
          allDay,
        };
      });

    this.calendarEvents.set(events);

    const groupedEvents =
      new Map<string, CalendarEvent[]>();

    for (const event of events) {
      const dateKey = [
        event.date.getFullYear(),
        event.date.getMonth(),
        event.date.getDate(),
      ].join('-');

      const eventsForDay =
        groupedEvents.get(dateKey) ?? [];

      eventsForDay.push(event);

      groupedEvents.set(
        dateKey,
        eventsForDay
      );
    }

    const groups: CalendarDayGroup[] =
      Array.from(groupedEvents.values()).map(
        (dayEvents) => ({
          date: dayEvents[0].date,
          events: dayEvents,
        })
      );

    this.calendarDayGroups.set(groups);
  } catch (error) {
    console.error(
      'Unable to load Google Calendar events:',
      error
    );

    this.calendarError.set(true);
  } finally {
    this.calendarLoading.set(false);
  }
}

formatCalendarDay(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
  }).format(date);
}

formatCalendarTime(event: CalendarEvent): string {
  if (event.allDay) {
    return 'All Day';
  }

  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(event.date);
}
}
