import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ministries',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './ministries.html',
  styleUrl: './ministries.scss',
})
export class Ministries {}
