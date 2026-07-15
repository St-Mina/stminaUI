import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { routes } from '../../../app.routes';
import { App } from '../../../app';
import { SaintMina } from './saint-mina';
import { saintMinaStorySections } from './saint-mina-story.data';

describe('SaintMina story page', () => {
  it('loads through the app router', async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();

    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    fixture.detectChanges();
    await router.navigateByUrl('/about/saint-mina');
    await fixture.whenStable();
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('app-saint-mina')).toBeTruthy();
    expect(element.textContent).toContain('Saint Mina the Wonder-Worker');
  });

  it('renders the hero and all story sections', () => {
    const fixture = TestBed.configureTestingModule({
      imports: [SaintMina],
      providers: [provideRouter([])],
    }).createComponent(SaintMina);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('.story-hero-content h1')?.textContent).toContain(
      'Saint Mina the Wonder-Worker'
    );
    expect(element.querySelector('.story-hero-image img')?.getAttribute('src')).toContain(
      'stMina.png'
    );
    expect(element.querySelector('.story-audio audio')?.getAttribute('src')).toContain(
      'stMinaAudio.mp3'
    );
    expect(element.querySelectorAll('.chapter')).toHaveLength(
      saintMinaStorySections.length
    );
    expect(element.textContent).toContain('The intercession of Mari-Mina be with us');
  });

  it('highlights the paragraph that matches the current audio time', () => {
    const fixture = TestBed.configureTestingModule({
      imports: [SaintMina],
      providers: [provideRouter([])],
    }).createComponent(SaintMina);
    fixture.detectChanges();

    const component = fixture.componentInstance;
    const audio = fixture.nativeElement.querySelector('.story-audio audio') as HTMLAudioElement;

    Object.defineProperty(audio, 'currentTime', { value: 40, configurable: true });
    audio.dispatchEvent(new Event('timeupdate'));
    fixture.detectChanges();

    expect(component.activeParagraphId()).toBe('son-promised-1');
    expect(
      fixture.nativeElement.querySelector('#son-promised-1')?.classList.contains('story-paragraph-active')
    ).toBe(true);
    expect(
      fixture.nativeElement.querySelector('.story-audio-progress-fill')?.getAttribute('style')
    ).toContain('width');
  });

  it('scrolls when the active paragraph changes during playback', () => {
    const fixture = TestBed.configureTestingModule({
      imports: [SaintMina],
      providers: [provideRouter([])],
    }).createComponent(SaintMina);
    fixture.detectChanges();

    const paragraph = fixture.nativeElement.querySelector('#son-promised-1') as HTMLElement;
    const scrollIntoView = vi.fn();
    paragraph.scrollIntoView = scrollIntoView as typeof paragraph.scrollIntoView;

    const audio = fixture.nativeElement.querySelector('.story-audio audio') as HTMLAudioElement;
    Object.defineProperty(audio, 'currentTime', { value: 40, configurable: true });
    Object.defineProperty(audio, 'duration', { value: 605, configurable: true });
    audio.dispatchEvent(new Event('timeupdate'));
    fixture.detectChanges();

    expect(scrollIntoView).toHaveBeenCalledWith(
      expect.objectContaining({ block: 'center' })
    );
  });
});
