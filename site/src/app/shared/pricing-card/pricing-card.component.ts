import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pricing-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pricing-card.component.html',
  styleUrl: './pricing-card.component.scss'
})
export class PricingCardComponent {
  @Input() iconSrc: string = '';
  @Input() title: string = '';
  @Input() price: string = '';
  @Input() buttonText: string = '';
  @Input() features: string[] = [];
  @Input() isPro: boolean = false;

  constructor(private router: Router) {}

  navigateToPlanos(): void {
    this.router.navigate(['/planos']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
