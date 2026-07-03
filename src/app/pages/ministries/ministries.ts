import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ministries as ministryContent } from './ministries.data';

@Component({
  selector: 'app-ministries',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './ministries.html',
  styleUrl: './ministries.scss',
})
export class Ministries {
  readonly ministries = ministryContent;
}
