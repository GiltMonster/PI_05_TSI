import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-promo-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promo-banner.component.html',
  styleUrl: './promo-banner.component.scss'
})
export class PromoBannerComponent {
  @Input() title: string = '';
  @Input() description: string = '';
}

