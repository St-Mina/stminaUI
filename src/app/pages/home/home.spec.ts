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

  it('wraps next and previous navigation', () => {
    const component = TestBed.createComponent(Home).componentInstance;

    component.showPreviousSlide();
    expect(component.activeSlideIndex()).toBe(2);

    component.showNextSlide();
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
});
