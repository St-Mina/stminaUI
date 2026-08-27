import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  protected readonly formData = signal({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  protected readonly submitted = signal(false);

  onSubmit() {
    this.submitted.set(true);
  }
}
