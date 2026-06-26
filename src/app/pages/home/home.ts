import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';

import { WordpressService } from '../../services/wordpress.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, DatePipe, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly wordpressService = inject(WordpressService);

  protected readonly errorMessage = signal<string | null>(null);
  protected readonly posts$ = this.wordpressService.getLatestPosts(3).pipe(
    catchError(() => {
      this.errorMessage.set('Unable to load posts right now.');
      return of([]);
    })
  );
}
