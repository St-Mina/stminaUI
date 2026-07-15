import { DOCUMENT } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  saintMinaStoryAudio,
  saintMinaStoryClosing,
  saintMinaStoryIntro,
  saintMinaStorySections,
} from './saint-mina-story.data';
import { saintMinaStoryParagraphTimings } from './saint-mina-story.timings.data';

@Component({
  selector: 'app-saint-mina',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './saint-mina.html',
  styleUrl: './saint-mina.scss',
})
export class SaintMina {
  private readonly document = inject(DOCUMENT);

  readonly intro = saintMinaStoryIntro;
  readonly audio = saintMinaStoryAudio;
  readonly sections = saintMinaStorySections;
  readonly closing = saintMinaStoryClosing;
  readonly closingParagraphId = 'closing';

  readonly activeParagraphId = signal<string | null>(null);
  readonly audioProgress = signal(0);

  private readonly paragraphTimings = saintMinaStoryParagraphTimings;
  private lastScrolledParagraphId: string | null = null;

  paragraphId(sectionId: string, paragraphIndex: number): string {
    return `${sectionId}-${paragraphIndex}`;
  }

  audioProgressPercent(): number {
    return Math.round(this.audioProgress());
  }

  onAudioTimeUpdate(event: Event): void {
    const audio = event.target as HTMLAudioElement;
    const currentTime = audio.currentTime;

    if (audio.duration > 0) {
      this.audioProgress.set((currentTime / audio.duration) * 100);
    }

    const active = this.paragraphTimings.find(
      ({ start, end }) => currentTime >= start && currentTime < end
    );
    const nextId = active?.id ?? null;

    this.activeParagraphId.set(nextId);

    if (nextId && nextId !== this.lastScrolledParagraphId) {
      this.scrollToParagraph(nextId);
      this.lastScrolledParagraphId = nextId;
    }
  }

  onAudioPause(): void {
    this.activeParagraphId.set(null);
  }

  onAudioEnded(): void {
    this.activeParagraphId.set(null);
    this.audioProgress.set(100);
    this.lastScrolledParagraphId = null;
  }

  private scrollToParagraph(paragraphId: string): void {
    const element = this.document.getElementById(paragraphId);
    if (!element) {
      return;
    }

    const prefersReducedMotion =
      this.document.defaultView?.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ??
      false;

    element.scrollIntoView?.({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'center',
    });
  }
}
