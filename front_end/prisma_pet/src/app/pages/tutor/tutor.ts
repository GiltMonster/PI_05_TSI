import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MenuLeft } from '../../components/menu-left/menu-left';
import { Header } from '../../components/header/header';
import { A11yModule, LiveAnnouncer } from '@angular/cdk/a11y';
import { MatIconModule } from '@angular/material/icon';
import { TutorList } from '../../components/tutor-list/tutor-list';
import { HeaderContato, HeaderProfile, MenuInterface, TutorListInterface } from '../../interfaces';

@Component({
  selector: 'app-tutor',
  standalone: true,
  imports: [CommonModule, MenuLeft, Header, A11yModule, MatIconModule, TutorList],
  templateUrl: './tutor.html',
  styleUrls: ['./tutor.scss'],
})
export class Tutor {
  isMenuOpen = false;
  @ViewChild('menuFabBtn', { read: ElementRef }) menuFabBtn?: ElementRef<HTMLButtonElement>;

  constructor(private live: LiveAnnouncer) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.live.announce('Menu aberto', 'polite'); // ABNT 5.7
    } else {
      this.live.announce('Menu fechado', 'polite'); // ABNT 5.7
      this.menuFabBtn?.nativeElement.focus(); // ABNT 5.1
    }
  }

  closeMenu() {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
      this.live.announce('Menu fechado', 'polite'); // ABNT 5.7
      this.menuFabBtn?.nativeElement.focus(); // ABNT 5.1
    }
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    this.closeMenu(); // ABNT 5.1
  }

  menuVet: MenuInterface[] = [
    { label: 'Início', link: '/vet', icon: 'home' },
    { label: 'Animais', link: '/animais', icon: 'pets' },
    { label: 'Responsáveis', link: '/responsaveis', icon: 'groups' },
    { label: 'Veterinários', link: '/veterinarios', icon: 'medical_services' },
    { label: 'Serviços', link: '/services', icon: 'work' },
    { label: 'Meus Dados', link: '/meus-dados', icon: 'person' },
  ];

  headerContato: HeaderContato[] = [
    {
      label: 'Fale Conosco',
      wpp: 'chat',
      link: 'https://api.whatsapp.com/send?phone=5511955207242',
    },
  ];

  headerProfile: HeaderProfile[] = [
    {
      nome: 'Giovanna',
      tipoUsu: 'Veterinária',
      rotaUrl: '/meu_perfil',
      iconUrl: 'account_circle',
    },
  ];

  listTutores: TutorListInterface[] = [
    { id: 1, nome: 'Luciene Angelo', telefone: '(11)95520-7242', animal: 'Luma' },
    { id: 2, nome: 'Giovanna Piccinato', telefone: '(11)95520-7242', animal: 'Simba' },
    { id: 3, nome: 'Pedro Marques', telefone: '(11)95520-7242', animal: 'Tereza' },
    { id: 4, nome: 'Pedro Marques', telefone: '(11)95520-7242', animal: 'Nicolas' },
    { id: 5, nome: 'Andrea Marques', telefone: '(11)95520-7242', animal: 'Evair' },
  ];

  filtered: TutorListInterface[] = [...this.listTutores];

  private norm(t = '') {
    return t
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .trim();
  }

  onSearch(term: string) {
    const q = this.norm(term);
    this.filtered = !q
      ? [...this.listTutores]
      : this.listTutores.filter(
          (p) => this.norm(p.animal).includes(q) || this.norm(p.nome).includes(q)
        );
  }

  onViewTutor(p: TutorListInterface) {}
  onEditTutor(p: TutorListInterface) {}
  onDeleteTutor(p: TutorListInterface) {}
}
