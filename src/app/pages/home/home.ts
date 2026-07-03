import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';

import { WordpressService } from '../../services/wordpress.service';

interface HeroSlide {
  readonly src: string;
  readonly alt: string;
}

interface ClergyMember {
  readonly name: string;
  readonly role: string;
  readonly summary: string;
  readonly imageSrc: string;
  readonly imagePosition?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, DatePipe, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly wordpressService = inject(WordpressService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly autoplayDelay = 6_000;
  private readonly prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  private autoplayTimer: ReturnType<typeof setInterval> | undefined;
  private interactionPauseCount = 0;

  readonly heroSlides: readonly HeroSlide[] = [
    {
      src: 'assets/images/imgAssets/hero.png',
      alt: 'St. Mina Coptic Orthodox Church sanctuary',
    },
    {
      src: 'assets/images/imgAssets/afterChurch.png',
      alt: 'St. Mina church community gathered after the liturgy',
    },
    {
      src: 'assets/images/imgAssets/candle.png',
      alt: 'A lit candle representing prayer and worship',
    },
  ];
  readonly activeSlideIndex = signal(0);
  readonly clergy: readonly ClergyMember[] = [
    {
      name: 'Fr. Boutros Boutros',
      role: 'Hegumen and priest of St. Mina Coptic Orthodox Church',
      summary:
        'Ordained in 1997 and elevated to hegumen in 2017, Fr. Boutros has served St. Mina and the Southern Diocese for more than two decades.',
      imageSrc: 'assets/images/clergy/FrBoutrosBoutros.webp',
      imagePosition: 'center 30%',
    },
    {
      name: 'Fr. Kyrillos Zaki',
      role: 'Priest of St. Mina Coptic Orthodox Church',
      summary:
        'Ordained in 2025, Fr. Kyrillos serves the St. Mina congregation in Nashville within the Diocese of the Southern United States.',
      imageSrc: 'assets/images/clergy/FrKyrillosZaki.webp',
    },
    {
      name: 'Fr. Youaness Seraphim',
      role: 'General priest of the Southern Diocese',
      summary:
        'Ordained in 1978 and elevated to hegumen in 2005, Fr. Youaness serves churches throughout the Southern Diocese, especially in Nashville.',
      imageSrc: 'assets/images/clergy/FrYoanessSerafeem.webp',
    },
  ];

  protected readonly errorMessage = signal<string | null>(null);
  protected readonly posts$ = this.wordpressService.getLatestPosts(3).pipe(
    catchError(() => {
      this.errorMessage.set('Unable to load posts right now.');
      return of([]);
    })
  );

  constructor() {
    this.startAutoplay();
    this.destroyRef.onDestroy(() => this.stopAutoplay());
  }

  showNextSlide(): void {
    this.activeSlideIndex.update((index) => (index + 1) % this.heroSlides.length);
    this.restartAutoplay();
  }

  showPreviousSlide(): void {
    this.activeSlideIndex.update(
      (index) => (index - 1 + this.heroSlides.length) % this.heroSlides.length
    );
    this.restartAutoplay();
  }

  showSlide(index: number): void {
    if (index < 0 || index >= this.heroSlides.length) {
      return;
    }

    this.activeSlideIndex.set(index);
    this.restartAutoplay();
  }

  pauseAutoplay(): void {
    this.interactionPauseCount += 1;
    this.stopAutoplay();
  }

  resumeAutoplay(): void {
    this.interactionPauseCount = Math.max(0, this.interactionPauseCount - 1);
    this.startAutoplay();
  }

  private restartAutoplay(): void {
    this.stopAutoplay();
    this.startAutoplay();
  }

  private startAutoplay(): void {
    if (
      this.prefersReducedMotion ||
      this.interactionPauseCount > 0 ||
      this.heroSlides.length < 2 ||
      this.autoplayTimer !== undefined
    ) {
      return;
    }

    this.autoplayTimer = window.setInterval(() => {
      this.activeSlideIndex.update((index) => (index + 1) % this.heroSlides.length);
    }, this.autoplayDelay);
  }

  private stopAutoplay(): void {
    if (this.autoplayTimer !== undefined) {
      window.clearInterval(this.autoplayTimer);
      this.autoplayTimer = undefined;
    }
  }
}
