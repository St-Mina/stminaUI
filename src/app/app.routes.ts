import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services').then((m) => m.Services),
  },
  {
    path: 'announcements',
    loadComponent: () => import('./pages/announcements/announcements').then((m) => m.Announcements),
  },
  {
    path: 'ministries',
    loadComponent: () => import('./pages/ministries/ministries').then((m) => m.Ministries),
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
    path: '**',
    redirectTo: '',
  },
];
