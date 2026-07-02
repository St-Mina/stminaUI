import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ARCHIVE_ITEMS } from './archive-items';

@Component({
  selector: 'app-livestream-media',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './livestream-media.component.html',
  styleUrl: './livestream-media.component.scss',
})
export class LivestreamMediaComponent {
  channelId = 'UCFHaOwm2upL2fydLilRsVzg';

  liveEmbedUrl: SafeResourceUrl;
  loadingArchive = false;
  selectedCategory = 'all';
  searchTerm = '';

  archiveItems = ARCHIVE_ITEMS;

  constructor(private sanitizer: DomSanitizer) {
    this.liveEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/live_stream?channel=${this.channelId}`
    );
  }

  get filteredArchiveItems() {
    const term = this.searchTerm.toLowerCase().trim();

    return this.archiveItems.filter((item: any) => {
      const matchesCategory =
        this.selectedCategory === 'all' || item.category === this.selectedCategory;

      const matchesSearch =
        !term ||
        item.title?.toLowerCase().includes(term) ||
        item.description?.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }

  setCategory(category: string) {
    this.selectedCategory = category;
  }

  trackByVideoId(index: number, item: any) {
    return item.videoId || item.id || index;
  }

  sharePage() {
    const url = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: 'St. Mina Livestream & Media',
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert('Page link copied!');
    }
  }
}