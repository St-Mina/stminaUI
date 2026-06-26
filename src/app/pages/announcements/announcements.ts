import { Component, signal } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

type AnnouncementCategory = 'all' | 'urgent' | 'general' | 'ministry' | 'info';

interface Announcement {
  category: Exclude<AnnouncementCategory, 'all'>;
  date: string;
  title: string;
  description: string;
  expanded: boolean;
}

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './announcements.html',
  styleUrl: './announcements.scss',
})
export class Announcements {
  protected readonly activeFilter = signal<AnnouncementCategory>('all');
  protected readonly email = signal('');
  protected readonly pastExpanded = signal(false);

  protected readonly filters: { label: string; value: AnnouncementCategory }[] = [
    { label: 'All', value: 'all' },
    { label: 'Urgent', value: 'urgent' },
    { label: 'General', value: 'general' },
    { label: 'Ministry', value: 'ministry' },
  ];

  protected readonly announcements = signal<Announcement[]>([
    {
      category: 'urgent',
      date: 'Oct 29, 2024',
      title: 'Service Time Change: This Sunday',
      description:
        'Due to the marathon in Nashville, Liturgy will start at 7:30 AM to allow everyone to arrive safely.',
      expanded: false,
    },
    {
      category: 'ministry',
      date: 'Oct 25, 2024',
      title: 'Sunday School Volunteer Orientation',
      description:
        'New volunteers for the 2024-2025 academic year please meet in the social hall after Liturgy.',
      expanded: false,
    },
    {
      category: 'info',
      date: 'Oct 20, 2024',
      title: 'New Parking Lot Opening',
      description:
        'The additional parking lot behind the sanctuary is now open for use during all services.',
      expanded: false,
    },
    {
      category: 'general',
      date: 'Oct 15, 2024',
      title: 'Fall Bible Study Series Begins',
      description:
        'Join Fr. Mina every Wednesday at 7 PM for a deep dive into the Epistle to the Ephesians.',
      expanded: false,
    },
  ]);

  protected get filteredAnnouncements(): Announcement[] {
    const filter = this.activeFilter();
    if (filter === 'all') return this.announcements();
    return this.announcements().filter((a) => a.category === filter);
  }

  setFilter(value: AnnouncementCategory) {
    this.activeFilter.set(value);
  }

  togglePast() {
    this.pastExpanded.update((v) => !v);
  }

  toggleAnnouncement(index: number) {
    this.announcements.update((list) =>
      list.map((a, i) => (i === index ? { ...a, expanded: !a.expanded } : a))
    );
  }

  getCategoryClass(category: string): string {
    switch (category) {
      case 'urgent':
        return 'badge-urgent';
      case 'ministry':
        return 'badge-ministry';
      case 'info':
        return 'badge-info';
      case 'general':
        return 'badge-general';
      default:
        return '';
    }
  }
}
