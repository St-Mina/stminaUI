import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-visitation-request',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './component.html',
  styleUrl: './component.scss'
})
export class VisitationRequestComponent {

  visitationForm: FormGroup;

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

    this.visitationForm = this.fb.group({

      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(9)
        ]
      ],

      priest: [
        '',
        Validators.required
      ],

      address: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          this.addressValidator()
        ]
      ],

      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{10,15}$/)
        ]
      ],

      familyMembers: [
        '',
        [
          Validators.required,
          Validators.minLength(9)
        ]
      ]

    });

  }


  /* =========================
     SELECTED PRIEST
  ========================== */

  get selectedPriestName(): string {

    const selected = this.priests.find(
      priest =>
        priest.value ===
        this.visitationForm.get('priest')?.value
    );

    return selected?.label || '';

  }


  /* =========================
     ADDRESS VALIDATION
  ========================== */

  private addressValidator(): ValidatorFn {

    return (
      control: AbstractControl
    ): ValidationErrors | null => {

      const value =
        String(control.value || '').trim();

      if (!value) {
        return null;
      }

      const hasNumber = /\d/.test(value);
      const hasLetters = /[A-Za-z]/.test(value);

      if (!hasNumber || !hasLetters) {

        return {
          invalidAddress: true
        };

      }

      return null;

    };

  }


  /* =========================
     PHONE INPUT
  ========================== */

  onPhoneInput(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    /*
     * Remove everything except numbers.
     */

    const numbersOnly =
      input.value.replace(/\D/g, '');

    input.value = numbersOnly;

    this.visitationForm
      .get('phone')
      ?.setValue(
        numbersOnly,
        {
          emitEvent: false
        }
      );

  }


  /* =========================
     SUBMIT
  ========================== */

  submitVisitationRequest(): void {

    if (this.visitationForm.invalid) {

      this.visitationForm.markAllAsTouched();

      return;

    }


    const selectedPriest = this.priests.find(
      priest =>
        priest.value ===
        this.visitationForm.value.priest
    );


    if (!selectedPriest) {
      return;
    }


    const fullName =
      this.visitationForm.value.fullName?.trim();

    const address =
      this.visitationForm.value.address?.trim();

    const phone =
      this.visitationForm.value.phone?.trim();

    const familyMembers =
      this.visitationForm.value.familyMembers?.trim();


    const message =
`Visitation Request

Full Name: ${fullName}

Phone Number: ${phone}

Full Address:
${address}

Family Members:
${familyMembers}

Submitted through St. Mina Nashville`;


    const encodedMessage =
      encodeURIComponent(message);


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


      smsUrl =
        `sms:${selectedPriest.phone}&body=${encodedMessage}`;

    } else {

      smsUrl =
        `sms:${selectedPriest.phone}?body=${encodedMessage}`;

    }

    window.location.href = smsUrl;

  }
}
