import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  DomSanitizer,
  SafeResourceUrl,
} from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

type MediaCategory = 'recent' | 'sermons' | 'hymns';

interface MediaItem {
  title: string;
  subtitle: string;
  category: MediaCategory;
  videoId: string;
  thumbnail: string;
  watchUrl: string;
  publishedAt: string;
}

interface PlaylistItemResponse {
  nextPageToken?: string;
  items?: PlaylistItem[];
}

interface PlaylistItem {
  snippet: {
    title?: string;
    publishedAt?: string;
    resourceId?: {
      videoId?: string;
    };
    thumbnails?: {
      default?: {
        url?: string;
      };
      medium?: {
        url?: string;
      };
      high?: {
        url?: string;
      };
      standard?: {
        url?: string;
      };
      maxres?: {
        url?: string;
      };
    };
  };
  contentDetails?: {
    videoId?: string;
    videoPublishedAt?: string;
  };
}

interface YouTubeSearchResponse {
  items?: Array<{
    id: {
      videoId?: string;
    };
    snippet: {
      title?: string;
    };
  }>;
}

@Component({
  selector: 'app-livestream-media',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './livestream.html',
  styleUrl: './livestream.scss',
})
export class Livestream implements OnInit {
  readonly channelId = environment.youtubeChannelId;
  readonly channelHandle = environment.youtubeChannelHandle;

  readonly uploadsPlaylistId = this.channelId.startsWith('UC')
    ? `UU${this.channelId.substring(2)}`
    : '';

  liveEmbedUrl: SafeResourceUrl | null = null;
  selectedVideoEmbedUrl: SafeResourceUrl | null = null;

  selectedVideoTitle = '';
  heroVideoTitle = '';
  heroLoading = true;
  heroIsLive = false;
  heroError = '';

  selectedCategory: MediaCategory = 'recent';
  searchTerm = '';
  archiveError = '';

  videos: Record<MediaCategory, MediaItem[]> = {
    recent: [],
    sermons: [],
    hymns: [],
  };

  nextPageTokens: Record<MediaCategory, string> = {
    recent: '',
    sermons: '',
    hymns: '',
  };

  loadingCategories: Record<MediaCategory, boolean> = {
    recent: false,
    sermons: false,
    hymns: false,
  };

  loadedCategories: Record<MediaCategory, boolean> = {
    recent: false,
    sermons: false,
    hymns: false,
  };

  categories: { id: MediaCategory; label: string }[] = [
    { id: 'recent', label: 'Recent Videos' },
    { id: 'sermons', label: 'Sermons' },
    { id: 'hymns', label: 'Hymns Classes' },
  ];

  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly http: HttpClient,
    private readonly changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadHeroVideo();
    this.loadVideos('recent');
  }

  get currentVideos(): MediaItem[] {
    return this.videos[this.selectedCategory];
  }

  get currentNextPageToken(): string {
    return this.nextPageTokens[this.selectedCategory];
  }

  get isLoading(): boolean {
    return this.loadingCategories[this.selectedCategory];
  }

  get filteredArchiveItems(): MediaItem[] {
    const term = this.searchTerm.toLowerCase().trim();

    return [...this.currentVideos]
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() -
          new Date(a.publishedAt).getTime()
      )
      .filter((item) => {
        return (
          !term ||
          item.title.toLowerCase().includes(term) ||
          item.subtitle.toLowerCase().includes(term)
        );
      });
  }

  loadHeroVideo(): void {
    this.heroLoading = true;
    this.heroError = '';

    const params = new HttpParams()
      .set('key', environment.youtubeApiKey)
      .set('channelId', this.channelId)
      .set('part', 'snippet,id')
      .set('eventType', 'live')
      .set('type', 'video')
      .set('maxResults', '1');

    this.http
      .get<YouTubeSearchResponse>(
        'https://www.googleapis.com/youtube/v3/search',
        { params }
      )
      .subscribe({
        next: (response) => {
          const liveVideo = response.items?.[0];
          const liveVideoId = liveVideo?.id.videoId;

          if (liveVideoId) {
            this.heroIsLive = true;
            this.heroVideoTitle =
              liveVideo.snippet.title || 'Live Stream';

            this.liveEmbedUrl = this.safeUrl(
              `https://www.youtube.com/embed/${liveVideoId}`
            );

            this.heroLoading = false;
            this.changeDetector.markForCheck();
            return;
          }

          this.loadLatestUpload();
        },
        error: (error) => {
          console.error('Live stream API error:', error);
          this.loadLatestUpload();
        },
      });
  }

  private loadLatestUpload(): void {
    const params = new HttpParams()
      .set('key', environment.youtubeApiKey)
      .set('playlistId', this.uploadsPlaylistId)
      .set('part', 'snippet,contentDetails')
      .set('maxResults', '1');

    this.http
      .get<PlaylistItemResponse>(
        'https://www.googleapis.com/youtube/v3/playlistItems',
        { params }
      )
      .subscribe({
        next: (response) => {
          const latestVideo = response.items?.[0];

          const videoId =
            latestVideo?.contentDetails?.videoId ||
            latestVideo?.snippet.resourceId?.videoId;

          if (!videoId) {
            this.heroError = 'No channel video was found.';
            this.heroLoading = false;
            this.changeDetector.markForCheck();
            return;
          }

          this.heroIsLive = false;
          this.heroVideoTitle =
            latestVideo.snippet.title || 'Latest Video';

          this.liveEmbedUrl = this.safeUrl(
            `https://www.youtube.com/embed/${videoId}`
          );

          this.heroLoading = false;
          this.changeDetector.markForCheck();
        },
        error: (error) => {
          console.error('Latest video API error:', error);

          this.heroError = this.getApiErrorMessage(
            error,
            'The latest channel video could not be loaded.'
          );

          this.heroLoading = false;
          this.changeDetector.markForCheck();
        },
      });
  }

  setCategory(category: MediaCategory): void {
    this.selectedCategory = category;
    this.searchTerm = '';
    this.archiveError = '';

    if (!this.loadedCategories[category]) {
      this.loadVideos(category);
    }
  }

  loadVideos(
    category: MediaCategory,
    loadMore = false
  ): void {
    if (this.loadingCategories[category]) {
      return;
    }

    this.loadingCategories[category] = true;
    this.archiveError = '';

    const pageToken = loadMore
      ? this.nextPageTokens[category]
      : '';

    let params = new HttpParams()
      .set('key', environment.youtubeApiKey)
      .set('playlistId', this.uploadsPlaylistId)
      .set('part', 'snippet,contentDetails')
      .set('maxResults', '50');

    if (pageToken) {
      params = params.set('pageToken', pageToken);
    }

    this.http
      .get<PlaylistItemResponse>(
        'https://www.googleapis.com/youtube/v3/playlistItems',
        { params }
      )
      .subscribe({
        next: (response) => {
          const newVideos = (response.items || [])
            .map((video): MediaItem | null => {
              const videoId =
                video.contentDetails?.videoId ||
                video.snippet.resourceId?.videoId;

              if (!videoId) {
                return null;
              }

              const title = video.snippet.title || 'Video';
              const lowercaseTitle = title.toLowerCase();

              if (
                category === 'sermons' &&
                !lowercaseTitle.includes('sermon') &&
                !title.includes('عظة')
              ) {
                return null;
              }

              if (
                category === 'hymns' &&
                !lowercaseTitle.includes('hymns class')
              ) {
                return null;
              }

              return {
                title,
                subtitle: this.getCategorySubtitle(category),
                category,
                videoId,
                thumbnail:
                  video.snippet.thumbnails?.maxres?.url ||
                  video.snippet.thumbnails?.standard?.url ||
                  video.snippet.thumbnails?.high?.url ||
                  video.snippet.thumbnails?.medium?.url ||
                  video.snippet.thumbnails?.default?.url ||
                  `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
                watchUrl:
                  `https://www.youtube.com/watch?v=${videoId}`,
                publishedAt:
                  video.contentDetails?.videoPublishedAt ||
                  video.snippet.publishedAt ||
                  '',
              };
            })
            .filter(
              (video): video is MediaItem =>
                video !== null
            );

          this.videos[category] = loadMore
            ? this.addUniqueVideos(
                this.videos[category],
                newVideos
              )
            : newVideos;

          this.nextPageTokens[category] =
            response.nextPageToken || '';

          this.loadedCategories[category] = true;
          this.loadingCategories[category] = false;
          this.changeDetector.markForCheck();
        },
        error: (error) => {
          console.error(
            `YouTube API error for ${category}:`,
            error
          );

          this.archiveError = this.getApiErrorMessage(
            error,
            'Videos could not be loaded.'
          );

          this.loadedCategories[category] = true;
          this.loadingCategories[category] = false;
          this.changeDetector.markForCheck();
        },
      });
  }

  loadMoreVideos(): void {
    if (!this.currentNextPageToken) {
      return;
    }

    this.loadVideos(this.selectedCategory, true);
  }

  openVideo(item: MediaItem): void {
    this.selectedVideoTitle = item.title;

    this.selectedVideoEmbedUrl = this.safeUrl(
      `https://www.youtube.com/embed/${item.videoId}?autoplay=1`
    );
  }

  closeVideo(): void {
    this.selectedVideoEmbedUrl = null;
    this.selectedVideoTitle = '';
  }

  trackByVideoId(
    index: number,
    item: MediaItem
  ): string | number {
    return item.videoId || index;
  }

  sharePage(): void {
    const url = window.location.href;

    if (navigator.share) {
      navigator
        .share({
          title: 'St. Mina Livestream & Media',
          url,
        })
        .catch(() => {
          // The share menu was closed.
        });

      return;
    }

    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert('Page link copied!');
      })
      .catch(() => {
        alert('Unable to copy the page link.');
      });
  }

  private getCategorySubtitle(
    category: MediaCategory
  ): string {
    switch (category) {
      case 'sermons':
        return 'Sermon';

      case 'hymns':
        return 'Hymns Class';

      default:
        return 'Recent Video';
    }
  }

  private addUniqueVideos(
    existingVideos: MediaItem[],
    newVideos: MediaItem[]
  ): MediaItem[] {
    const videoMap = new Map<string, MediaItem>();

    [...existingVideos, ...newVideos].forEach((video) => {
      videoMap.set(video.videoId, video);
    });

    return Array.from(videoMap.values());
  }

  private getApiErrorMessage(
    error: unknown,
    fallbackMessage: string
  ): string {
    const apiError = error as {
      error?: {
        error?: {
          message?: string;
        };
      };
      message?: string;
    };

    const apiMessage =
      apiError?.error?.error?.message ||
      apiError?.message;

    return apiMessage
      ? `${fallbackMessage} ${apiMessage}`
      : fallbackMessage;
  }

  private safeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      url
    );
  }
}