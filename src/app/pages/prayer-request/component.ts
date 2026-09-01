import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-prayer-request',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './component.html',
  styleUrl: './component.scss'
})
export class PrayerRequestComponent {

  prayerForm: FormGroup;

  priests = [
    {
      value: 'boutros',
      label: 'Fr. Boutros',
      phone: '+16152931008'
    },
    {
      value: 'youaness',
      label: 'Fr. Youaness',
      phone: '+16155001950'
    },
    {
      value: 'kyrillos',
      label: 'Fr. Kyrillos',
      phone: '+16152435636'
    }
  ];

  constructor(private fb: FormBuilder) {
    this.prayerForm = this.fb.group({
      name: [''],
      priest: ['', Validators.required],
      phone: [''],
      prayerRequest: [
        '',
        [
          Validators.required,
          Validators.maxLength(1000)
        ]
      ]
    });
  }

  get prayerLength(): number {
    return this.prayerForm.get('prayerRequest')?.value?.length || 0;
  }

  get selectedPriestName(): string {
    const selected = this.priests.find(
      priest => priest.value === this.prayerForm.get('priest')?.value
    );

    return selected?.label || '';
  }

  submitPrayerRequest(): void {
    if (this.prayerForm.invalid) {
      this.prayerForm.markAllAsTouched();
      return;
    }

    const selectedPriest = this.priests.find(
      priest => priest.value === this.prayerForm.value.priest
    );

    if (!selectedPriest) {
      return;
    }

    const name =
      this.prayerForm.value.name?.trim() || 'Anonymous';

    const contactPhone =
      this.prayerForm.value.phone?.trim() || 'Not provided';

    const prayerRequest =
      this.prayerForm.value.prayerRequest?.trim();

    const message =
`Prayer Request | طلب صلاة

Name: ${name}
Phone: ${contactPhone}

Prayer Request | طلب صلاة:
${prayerRequest}

Submitted through St. Mina Nashville`;

    const encodedMessage = encodeURIComponent(message);

    const userAgent =
      navigator.userAgent ||
      navigator.vendor ||
      '';

    const isIOS =
      /iPad|iPhone|iPod/.test(userAgent) ||
      (
        navigator.platform === 'MacIntel' &&
        navigator.maxTouchPoints > 1
      );

    let smsUrl: string;

    if (isIOS) {
      // iPhone / iPad
      smsUrl =
        `sms:${selectedPriest.phone}&body=${encodedMessage}`;
    } else {
      // Android and other mobile devices
      smsUrl =
        `sms:${selectedPriest.phone}?body=${encodedMessage}`;
    }

    window.location.href = smsUrl;
  }
}
