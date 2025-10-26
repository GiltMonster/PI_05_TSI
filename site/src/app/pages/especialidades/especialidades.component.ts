import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialtyCardComponent } from '../../shared/specialty-card/specialty-card.component';

@Component({
  selector: 'app-especialidades',
  standalone: true,
  imports: [CommonModule, SpecialtyCardComponent],
  templateUrl: './especialidades.component.html',
  styleUrl: './especialidades.component.scss'
})
export class EspecialidadesComponent {
}

