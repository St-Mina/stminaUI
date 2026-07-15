import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly mobileMenuOpen = signal(false);
  protected readonly aboutMenuOpen = signal(false);

  toggleMenu() {
    this.mobileMenuOpen.update((v) => !v);
  }

  toggleAboutMenu() {
    this.aboutMenuOpen.update((v) => !v);
  }

  closeMenu() {
    this.mobileMenuOpen.set(false);
    this.aboutMenuOpen.set(false);
  }

  openAboutMenu() {
    this.aboutMenuOpen.set(true);
  }

  closeAboutMenu() {
    this.aboutMenuOpen.set(false);
  }
}
