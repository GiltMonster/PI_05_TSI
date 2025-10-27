import { Component, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule, LiveAnnouncer } from '@angular/cdk/a11y';
import { MenuLeft } from '../../components/menu-left/menu-left';
import { Header } from '../../components/header/header';
import { TextoInicio } from '../../components/texto-inicio/texto-inicio';
import { MenuInterface, HeaderContato, HeaderProfile, TextoInicioInterface } from '../../interfaces';


@Component({
  selector: 'app-acesso-admin',
  standalone: true,
  imports: [CommonModule, MenuLeft, Header, TextoInicio, A11yModule],
  templateUrl: './acesso-admin.html',
  styleUrl: './acesso-admin.scss'
})
export class AcessoAdmin {
  isMenuOpen = false;

  @ViewChild('menuFabBtn', { read: ElementRef }) menuFabBtn?: ElementRef<HTMLButtonElement>;

  constructor(private live: LiveAnnouncer) {}

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

  @HostListener('document:keydown.escape')
  onEsc() {
    this.closeMenu(); // ABNT 5.1
  }

  // toggleMenu() { this.isMenuOpen = !this.isMenuOpen; }
  // closeMenu()  { this.isMenuOpen = false; }

  menuAdmin: MenuInterface[] = [
    { label: 'Início',     link: '/home',     icon: 'home' },
    { label: 'Animais',    link: '/pets',     icon: 'pets' },
    { label: 'Tutores',    link: '/tutores',  icon: 'groups' },
    { label: 'Veterinários',   link: '/veterinarios', icon: 'medical_services' },
    { label: 'Serviços',   link: '/services', icon: 'work' },
    { label: 'Meus Dados',   link: '/meus-dados', icon: 'person' },
  ];

  headerContato: HeaderContato[] = [
    {
      label: 'Fale Conosco',
      wpp: 'chat',
      link: 'https://api.whatsapp.com/send?phone=5511955207242'
    }
  ];

  headerProfile: HeaderProfile[] = [
    {
      nome: 'Jessika',
      tipoUsu: 'Administrador',
      rotaUrl: '/meu_perfil',
      iconUrl: 'account_circle'
    }
  ];

  inicioAdmin: TextoInicioInterface[] = [
    {
      imagem: 'assets/imagens/img-acesso-adm.png',
      titulo: 'A VetJA precisa de você!',
      subtitulo: 'Olá querido Adm, a VetJA preza por um atendimento especializado, claro e profissional. Nossos pacientes merecem um atendimento premium, satisfatório e seguro, contamos com você, para que todos os cadastros e controles sejam feitos de forma correta e simples para que nosso funcionamento seja sempre fluido!'
    }
  ];
}
