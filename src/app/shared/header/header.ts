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

  toggleMenu() {
    this.mobileMenuOpen.update((v) => !v);
  }

  closeMenu() {
    this.mobileMenuOpen.set(false);
  }
}
