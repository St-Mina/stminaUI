import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-give',
  standalone: true,
  templateUrl: './give.html',
  styleUrl: './give.scss',
})
export class Give {
  protected readonly frequency = signal<'one-time' | 'monthly'>('one-time');
  protected readonly selectedAmount = signal<number | null>(50);
  protected readonly customAmount = signal('');
  protected readonly fund = signal('general');
  protected readonly expandedFaq = signal<number | null>(null);

  private readonly paypalDonationUrl =
    'https://www.paypal.com/US/fundraiser/charity/2266064';

  readonly amounts = [25, 50, 100, 250, 500];

  readonly faqs = [
    {
      question: 'Is my gift tax-deductible?',
      answer:
        'Yes. St. Mina Coptic Orthodox Church is a registered 501(c)(3) nonprofit organization. PayPal will provide a donation receipt for your records.',
    },
    {
      question: 'How do I manage my recurring gift?',
      answer:
        'You can manage your recurring gifts through your PayPal account. Log in to update your payment method, change the amount, or cancel at any time.',
    },
    {
      question: 'Is online giving secure?',
      answer:
       'Online donations are completed securely through PayPal. St. Mina Church does not receive or store your PayPal password or payment-card information.',
    },
  ];

 selectAmount(amount: number): void {
    this.selectedAmount.set(amount);
    this.customAmount.set('');
  }

  selectCustom(): void {
    this.selectedAmount.set(null);
  }

  openPayPal(): void {
    window.open(
      this.paypalDonationUrl,
      '_blank',
      'noopener,noreferrer'
    );
  }

  toggleFaq(index: number): void {
    this.expandedFaq.update((value) =>
      value === index ? null : index
    );
  }
}
