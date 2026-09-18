import { Component, signal } from '@angular/core';

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

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [],
  templateUrl: './schedule.html',
  styleUrl: './schedule.scss',
})
export class Schedule {

  readonly calendarEvents = signal<readonly CalendarEvent[]>([]);
  readonly calendarDayGroups = signal<readonly CalendarDayGroup[]>([]);
  readonly calendarLoading = signal(true);
  readonly calendarError = signal(false);

  private readonly googleCalendarId =
    'stminanashvilleit@gmail.com';

  private readonly googleCalendarApiKey =
    'AIzaSyAMw7h-J6dW6vU8Ebz2hwbbSlCvQBUkqHc';

  constructor() {
    if (typeof window !== 'undefined') {
      void this.loadCalendarEvents();
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
