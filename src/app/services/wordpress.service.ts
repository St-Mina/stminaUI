import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

export interface WordPressPost {
  id: number;
  date: string;
  link: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
}

@Injectable({ providedIn: 'root' })
export class WordpressService {
  private readonly apiBase = environment.wordpressApiBaseUrl.replace(/\/$/, '');

  constructor(private readonly http: HttpClient) {}

  getLatestPosts(limit: number): Observable<WordPressPost[]> {
    const params = new HttpParams().set('per_page', limit).set('_embed', true);

    return this.http.get<WordPressPost[]>(`${this.apiBase}/wp/v2/posts`, { params });
  }
}
