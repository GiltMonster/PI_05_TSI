import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamCardComponent } from '../../shared/team-card/team-card.component';

@Component({
  selector: 'app-equipe',
  standalone: true,
  imports: [CommonModule, TeamCardComponent],
  templateUrl: './equipe.component.html',
  styleUrl: './equipe.component.scss'
})
export class EquipeComponent {
}

