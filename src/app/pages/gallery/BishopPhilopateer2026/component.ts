import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bishop-philopateer-2026',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './component.html',
  styleUrl: './component.scss'
})
export class BishopPhilopateer2026 {

  selectedImageIndex = signal<number | null>(null);

  title = "H.G. Bishop Philopateer's Visit (2026)";

  images: string[] = [
    'assets/gallery/BishopPhilopateer2026/DSC_3063.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3064.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3065.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3066.JPG'
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
