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
      case 'admin':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: '/Icon_inicio.png', route: '/dashboard' },
          { id: 'usuarios', label: 'Usuários', icon: '/Icon_tutores.png', route: '/usuarios' },
          { id: 'veterinarios', label: 'Veterinários', icon: '/Icon_servicos.png', route: '/veterinarios' },
          { id: 'pets', label: 'Pets', icon: '/icon_pata.png', route: '/pets' },
          { id: 'meus-dados', label: 'Meus Dados', icon: '/icon_meus_dados.png', route: '/meus-dados' }
        ];
      
      case 'vet':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: '/Icon_inicio.png', route: '/dashboard' },
          { id: 'pacientes', label: 'Meus Pacientes', icon: '/icon_pata.png', route: '/pacientes' },
          { id: 'consultas', label: 'Consultas', icon: '/Icon_servicos.png', route: '/consultas' },
          { id: 'meus-dados', label: 'Meus Dados', icon: '/icon_meus_dados.png', route: '/meus-dados' }
        ];
      
      case 'user':
      default:
        return [
          { id: 'inicio', label: 'Início', icon: '/Icon_inicio.png', route: '/inicio' },
          { id: 'meus-animais', label: 'Meus Animais', icon: '/icon_pata.png', route: '/meus-animais' },
          { id: 'meus-dados', label: 'Meus Dados', icon: '/icon_meus_dados.png', route: '/meus-dados' }
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
      case 'admin': return 'Administrador';
      case 'vet': return 'Veterinário';
      case 'user': return 'Tutor';
      default: return 'Usuário';
    }
  }
}
