import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-specialty-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './specialty-card.component.html',
  styleUrl: './specialty-card.component.scss'
})
export class SpecialtyCardComponent {
  @Input() iconSrc: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
}

