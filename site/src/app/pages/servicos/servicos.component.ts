import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceCardComponent } from '../../shared/service-card/service-card.component';
import { FeatureCardComponent } from '../../shared/feature-card/feature-card.component';

@Component({
  selector: 'app-servicos',
  standalone: true,
  imports: [CommonModule, ServiceCardComponent, FeatureCardComponent],
  templateUrl: './servicos.component.html',
  styleUrl: './servicos.component.scss'
})
export class ServicosComponent {
}

