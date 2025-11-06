import { Component, ElementRef, HostListener, OnInit, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthLogin } from './services/auth-login';
import { Header } from "./components/header/header";
import { MenuLeft } from "./components/menu-left/menu-left";
import { HeaderContato, HeaderProfile, TextoInicioInterface } from './interfaces';
import { A11yModule, LiveAnnouncer } from '@angular/cdk/a11y';
import { TextoInicio } from './components/texto-inicio/texto-inicio';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, MenuLeft, TextoInicio, A11yModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  isMenuOpen = false;
  isLogado: boolean = false;
  headerContato: HeaderContato[] = [{
    label: 'Fale Conosco',
    wpp: 'chat',
    link: 'https://api.whatsapp.com/send?phone=5511955207242'
  }];
  headerProfile: HeaderProfile[] = [{}];

  constructor(
    private authService: AuthLogin,
    private live: LiveAnnouncer
  ) {
  }

  protected readonly title = signal('prisma_pet');

  ngOnInit(): void {
    this.verifyAuthToken();
  }

  verifyAuthToken() {
    this.authService.verifyToken().subscribe(
      (res) => {
        this.isLogado = res.valid;
        this.headerProfile[0] = {
          nome: res.user.name,
          tipoUsu: res.user.type === 'admin' ? 'Administrador' : res.user.type === 'tutor' ? 'Tutor' : 'Veterinário',
          rotaUrl: '/meu_perfil',
          iconUrl: 'account_circle'
        };
        // console.log('logado');
      },
      (err) => {
        this.isLogado = false;
        // console.log('não logado');
      }
    );
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    this.closeMenu(); // ABNT 5.1
  }

  @ViewChild('menuFabBtn', { read: ElementRef }) menuFabBtn?: ElementRef<HTMLButtonElement>;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.live.announce('Menu aberto', 'polite'); // ABNT 5.7
    } else {
      this.live.announce('Menu fechado', 'polite'); // ABNT 5.7
      this.menuFabBtn?.nativeElement.focus();       // ABNT 5.1
    }
  }

  closeMenu() {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
      this.live.announce('Menu fechado', 'polite'); // ABNT 5.7
      this.menuFabBtn?.nativeElement.focus();       // ABNT 5.1
    }
  }

}
