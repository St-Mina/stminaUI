import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bishop-makar-2026',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './component.html',
  styleUrl: './component.scss'
})
export class BishopMakar2026 {

  selectedImageIndex = signal<number | null>(null);

  title = "H.G. Bishop Makar's Visit (2026)";

  images: string[] = [
    'assets/gallery/BishopMakar2026/1.jpg',
    'assets/gallery/BishopMakar2026/2.jpg',
    'assets/gallery/BishopMakar2026/3.jpg',
    'assets/gallery/BishopMakar2026/4.jpg',
    'assets/gallery/BishopMakar2026/5.jpg',
    'assets/gallery/BishopMakar2026/6.jpg',
    'assets/gallery/BishopMakar2026/7.jpg',
    'assets/gallery/BishopMakar2026/8.jpg',
    'assets/gallery/BishopMakar2026/9.jpg',
    'assets/gallery/BishopMakar2026/10.jpg',
    'assets/gallery/BishopMakar2026/11.jpg',
    'assets/gallery/BishopMakar2026/12.jpg',
    'assets/gallery/BishopMakar2026/13.jpg',
    'assets/gallery/BishopMakar2026/14.jpg',
    'assets/gallery/BishopMakar2026/15.jpg',
    'assets/gallery/BishopMakar2026/16.jpg',
    'assets/gallery/BishopMakar2026/17.jpg',
    'assets/gallery/BishopMakar2026/18.jpg',
    'assets/gallery/BishopMakar2026/19.jpg',
    'assets/gallery/BishopMakar2026/20.jpg',
    'assets/gallery/BishopMakar2026/21.jpg',
  ];

  openImage(index: number): void {
    this.selectedImageIndex.set(index);
  }

  closeImage(): void {
    this.selectedImageIndex.set(null);
  }

  previousImage(): void {
    const current = this.selectedImageIndex();

    if (current === null) {
      return;
    }

    const previous =
      current === 0
        ? this.images.length - 1
        : current - 1;

    this.selectedImageIndex.set(previous);
  }

  nextImage(): void {
    const current = this.selectedImageIndex();

    if (current === null) {
      return;
    }

    const next =
      current === this.images.length - 1
        ? 0
        : current + 1;

    this.selectedImageIndex.set(next);
  }
}
