import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-give',
  standalone: true,
  templateUrl: './give.html',
  styleUrl: './give.scss',
})
export class Give {
  protected readonly expandedFaq = signal<number | null>(null);

  readonly faqs = [
    {
      question: 'Is my gift tax-deductible?',
      answer:
        'Yes. St. Mina Coptic Orthodox Church is a registered 501(c)(3) nonprofit organization. You will receive a year-end giving statement for your records.',
    },
    {
      question: 'How do I set up a recurring gift?',
      answer:
        "You can set up a recurring transfer through Zelle or your bank's direct deposit / bill pay feature using the account details above. For help setting one up, contact our treasury team.",
    },
    {
      question: 'Is giving by Zelle or direct deposit secure?',
      answer:
        "Yes. Both move funds directly between bank accounts using your own bank's encryption and security — there's no third-party platform involved.",
    },
  ];

  toggleFaq(index: number) {
    this.expandedFaq.update((v) => (v === index ? null : index));
  }
}
