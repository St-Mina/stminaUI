import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ministries as ministryContent } from '../ministries/ministries.data';
import { heroAnnouncementMarqueeCycleCount, heroAnnouncements, heroAnnouncementsPlainText } from './hero-announcement.data';
import { latestNewsCards } from './latest-news.data';

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
  readonly imageScale: number;
  readonly imageOffsetY: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly destroyRef = inject(DestroyRef);
  private readonly autoplayDelay = 6_000;
  private readonly prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  private autoplayTimer: ReturnType<typeof setInterval> | undefined;
  private interactionPauseCount = 0;
  private readonly expandedClergyNames = signal<ReadonlySet<string>>(new Set());

  readonly heroSlides: readonly HeroSlide[] = [
    {
      src: 'assets/images/imgAssets/hero.png',
      alt: 'St. Mina Coptic Orthodox Church sanctuary',
    },
    {
      src: 'assets/images/imgAssets/StMinaHome.png',
      alt: 'St. Mina Veneration',
    },
    {
      src: 'assets/images/imgAssets/candle.png',
      alt: 'A lit candle representing prayer and worship',
    },
  ];
  readonly ministries = ministryContent.slice(0, 4);
  readonly latestNewsCards = latestNewsCards;
  readonly heroAnnouncements = heroAnnouncements;
  readonly heroAnnouncementsPlainText = heroAnnouncementsPlainText;
  readonly heroAnnouncementMarqueeCycles = Array.from(
    { length: heroAnnouncementMarqueeCycleCount },
    (_, index) => index
  );
  readonly heroAnnouncementMarqueeCopies = [0, 1] as const;
  readonly activeSlideIndex = signal(0);
  readonly clergy: readonly ClergyMember[] = [
    {
      name: 'Fr. Boutros Boutros',
      role: 'Hegumen and priest of St. Mina Coptic Orthodox Church',
      summary:
        'Ordained in 1997 and elevated to hegumen in 2017, Fr. Boutros has served St. Mina and the Southern Diocese for more than two decades.',
      imageSrc: 'assets/images/clergy/FrBoutrosBoutros.webp',
      imagePosition: 'center 30%',
      imageScale: 1.08,
      imageOffsetY: 8,
    },
    {
      name: 'Fr. Youaness Seraphim',
      role: 'General priest of the Southern Diocese',
      summary:
        'Ordained in 1978 and elevated to hegumen in 2005, Fr. Youaness serves churches throughout the Southern Diocese, especially in Nashville.',
      imageSrc: 'assets/images/clergy/FrYoanessSerafeem.webp',
      imageScale: 1.1,
      imageOffsetY: -3,
    },
    {
      name: 'Fr. Kyrillos Zaki',
      role: 'Priest of St. Mina Coptic Orthodox Church',
      summary:
        'Ordained in 2025, Fr. Kyrillos serves the St. Mina congregation in Nashville within the Diocese of the Southern United States.',
      imageSrc: 'assets/images/clergy/FrKyrillosZaki.webp',
      imageScale: 1.16,
      imageOffsetY: -15,
    },
  ];

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

  isClergyExpanded(name: string): boolean {
    return this.expandedClergyNames().has(name);
  }

  toggleClergyBiography(name: string): void {
    this.expandedClergyNames.update((current) => {
      const next = new Set(current);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
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
