import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

import {
  ARCHIVE_ITEMS,
  ArchiveItem,
  MediaCategory
} from './archive-items';

@Component({
selector: 'app-livestream-media',
standalone: true,
imports: [CommonModule, FormsModule],
templateUrl: './livestream-media.component.html',
styleUrls: ['./livestream-media.component.scss']
})
export class LivestreamMediaComponent implements OnInit {
readonly channelId = environment.youtubeChannelId;
readonly apiKey = environment.youtubeApiKey;

liveEmbedUrl!: SafeResourceUrl;
isLiveNow = false;

searchTerm = '';
selectedCategory: MediaCategory = 'all';

fetchedItems: ArchiveItem[] = [];
manualItems: ArchiveItem[] = [];
loadingArchive = false;

constructor(
private readonly http: HttpClient,
private readonly sanitizer: DomSanitizer
) {}

ngOnInit(): void {
this.manualItems = ARCHIVE_ITEMS;
this.initializeLivestream();
this.fetchRecentVideos();
}

get allArchiveItems(): ArchiveItem[] {
return [...this.manualItems, ...this.fetchedItems];
}

get filteredArchiveItems(): ArchiveItem[] {
return this.allArchiveItems.filter((item) => {
const matchesCategory =
this.selectedCategory === 'all' || item.category === this.selectedCategory;

const q = this.searchTerm.trim().toLowerCase();
const matchesSearch =
!q ||
(item.title ?? item.copticTitle ?? '').toLowerCase().includes(q) ||
item.subtitle.toLowerCase().includes(q);

return matchesCategory && matchesSearch;
});
}

setCategory(category: MediaCategory): void {
this.selectedCategory = category;
}

trackByVideoId(_: number, item: ArchiveItem): string {
return `${item.source}-${item.videoId}`;
}

async sharePage(): Promise<void> {
const shareData = {
title: 'St. Mina Coptic Orthodox Church Livestream',
text: 'Watch the live stream or browse past videos.',
url: window.location.href
};

if (navigator.share) {
try {
await navigator.share(shareData);
} catch {
console.log('Share cancelled');
}
} else {
await navigator.clipboard.writeText(shareData.url);
alert('Link copied to clipboard');
}
}

private initializeLivestream(): void {
if (!this.apiKey || !this.channelId) {
this.setEmbedFromChannelLive();
return;
}

const liveUrl =
'https://www.googleapis.com/youtube/v3/search' +
`?key=${encodeURIComponent(this.apiKey)}` +
`&channelId=${encodeURIComponent(this.channelId)}` +
'&part=snippet,id' +
'&eventType=live' +
'&type=video' +
'&maxResults=1';

this.http.get<any>(liveUrl).subscribe({
next: (response) => {
const liveItems = Array.isArray(response?.items) ? response.items : [];

if (liveItems.length > 0 && liveItems[0]?.id?.videoId) {
const liveItem = liveItems[0];
this.isLiveNow = true;
this.setEmbedFromVideoId(liveItem.id.videoId);
} else {
this.loadLatestCompletedLivestream();
}
},
error: () => {
this.loadLatestCompletedLivestream();
}
});
}

private loadLatestCompletedLivestream(): void {
const recentUrl =
'https://www.googleapis.com/youtube/v3/search' +
`?key=${encodeURIComponent(this.apiKey)}` +
`&channelId=${encodeURIComponent(this.channelId)}` +
'&part=snippet,id' +
'&order=date' +
'&maxResults=12' +
'&type=video';

this.http.get<any>(recentUrl).subscribe({
next: (response) => {
const items = Array.isArray(response?.items) ? response.items : [];

const latestLivestreamLike = items.find((item: any) => {
const title = String(item?.snippet?.title ?? '').toLowerCase();

return (
item?.id?.videoId &&
(
title.includes('divine liturgy') ||
title.includes('liturgy') ||
title.includes('vespers') ||
title.includes('midnight praises') ||
title.includes('tasbeha') ||
title.includes('matins') ||
title.includes('great fast') ||
title.includes('pascha') ||
title.includes('feast')
)
);
});

if (latestLivestreamLike?.id?.videoId) {
this.isLiveNow = false;
this.setEmbedFromVideoId(latestLivestreamLike.id.videoId);
} else {
this.isLiveNow = false;
this.setEmbedFromChannelLive();
}
},
error: () => {
this.isLiveNow = false;
this.setEmbedFromChannelLive();
}
});
}

private setEmbedFromVideoId(videoId: string): void {
this.liveEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
`https://www.youtube.com/embed/${videoId}`
);
}

private setEmbedFromChannelLive(): void {
this.liveEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
`https://www.youtube.com/embed/live_stream?channel=${this.channelId}`
);
}

private fetchRecentVideos(): void {
if (!this.apiKey || !this.channelId) {
return;
}

this.loadingArchive = true;

const url =
'https://www.googleapis.com/youtube/v3/search' +
`?key=${encodeURIComponent(this.apiKey)}` +
`&channelId=${encodeURIComponent(this.channelId)}` +
'&part=snippet,id' +
'&order=date' +
'&maxResults=16' +
'&type=video';

this.http.get<any>(url).subscribe({
next: (response) => {
const items = Array.isArray(response?.items) ? response.items : [];

this.fetchedItems = items
.filter((item: any) => item?.id?.videoId && item?.snippet)
.map((item: any): ArchiveItem => {
const title = String(item.snippet.title ?? 'Untitled Video');
const publishedAt = String(item.snippet.publishedAt ?? '');
const prettyDate = this.formatDate(publishedAt);
const category = this.inferCategory(title);

return {
title,
subtitle: `${prettyDate}`,
category,
videoId: item.id.videoId,
thumbnail:
item.snippet.thumbnails?.high?.url ||
item.snippet.thumbnails?.medium?.url ||
item.snippet.thumbnails?.default?.url ||
'',
watchUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
source: 'channel'
};
});

this.loadingArchive = false;
},
error: () => {
this.loadingArchive = false;
}
});
}

private inferCategory(title: string): MediaCategory {
const t = title.toLowerCase();

if (t.includes('hymn') || t.includes('tasbeha') || t.includes('praises')) {
return 'hymns';
}

if (t.includes('sermon') || t.includes('homily')) {
return 'sermons';
}

return 'heritage-videos';
}

private formatDate(value: string): string {
if (!value) return 'Recent';

const date = new Date(value);
if (Number.isNaN(date.getTime())) return 'Recent';

return date.toLocaleDateString('en-US', {
month: 'short',
day: 'numeric',
year: 'numeric'
});
}
}