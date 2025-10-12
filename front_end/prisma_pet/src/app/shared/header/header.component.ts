import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() userName: string = '';
  @Input() userType: string = '';
  @Input() userAvatar: string = '';
  
  @Output() searchEvent = new EventEmitter<string>();
  @Output() contactEvent = new EventEmitter<void>();
  @Output() profileEvent = new EventEmitter<void>();
  @Output() logoutEvent = new EventEmitter<void>();

  searchTerm: string = '';

  onSearch(): void {
    this.searchEvent.emit(this.searchTerm);
  }

  onContact(): void {
    this.contactEvent.emit();
  }

  onProfile(): void {
    this.profileEvent.emit();
  }

  onLogout(): void {
    this.logoutEvent.emit();
  }

  getUserTypeLabel(): string {
    switch(this.userType) {
      case 'admin': return 'Administrador';
      case 'vet': return 'Veterinário';
      case 'user': return 'Tutor';
      default: return 'Usuário';
    }
  }
}
