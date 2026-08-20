import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

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
    'https://img.youtube.com/vi/X7HBTiH7CHE/maxresdefault.jpg';

  playHistoryVideo(): void {
    this.historyVideoPlaying = true;
  }
}
