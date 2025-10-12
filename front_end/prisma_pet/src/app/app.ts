import { Component, signal, HostBinding, OnInit } from '@angular/core';
import { RouterOutlet, Router, RouterModule, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, HeaderComponent, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('prisma_pet');
  
  userName = 'Pedro';
  userType = 'user';
  userAvatar = '';
  activeMenuItem = 'inicio';
  sidebarCollapsed = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateActiveMenuItem(event.url);
      });
  }

  private updateActiveMenuItem(url: string): void {
    if (url.includes('/cadastro-pet') || url.includes('/editar-pet')) {
      this.activeMenuItem = 'meus-animais';
    } else if (url.includes('/meus-dados')) {
      this.activeMenuItem = 'meus-dados';
    } else if (url.includes('/meus-animais')) {
      this.activeMenuItem = 'meus-animais';
    } else if (url.includes('/inicio')) {
      this.activeMenuItem = 'inicio';
    }
  }

  onSearch(searchTerm: string): void {
    console.log('Buscar:', searchTerm);
  }

  onContact(): void {
    console.log('Fale Conosco clicado');
  }

  onProfile(): void {
    console.log('Perfil clicado');
  }

  onLogout(): void {
    console.log('Logout clicado');
  }

  onMenuItemClick(itemId: string): void {
    console.log('Menu item clicado:', itemId);
    this.activeMenuItem = itemId;
    
    switch(itemId) {
      case 'inicio':
      case 'dashboard':
        this.router.navigate(['/inicio']);
        break;
      case 'meus-animais':
      case 'pacientes':
      case 'pets':
        this.router.navigate(['/meus-animais']);
        break;
              case 'meus-dados':
                this.router.navigate(['/meus-dados']);
                break;
      case 'usuarios':
        console.log('Navegar para Usuários');
        break;
      case 'veterinarios':
        console.log('Navegar para Veterinários');
        break;
      case 'consultas':
        console.log('Navegar para Consultas');
        break;
      default:
        this.router.navigate(['/inicio']);
    }
  }

  onToggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  @HostBinding('class.sidebar-collapsed')
  get isSidebarCollapsed(): boolean {
    return this.sidebarCollapsed;
  }
}
