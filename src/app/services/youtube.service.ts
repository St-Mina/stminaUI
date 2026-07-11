import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap, map } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

export interface YouTubeVideo {
  id: string;
  title: string;
  publishedAt: string;
  thumbnailUrl: string;
  isLive: boolean;
}

interface YouTubeSearchItem {
  id: { videoId: string };
  snippet: {
    title: string;
    publishedAt: string;
    thumbnails: { medium: { url: string } };
    liveBroadcastContent: string;
  };
}

interface YouTubeSearchResponse {
  nextPageToken?: string;
  items: YouTubeSearchItem[];
}

interface YouTubeChannelResponse {
  items: Array<{ id: string }>;
}

@Injectable({ providedIn: 'root' })
export class YouTubeService {
  private readonly apiBase = 'https://www.googleapis.com/youtube/v3';
  private cachedChannelId: string | null = null;

  constructor(private readonly http: HttpClient) {}

  private getChannelId(): Observable<string> {
    if (this.cachedChannelId) {
      return of(this.cachedChannelId);
    }

    const params = new HttpParams()
      .set('part', 'id')
      .set('forHandle', environment.youtubeChannelHandle)
      .set('key', environment.youtubeApiKey);

    return this.http
      .get<YouTubeChannelResponse>(`${this.apiBase}/channels`, { params })
      .pipe(
        map(res => res.items[0]?.id ?? ''),
        tap(id => { this.cachedChannelId = id; })
      );
  }

  getLiveStream(): Observable<YouTubeVideo | null> {
    return this.getChannelId().pipe(
      switchMap(channelId => {
        const params = new HttpParams()
          .set('part', 'snippet')
          .set('channelId', channelId)
          .set('eventType', 'live')
          .set('type', 'video')
          .set('maxResults', 1)
          .set('key', environment.youtubeApiKey);

        return this.http.get<YouTubeSearchResponse>(`${this.apiBase}/search`, { params });
      }),
      map(res => {
        const item = res.items[0];
        if (!item) return null;
        return this.mapVideo(item, true);
      })
    );
  }

  getVideos(maxResults = 8, pageToken?: string): Observable<{ videos: YouTubeVideo[]; nextPageToken?: string }> {
    return this.getChannelId().pipe(
      switchMap(channelId => {
        let params = new HttpParams()
          .set('part', 'snippet')
          .set('channelId', channelId)
          .set('type', 'video')
          .set('order', 'date')
          .set('maxResults', maxResults)
          .set('key', environment.youtubeApiKey);

        if (pageToken) {
          params = params.set('pageToken', pageToken);
        }

        return this.http.get<YouTubeSearchResponse>(`${this.apiBase}/search`, { params });
      }),
      map(res => ({
        videos: res.items.map(item => this.mapVideo(item, false)),
        nextPageToken: res.nextPageToken,
      }))
    );
  }

  private mapVideo(item: YouTubeSearchItem, isLive: boolean): YouTubeVideo {
    return {
      id: item.id.videoId,
      title: item.snippet.title,
      publishedAt: item.snippet.publishedAt,
      thumbnailUrl: item.snippet.thumbnails.medium.url,
      isLive,
    };
  }
}