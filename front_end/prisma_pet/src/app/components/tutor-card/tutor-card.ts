import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UserInterface } from '../../interfaces';

@Component({
  selector: 'app-tutor-card',
  imports: [CommonModule, MatIconModule],
  standalone: true,
  templateUrl: './tutor-card.html',
  styleUrls: ['./tutor-card.scss']
})
export class TutorCard {
  tutorCard = input.required<UserInterface>();

  editClick   = output<UserInterface>();
  deleteClick = output<UserInterface>();
  viewClick   = output<UserInterface>();

  onEdit()   { this.editClick.emit(this.tutorCard()); }
  onDelete() { this.deleteClick.emit(this.tutorCard()); }
  onView()   { this.viewClick.emit(this.tutorCard()); }
}
