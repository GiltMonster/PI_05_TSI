import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo-circle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo-circle.component.html',
  styleUrl: './logo-circle.component.scss'
})
export class LogoCircleComponent {
  @Input() imageSrc: string = '';
  @Input() alt: string = '';
}

