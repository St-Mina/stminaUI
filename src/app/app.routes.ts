import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'about/saint-mina',
    loadComponent: () => import('./pages/about/saint-mina/saint-mina').then((m) => m.SaintMina),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
  },
  {
    path: 'give',
    loadComponent: () => import('./pages/give/give').then((m) => m.Give),
  },
  {
    path: 'livestream',
    loadComponent: () => import('./pages/livestream/livestream').then((m) => m.Livestream),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
  },
  {
    path: 'prayer-request',
    loadComponent: () => import('./pages/prayer-request/component').then((m) => m.PrayerRequestComponent),
  },
  {
    path: 'gallery',
    loadComponent: () => import('./pages/gallery/gallery').then((m) => m.Gallery),
  },
  {
  path: 'gallery/BishopPhilopateer2026',
  loadComponent: () => import('./pages/gallery/BishopPhilopateer2026/component').then((m) => m.BishopPhilopateer2026),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
