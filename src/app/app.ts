import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { catchError, of } from 'rxjs';

import { WordpressService } from './services/wordpress.service';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, DatePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly wordpressService = inject(WordpressService);

  protected readonly siteName = 'St. Mina Church';
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly posts$ = this.wordpressService.getLatestPosts(6).pipe(
    catchError(() => {
      this.errorMessage.set('Unable to load posts from WordPress right now.');
      return of([]);
    })
  );

}
