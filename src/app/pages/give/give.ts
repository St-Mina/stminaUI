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

  readonly amounts = [25, 50, 100, 250, 500];

  readonly faqs = [
    {
      question: 'Is my gift tax-deductible?',
      answer:
        'Yes. St. Mina Coptic Orthodox Church is a registered 501(c)(3) nonprofit organization. You will receive a year-end giving statement for your records.',
    },
    {
      question: 'How do I manage my recurring gift?',
      answer:
        'You can manage your recurring gifts through your Tithe.ly account. Log in to update your payment method, change the amount, or cancel at any time.',
    },
    {
      question: 'Is online giving secure?',
      answer:
        'Absolutely. Our giving platform, Tithe.ly, uses bank-level encryption and is PCI compliant to ensure your information is always protected.',
    },
  ];

  selectAmount(amount: number) {
    this.selectedAmount.set(amount);
    this.customAmount.set('');
  }

  selectCustom() {
    this.selectedAmount.set(null);
  }

  toggleFaq(index: number) {
    this.expandedFaq.update((v) => (v === index ? null : index));
  }
}
