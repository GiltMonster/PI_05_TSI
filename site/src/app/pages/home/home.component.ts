import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromoBannerComponent } from '../../shared/promo-banner/promo-banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PromoBannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
}

