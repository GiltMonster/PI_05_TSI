import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { VeterinarioListInterface } from '../../interfaces';

@Component({
  selector: 'app-vet-card',
  imports: [CommonModule, MatIconModule],
  standalone: true,
  templateUrl: './vet-card.html',
  styleUrl: './vet-card.scss'
})
export class VetCard {
  vetCard = input.required<VeterinarioListInterface>();

  editClick   = output<VeterinarioListInterface>();
  deleteClick = output<VeterinarioListInterface>();
  viewClick   = output<VeterinarioListInterface>();

  onEdit()   { this.editClick.emit(this.vetCard()); }
  onDelete() { this.deleteClick.emit(this.vetCard()); }
  onView()   { this.viewClick.emit(this.vetCard()); }
}
