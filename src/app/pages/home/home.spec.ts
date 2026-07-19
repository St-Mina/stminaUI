import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
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
      providers: [provideRouter([])],
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('renders a subtle rolling announcement banner at the top of the hero', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const banner = element.querySelector('.hero-announcement');
    const track = element.querySelector('.hero-announcement-track');
    const srCopy = element.querySelector('.hero-announcement-sr');

    expect(banner?.getAttribute('aria-label')).toBe('Parish announcement');
    expect(track?.querySelectorAll('.hero-announcement-copy')).toHaveLength(2);
    expect(track?.querySelectorAll('.hero-announcement-item').length).toBeGreaterThan(0);
    expect(element.textContent).toContain(
      'Join us for the Heavenly Liturgy every Thursday at 5 a.m.'
    );
    expect(element.textContent).toContain('come rise with us in prayer.');
    expect(element.textContent).not.toContain('—');
    expect(srCopy?.textContent).toContain('come rise with us in prayer.');
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

  it('defines an explicit crop for every clergy portrait', () => {
    const component = TestBed.createComponent(Home).componentInstance;

    expect(component.clergy.every((member) => member.imageScale > 0)).toBe(true);
    expect(component.clergy.every((member) => Number.isFinite(member.imageOffsetY))).toBe(true);
  });

  it('expands and collapses clergy biographies independently', () => {
    const component = TestBed.createComponent(Home).componentInstance;

    expect(component.isClergyExpanded('Fr. Boutros Boutros')).toBe(false);
    component.toggleClergyBiography('Fr. Boutros Boutros');
    expect(component.isClergyExpanded('Fr. Boutros Boutros')).toBe(true);
    expect(component.isClergyExpanded('Fr. Kyrillos Zaki')).toBe(false);
    component.toggleClergyBiography('Fr. Boutros Boutros');
    expect(component.isClergyExpanded('Fr. Boutros Boutros')).toBe(false);
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
    const portraits = element.querySelectorAll<HTMLElement>('.clergy-portrait');

    expect(heading?.textContent?.trim()).toBe('Our Clergy');
    expect(cards).toHaveLength(3);
    expect(images).toHaveLength(3);
    expect(images[0].alt).toBe('Fr. Boutros Boutros');
    expect(portraits).toHaveLength(3);
    expect(portraits[0].querySelector('img')?.alt).toBe('Fr. Boutros Boutros');
    expect(element.textContent).not.toContain('Our Deacons');
  });

  it('renders three static latest-news cards with feast-first CTA copy', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const cards = element.querySelectorAll<HTMLElement>('.news-section .news-card');
    const heading = element.querySelector('.news-section .section-title');

    expect(heading?.textContent?.trim()).toBe('Latest News');
    expect(cards).toHaveLength(3);
    expect(element.textContent).toContain('The Feast of Transfiguration');
    expect(element.textContent).toContain(
      'Join us in prayer as we celebrate the Feast of Transfiguration on Wednesday, August 19'
    );
    expect(element.textContent).not.toContain('No announcements yet.');
    expect(element.textContent).not.toContain('Unable to load posts right now.');
  });

  it('renders four ministry teaser cards from the shared ministry data', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const cards = element.querySelectorAll<HTMLElement>('.ministries-preview .ministry-card');
    const images = element.querySelectorAll<HTMLImageElement>('.ministries-preview .ministry-card img');
    const explore = element.querySelector<HTMLAnchorElement>('.ministries-preview .section-action a');

    expect(cards).toHaveLength(4);
    expect(images).toHaveLength(4);
    expect(images[0].src).toContain('youthMinistry-upscaled-20260702-214734.webp');
    expect(explore?.getAttribute('href')).toContain('/ministries');
  });

  it('expands one clergy biography from its accessible toggle', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const toggles = element.querySelectorAll<HTMLButtonElement>('.clergy-toggle');
    expect(toggles).toHaveLength(3);
    expect([...toggles].map((button) => button.textContent?.trim())).toEqual([
      'Read More',
      'Read More',
      'Read More',
    ]);
    expect(toggles[1].getAttribute('aria-expanded')).toBe('false');

    toggles[1].click();
    fixture.detectChanges();

    expect(toggles[1].textContent?.trim()).toBe('Show Less');
    expect(toggles[1].getAttribute('aria-expanded')).toBe('true');
    expect(toggles[0].textContent?.trim()).toBe('Read More');
  });
});
