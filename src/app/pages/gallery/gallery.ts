import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface GalleryItem {
  title: string;
  slug: string;
  image: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})
export class Gallery {

  searchTerm = signal('');

  galleries: GalleryItem[] = [
    {
      title: "H.G. Bishop Philopateer's Visit (2026)",
      slug: 'bishop-philopateer-visit-2026',
      image: 'assets/gallery/BishopPhilopateer2026/DSC_3063'
    }
  ];

  filteredGalleries = computed(() => {
    const search = this.searchTerm()
      .trim()
      .toLowerCase();

    if (!search) {
      return this.galleries;
    }

    return this.galleries.filter(gallery =>
      gallery.title.toLowerCase().includes(search)
    );
  });
}
