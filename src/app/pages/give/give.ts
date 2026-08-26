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
      question: 'How do I set up a recurring payment?',
      answer:
        "You can set up a recurring payment through your bank’s bill pay or recurring transfer feature using the account details above. If your bank supports recurring Zelle payments, you may also set one up through Zelle.",
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
