import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MenuLeft } from '../../components/menu-left/menu-left';
import { Header } from '../../components/header/header';
import { A11yModule, LiveAnnouncer } from '@angular/cdk/a11y';
import { MatIconModule } from '@angular/material/icon';
import { VetList } from '../../components/vet-list/vet-list';
import {
  HeaderContato,
  HeaderProfile,
  MenuInterface,
  VeterinarioListInterface,
} from '../../interfaces';

@Component({
  selector: 'app-veterinarios',
  standalone: true,
  imports: [CommonModule, MenuLeft, Header, A11yModule, MatIconModule, VetList],
  templateUrl: './veterinarios.html',
  styleUrl: './veterinarios.scss',
})
export class Veterinarios {
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

  listVets: VeterinarioListInterface[] = [
    { id: 1, nome: 'Pamela Pereira', crmv: 'CRMV: 4556 - SP', especialidade: 'Clinica' },
    { id: 2, nome: 'Mirian Azevedo', crmv: 'CRMV: 4556 - SP', especialidade: 'Clinica' },
    { id: 3, nome: 'Ana Carolina Primo', crmv: 'CRMV: 4556 - SP', especialidade: 'Clinica' },
    {
      id: 4,
      nome: 'Giovanna Brancacci',
      crmv: 'CRMV: 4556 - SP',
      especialidade: 'Clinica  |  Cirurgiã',
    },
  ];

  filtered: VeterinarioListInterface[] = [...this.listVets];

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
      ? [...this.listVets]
      : this.listVets.filter(
          (p) => this.norm(p.especialidade).includes(q) || this.norm(p.nome).includes(q)
        );
  }

  onViewVet(p: VeterinarioListInterface) {}
  onEditVet(p: VeterinarioListInterface) {}
  onDeleteVet(p: VeterinarioListInterface) {}
}
