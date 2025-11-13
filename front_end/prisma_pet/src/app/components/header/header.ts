import { Component, input } from '@angular/core';
import { HeaderContato, HeaderProfile } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthLogin } from '../../services/auth-login';
import { Notification } from '../../services/notification';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  contato = input.required<HeaderContato[]>();
  profile = input.required<HeaderProfile[]>();
  collapsed = input(false);
  logo = "assets/imagens/img-logo-novo.png";

  constructor(
    private authService: AuthLogin,
    private router: Router,
    private notification: Notification,
  ) { }

  logout() {
    this.authService.logout().subscribe(
      (res) => {
        localStorage.clear();
        window.location.reload();
        this.router.navigate(['/']);
        this.notification.success('Logout realizado com sucesso.');
      },
      (err) => {
        console.log('Erro ao fazer logout:', err);
        this.notification.error('Erro ao fazer logout - Tente novamente.');
      }
    );
  }

}
