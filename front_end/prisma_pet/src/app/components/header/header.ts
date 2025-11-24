import { Component, input } from '@angular/core';
import { HeaderContato, HeaderProfile } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthLogin } from '../../services/auth-login';
import { Notification } from '../../services/notification';
import { Loading } from '../loading/loading';
import { MenuService } from '../../services/menu-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule, Loading],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header {
  contato = input.required<HeaderContato[]>();
  profile = input.required<HeaderProfile[]>();
  collapsed = input(false);
  logo = 'assets/imagens/img-logo-novo.png';
  loading = false;

  constructor(
    private authService: AuthLogin,
    private router: Router,
    private notification: Notification,
    private menuService: MenuService
  ) {}

  openProfile() {
    this.loading = true;

    this.menuService.getTypeMenuUser().subscribe({
      next: (typeUser) => {
        this.loading = false;

        if (typeUser.type === 'admin') {
          this.router.navigate(['/admin/perfil']);
        } else if (typeUser.type === 'vet') {
          this.router.navigate(['/vet/perfil']);
        } else {
          this.router.navigate(['/user/perfil']);
        }
      },
      error: (err) => {
        this.loading = false;
        this.notification.error('Erro ao abrir a tela de Meus Dados.');
      },
    });
  }

  logout() {
    this.loading = true;
    this.authService.logout().subscribe(
      (res) => {
        localStorage.clear();
        window.location.reload();
        this.router.navigate(['/']);
        this.notification.success('Logout realizado com sucesso.');
        this.loading = false;
      },
      (err) => {
        console.log('Erro ao fazer logout:', err);
        this.notification.error('Erro ao fazer logout - Tente novamente.');
        this.loading = false;
      }
    );
  }
}
