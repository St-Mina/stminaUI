import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import {
  DomSanitizer,
  SafeResourceUrl
} from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  historyVideoPlaying = false;

  historyVideoId = 'X7HBTiH7CHE';

  historyVideoThumbnail =
    `https://img.youtube.com/vi/${this.historyVideoId}/maxresdefault.jpg`;

  historyVideoUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.historyVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.historyVideoId}?autoplay=1&start=21&cc_load_policy=0`
  );
}

  playHistoryVideo(): void {
    this.historyVideoPlaying = true;
  }
}
