import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { WordpressService } from '../../services/wordpress.service';
import { Home } from './home';

describe('Home hero carousel', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue({
        matches: false,
        media: '(prefers-reduced-motion: reduce)',
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })
    );

    TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        provideRouter([]),
        {
          provide: WordpressService,
          useValue: { getLatestPosts: () => of([]) },
        },
      ],
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('starts with the current hero and keeps slides data-driven', () => {
    const component = TestBed.createComponent(Home).componentInstance;

    expect(component.heroSlides.map((slide) => slide.src)).toEqual([
      'assets/images/imgAssets/hero.png',
      'assets/images/imgAssets/afterChurch.png',
      'assets/images/imgAssets/candle.png',
    ]);
    expect(component.activeSlideIndex()).toBe(0);
  });

  it('defines the approved clergy content and portraits', () => {
    const component = TestBed.createComponent(Home).componentInstance;

    expect(component.clergy.map(({ name, role, imageSrc }) => ({ name, role, imageSrc }))).toEqual([
      {
        name: 'Fr. Boutros Boutros',
        role: 'Hegumen and priest of St. Mina Coptic Orthodox Church',
        imageSrc: 'assets/images/clergy/FrBoutrosBoutros.webp',
      },
      {
        name: 'Fr. Kyrillos Zaki',
        role: 'Priest of St. Mina Coptic Orthodox Church',
        imageSrc: 'assets/images/clergy/FrKyrillosZaki.webp',
      },
      {
        name: 'Fr. Youaness Seraphim',
        role: 'General priest of the Southern Diocese',
        imageSrc: 'assets/images/clergy/FrYoanessSerafeem.webp',
      },
    ]);
  });

  it('wraps next and previous navigation', () => {
    const component = TestBed.createComponent(Home).componentInstance;

    component.showPreviousSlide();
    expect(component.activeSlideIndex()).toBe(2);

    component.showNextSlide();
    expect(component.activeSlideIndex()).toBe(0);
  });

  it('selects a requested slide and restarts autoplay', () => {
    const component = TestBed.createComponent(Home).componentInstance;

    component.showSlide(2);
    expect(component.activeSlideIndex()).toBe(2);

    vi.advanceTimersByTime(5_999);
    expect(component.activeSlideIndex()).toBe(2);
    vi.advanceTimersByTime(1);
    expect(component.activeSlideIndex()).toBe(0);
  });

  it('ignores a direct-selection index outside the slide list', () => {
    const component = TestBed.createComponent(Home).componentInstance;

    component.showSlide(-1);
    expect(component.activeSlideIndex()).toBe(0);
    component.showSlide(component.heroSlides.length);
    expect(component.activeSlideIndex()).toBe(0);
  });

  it('advances after six seconds and restarts the interval after manual navigation', () => {
    const component = TestBed.createComponent(Home).componentInstance;

    vi.advanceTimersByTime(6_000);
    expect(component.activeSlideIndex()).toBe(1);

    component.showNextSlide();
    expect(component.activeSlideIndex()).toBe(2);

    vi.advanceTimersByTime(5_999);
    expect(component.activeSlideIndex()).toBe(2);
    vi.advanceTimersByTime(1);
    expect(component.activeSlideIndex()).toBe(0);
  });

  it('pauses and resumes autoplay during interaction', () => {
    const component = TestBed.createComponent(Home).componentInstance;

    component.pauseAutoplay();
    vi.advanceTimersByTime(12_000);
    expect(component.activeSlideIndex()).toBe(0);

    component.resumeAutoplay();
    vi.advanceTimersByTime(6_000);
    expect(component.activeSlideIndex()).toBe(1);
  });

  it('stays paused until overlapping interactions have both ended', () => {
    const component = TestBed.createComponent(Home).componentInstance;

    component.pauseAutoplay();
    component.pauseAutoplay();
    component.resumeAutoplay();
    vi.advanceTimersByTime(6_000);
    expect(component.activeSlideIndex()).toBe(0);

    component.resumeAutoplay();
    vi.advanceTimersByTime(6_000);
    expect(component.activeSlideIndex()).toBe(1);
  });

  it('does not autoplay when reduced motion is requested', () => {
    vi.mocked(window.matchMedia).mockReturnValue({
      matches: true,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });

    const component = TestBed.createComponent(Home).componentInstance;
    vi.advanceTimersByTime(12_000);

    expect(component.activeSlideIndex()).toBe(0);
  });

  it('clears autoplay when the component is destroyed', () => {
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval');
    const fixture = TestBed.createComponent(Home);

    fixture.destroy();

    expect(clearIntervalSpy).toHaveBeenCalled();
  });

  it('renders configured slides and accessible arrow controls', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const slides = element.querySelectorAll<HTMLImageElement>('.hero-slide');
    const previous = element.querySelector<HTMLButtonElement>(
      '[aria-label="Show previous hero image"]'
    );
    const next = element.querySelector<HTMLButtonElement>('[aria-label="Show next hero image"]');

    expect(slides).toHaveLength(3);
    expect(slides[0].classList.contains('is-active')).toBe(true);
    expect(slides[0].alt).toContain('St. Mina');
    expect(previous).not.toBeNull();
    expect(next).not.toBeNull();
  });

  it('updates the rendered active slide when an arrow is clicked', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();

    const next = fixture.nativeElement.querySelector(
      '[aria-label="Show next hero image"]'
    ) as HTMLButtonElement;
    next.click();
    fixture.detectChanges();

    const slides = fixture.nativeElement.querySelectorAll('.hero-slide');
    expect(slides[1].classList.contains('is-active')).toBe(true);
  });

  it('renders one accessible indicator per slide with the first active', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const indicators = element.querySelectorAll<HTMLButtonElement>(
      '.hero-indicator'
    );

    expect(indicators).toHaveLength(3);
    expect(indicators[0].getAttribute('aria-label')).toBe('Show hero image 1');
    expect(indicators[0].getAttribute('aria-current')).toBe('true');
    expect(indicators[1].hasAttribute('aria-current')).toBe(false);
  });

  it('selects the corresponding slide when an indicator is clicked', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const indicators = element.querySelectorAll<HTMLButtonElement>(
      '.hero-indicator'
    );
    indicators[2].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.activeSlideIndex()).toBe(2);
    expect(indicators[2].getAttribute('aria-current')).toBe('true');
    expect(indicators[0].hasAttribute('aria-current')).toBe(false);
  });

  it('renders the Our Clergy section with three semantic portrait cards', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const heading = element.querySelector('.clergy-section .section-title');
    const cards = element.querySelectorAll<HTMLElement>('.clergy-card');
    const images = element.querySelectorAll<HTMLImageElement>('.clergy-card img');

    expect(heading?.textContent?.trim()).toBe('Our Clergy');
    expect(cards).toHaveLength(3);
    expect(images).toHaveLength(3);
    expect(images[0].alt).toBe('Fr. Boutros Boutros');
    expect(element.textContent).not.toContain('Our Deacons');
  });
});
