import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
  active?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() userType: string = '';
  @Input() activeItem: string = '';
  @Input() isCollapsed: boolean = false;
  
  @Output() itemClick = new EventEmitter<string>();
  @Output() toggleCollapse = new EventEmitter<void>();

  getMenuItems(): MenuItem[] {
    switch(this.userType) {
      case 'user':
      default:
        return [
          { id: 'inicio', label: 'Início', icon: '/icon_inicio.svg', route: '/inicio' },
          { id: 'meus-animais', label: 'Meus Animais', icon: '/icon_pata.svg', route: '/meus-animais' },
          { id: 'meus-dados', label: 'Meus Dados', icon: '/icon_menus_dados.svg', route: '/meus-dados' }
        ];
    }
  }

  onItemClick(item: MenuItem): void {
    this.itemClick.emit(item.id);
  }

  onToggleCollapse(): void {
    this.toggleCollapse.emit();
  }

  isItemActive(itemId: string): boolean {
    return this.activeItem === itemId;
  }

  getUserTypeLabel(): string {
    switch(this.userType) {
      case 'user': return 'Tutor';
      default: return 'Tutor';
    }
  }
}
