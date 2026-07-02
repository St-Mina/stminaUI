import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { YouTubeService, YouTubeVideo } from '../../services/youtube.service';
import { environment } from '../../../environments/environment';

interface UpcomingStream {
  icon: string;
  title: string;
  date: string;
}

interface UpcomingEvent {
  title: string;
  time: string;
}

@Component({
  selector: 'app-livestream',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './livestream.html',
  styleUrl: './livestream.scss',
})
export class Livestream implements OnInit {
  private readonly youtube = inject(YouTubeService);
  private readonly sanitizer = inject(DomSanitizer);

  readonly channelUrl = `https://www.youtube.com/@${environment.youtubeChannelHandle}`;

  activeFilter = signal<string>('all');
  searchQuery = signal('');
  isLoadingFeatured = signal(true);
  isLoadingArchive = signal(true);
  isLive = signal(false);
  isLoadingMore = signal(false);

  featuredVideo: YouTubeVideo | null = null;
  featuredEmbedUrl: SafeResourceUrl | null = null;
  pastVideos = signal<YouTubeVideo[]>([]);
  nextPageToken: string | undefined;

  filters = ['All', 'Past Liturgies', 'Sermons', 'Hymns'];

  upcomingEvents: UpcomingEvent[] = [
    { title: 'Youth Meeting', time: 'Today at 7:00 PM' },
    { title: 'Wednesday Vespers', time: 'Oct 25 at 6:30 PM' },
  ];

  upcomingStreams: UpcomingStream[] = [
    { icon: 'calendar', title: 'Saturday Vespers', date: 'Saturday, Oct 28 • 6:00 PM CST' },
    { icon: 'book', title: 'Bible Study', date: 'Tuesday, Oct 31 • 7:30 PM CST' },
    { icon: 'star', title: 'Feast of St. Mina', date: 'Friday, Nov 10 • 8:00 AM CST' },
  ];

  ngOnInit(): void {
    this.youtube.getLiveStream().subscribe({
      next: liveVideo => {
        if (liveVideo) {
          this.setFeatured(liveVideo, true);
        } else {
          this.loadLatestAsFeatured();
        }
        this.isLoadingFeatured.set(false);
      },
      error: () => {
        this.loadLatestAsFeatured();
        this.isLoadingFeatured.set(false);
      },
    });

    this.youtube.getVideos(8).subscribe({
      next: result => {
        this.pastVideos.set(result.videos);
        this.nextPageToken = result.nextPageToken;
        this.isLoadingArchive.set(false);
      },
      error: () => this.isLoadingArchive.set(false),
    });
  }

  private loadLatestAsFeatured(): void {
    this.youtube.getVideos(1).subscribe({
      next: result => {
        if (result.videos.length > 0) {
          this.setFeatured(result.videos[0], false);
        }
      },
    });
  }

  private setFeatured(video: YouTubeVideo, live: boolean): void {
    this.featuredVideo = video;
    this.isLive.set(live);
    this.featuredEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${video.id}?rel=0`
    );
  }

  get filteredVideos(): YouTubeVideo[] {
    const q = this.searchQuery().toLowerCase();
    const f = this.activeFilter();
    return this.pastVideos().filter(v => {
      const matchesSearch = !q || v.title.toLowerCase().includes(q);
      const matchesFilter = f === 'all' || this.filterMatchesCategory(f, this.getCategory(v));
      return matchesSearch && matchesFilter;
    });
  }

  private filterMatchesCategory(filter: string, category: string): boolean {
    const c = category.toLowerCase();
    if (filter === 'past-liturgies') return c === 'liturgy';
    if (filter === 'sermons') return c === 'sermon';
    if (filter === 'hymns') return c === 'hymns';
    return true;
  }

  getCategory(video: YouTubeVideo): string {
    const t = video.title.toLowerCase();
    if (t.includes('liturgy') || t.includes('divine') || t.includes('mass')) return 'Liturgy';
    if (t.includes('sermon') || t.includes('homily') || t.includes('message')) return 'Sermon';
    if (t.includes('hymn') || t.includes('praise') || t.includes('vesper')) return 'Hymns';
    if (t.includes('study') || t.includes('bible') || t.includes('teaching')) return 'Study';
    return 'Service';
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  loadMore(): void {
    if (!this.nextPageToken || this.isLoadingMore()) return;
    this.isLoadingMore.set(true);
    this.youtube.getVideos(8, this.nextPageToken).subscribe({
      next: result => {
        this.pastVideos.update(prev => [...prev, ...result.videos]);
        this.nextPageToken = result.nextPageToken;
        this.isLoadingMore.set(false);
      },
      error: () => this.isLoadingMore.set(false),
    });
  }

  setFilter(filter: string): void {
    this.activeFilter.set(filter.toLowerCase().replace(/ /g, '-'));
  }

  isActive(filter: string): boolean {
    if (filter === 'All') return this.activeFilter() === 'all';
    return this.activeFilter() === filter.toLowerCase().replace(/ /g, '-');
  }

  onSearchInput(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  youtubeUrl(videoId: string): string {
    return `https://www.youtube.com/watch?v=${videoId}`;
  }
}
