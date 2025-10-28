import { Component, input, output } from '@angular/core';
import { ServicosListInterface } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-service-card',
  imports: [CommonModule, MatIconModule],
  standalone: true,
  templateUrl: './service-card.html',
  styleUrls: ['./service-card.scss']
})
export class ServiceCard {
servicoCard = input.required<ServicosListInterface>();

  editClick   = output<ServicosListInterface>();
  deleteClick = output<ServicosListInterface>();

  onEdit()   { this.editClick.emit(this.servicoCard()); }
  onDelete() { this.deleteClick.emit(this.servicoCard()); }
}
