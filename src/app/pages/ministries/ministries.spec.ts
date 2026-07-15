import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Ministries } from './ministries';

describe('Ministries page', () => {
  it('renders the five ministries from the shared image list', () => {
    const fixture = TestBed.configureTestingModule({
      imports: [Ministries],
      providers: [provideRouter([])],
    }).createComponent(Ministries);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const blocks = element.querySelectorAll<HTMLElement>('.ministries-list .ministry-block');
    const images = element.querySelectorAll<HTMLImageElement>('.ministries-list .ministry-image img');

    expect(blocks).toHaveLength(5);
    expect(images).toHaveLength(5);
    expect(images[0].src).toContain('youthMinistry-upscaled-20260702-214734.webp');
    expect(images[4].src).toContain('familyOutreach-upscaled-20260702-220117.webp');
    expect(blocks[0].textContent).toContain('Youth Ministry');
  });
});
