import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

type MediaCategory =
| 'all'
| 'sermons'
| 'hymns'
| 'heritage-videos';

interface ArchiveItem {
title?: string;
copticTitle?: string;
part?: number;
subtitle: string;
category: MediaCategory;
videoId: string;
thumbnail: string;
watchUrl: string;
source: 'channel' | 'manual';
useCopticFont?: boolean;
}

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
this.manualItems = this.getManualItems();
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

private getManualItems(): ArchiveItem[] {
return [
{
title: 'Divine Liturgy and Celebration: Priesthood Ordination of Fr. Boutros Boutros (February 16, 1997)',
subtitle: 'Heritage Video',
category: 'heritage-videos',
videoId: 'AAVqbo9GdFY',
thumbnail: 'https://img.youtube.com/vi/AAVqbo9GdFY/hqdefault.jpg',
watchUrl: 'https://www.youtube.com/watch?v=AAVqbo9GdFY',
source: 'manual',
},
{
title: 'Divine Liturgy: Fr. Boutros Boutros at St. Mary El-Sourian Monastery (March 24, 1997)',
subtitle: 'Heritage Video',
category: 'heritage-videos',
videoId: 'T5_Q0d353kw',
thumbnail: 'https://img.youtube.com/vi/T5_Q0d353kw/hqdefault.jpg',
watchUrl: 'https://www.youtube.com/watch?v=T5_Q0d353kw',
source: 'manual',
},
{
title: 'Reception Prayer and Receiving of Fr. Boutros Boutros to Nashville, TN (April 4, 1997)',
subtitle: 'Heritage Video',
category: 'heritage-videos',
videoId: 'EnrcVgEGT4w',
thumbnail: 'https://img.youtube.com/vi/EnrcVgEGT4w/hqdefault.jpg',
watchUrl: 'https://www.youtube.com/watch?v=EnrcVgEGT4w',
source: 'manual',
},
{
title: 'First Divine Liturgy for Fr. Boutros Boutros in Nashville, TN (April 5, 1997)',
subtitle: 'Heritage Video',
category: 'heritage-videos',
videoId: 'iH701rcVwMo',
thumbnail: 'https://img.youtube.com/vi/iH701rcVwMo/hqdefault.jpg',
watchUrl: 'https://www.youtube.com/watch?v=iH701rcVwMo',
source: 'manual',
},
{
title: 'Glorious Nativity Feast with His Eminence Metropolitan Youssef (January 6, 1998)',
subtitle: 'Heritage Video',
category: 'heritage-videos',
videoId: '4kLCC0P-hGI',
thumbnail: 'https://img.youtube.com/vi/4kLCC0P-hGI/hqdefault.jpg',
watchUrl: 'https://www.youtube.com/watch?v=4kLCC0P-hGI',
source: 'manual',
},
{
title: 'St. Mina Church Consecration and the Priesthood Ordination of the Reposed Fr. Mina Iskander (August 27, 2000)',
subtitle: 'Heritage Video',
category: 'heritage-videos',
videoId: 'nwdAm9pIlXw',
thumbnail: 'https://img.youtube.com/vi/nwdAm9pIlXw/hqdefault.jpg',
watchUrl: 'https://www.youtube.com/watch?v=nwdAm9pIlXw',
source: 'manual',
},
{
title: 'Divine Liturgy: Hegumen Elevation of Fr. Boutros Boutros (February 5, 2017)',
subtitle: 'Heritage Video',
category: 'heritage-videos',
videoId: 'Fw08GjO5S_g',
thumbnail: 'https://img.youtube.com/vi/Fw08GjO5S_g/hqdefault.jpg',
watchUrl: 'https://www.youtube.com/watch?v=Fw08GjO5S_g',
source: 'manual',
},
{
title: 'St. Mina Renovated Church Consecration (November 28, 2022)',
subtitle: 'Heritage Video',
category: 'heritage-videos',
videoId: 'Vhnyzn_fUvY',
thumbnail: 'https://img.youtube.com/vi/Vhnyzn_fUvY/hqdefault.jpg',
watchUrl: 'https://www.youtube.com/watch?v=Vhnyzn_fUvY',
source: 'manual',
},
{
title: 'Divine Liturgy: Deacon Ordination of Fr. Kyrillos Zaki (August 23, 2025)',
subtitle: 'Heritage Video',
category: 'heritage-videos',
videoId: 'lQeZJqXBE9M',
thumbnail: 'https://img.youtube.com/vi/lQeZJqXBE9M/hqdefault.jpg',
watchUrl: 'https://www.youtube.com/watch?v=lQeZJqXBE9M',
source: 'manual',
},
{
title: 'Vespers and Midnight Praises with H.E.M. Youssef, H.E.M. Youannes, H.G.B. Basil, & H.G.B. Gregory (August 23, 2025)',
subtitle: 'Heritage Video',
category: 'heritage-videos',
videoId: 'MPSvz4LM3IQ',
thumbnail: 'https://img.youtube.com/vi/MPSvz4LM3IQ/hqdefault.jpg',
watchUrl: 'https://www.youtube.com/watch?v=MPSvz4LM3IQ',
source: 'manual',
},
{
title: 'Divine Liturgy: Priesthood Ordination of Fr. Kyrillos Zaki (August 24, 2025)',
subtitle: 'Heritage Video',
category: 'heritage-videos',
videoId: 'x0Y6pwzDqqM',
thumbnail: 'https://img.youtube.com/vi/x0Y6pwzDqqM/hqdefault.jpg',
watchUrl: 'https://www.youtube.com/watch?v=x0Y6pwzDqqM',
source: 'manual',
},
{
title: 'Reception Prayer and Receiving of Fr. Kyrillos Zaki (October 3, 2025)',
subtitle: 'Heritage Video',
category: 'heritage-videos',
videoId: 'B9ulu9Jc-sc',
thumbnail: 'https://img.youtube.com/vi/B9ulu9Jc-sc/hqdefault.jpg',
watchUrl: 'https://www.youtube.com/watch?v=B9ulu9Jc-sc',
source: 'manual',
},
{
title: 'Vespers with His Eminence Metropolitan Antonious (November 28, 2025)',
subtitle: 'Heritage Video',
category: 'heritage-videos',
videoId: 'OP_AHRwWXYs',
thumbnail: 'https://img.youtube.com/vi/OP_AHRwWXYs/hqdefault.jpg',
watchUrl: 'https://www.youtube.com/watch?v=OP_AHRwWXYs',
source: 'manual',
},
{
title: 'Divine Liturgy with His Eminence Metropolitan Antonious (November 29, 2025)',
subtitle: 'Heritage Video',
category: 'heritage-videos',
videoId: '_JJGD2OFaMQ',
thumbnail: 'https://img.youtube.com/vi/_JJGD2OFaMQ/hqdefault.jpg',
watchUrl: 'https://www.youtube.com/watch?v=_JJGD2OFaMQ',
source: 'manual',
},
{
title: 'Coptic Deacon Responses',
subtitle: 'Hymns',
category: 'hymns',
videoId: 'Wb9QBeSo3o0',
thumbnail: 'https://img.youtube.com/vi/Wb9QBeSo3o0/hqdefault.jpg',
watchUrl: 'https://www.youtube.com/watch?v=Wb9QBeSo3o0',
source: 'manual',
},
{
title: 'Nieqnoc throu (Part 1)',
copticTitle: 'Nieqnoc throu',
part: 1,
subtitle: 'Hymns',
category: 'hymns',
videoId: 'GyHISTEfWFI',
thumbnail: 'https://img.youtube.com/vi/GyHISTEfWFI/hqdefault.jpg',
watchUrl: 'https://www.youtube.com/watch?v=GyHISTEfWFI',
source: 'manual',
useCopticFont: true
},
{
title: 'Nieqnoc throu (Part 2)',
copticTitle: 'Nieqnoc throu',
part: 2,
subtitle: 'Hymns',
category: 'hymns',
videoId: 'N5DiOHWpF0Q',
thumbnail: 'https://img.youtube.com/vi/N5DiOHWpF0Q/hqdefault.jpg',
watchUrl: 'https://www.youtube.com/watch?v=N5DiOHWpF0Q',
source: 'manual',
useCopticFont: true
},
];
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