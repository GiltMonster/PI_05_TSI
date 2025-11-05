import { A11yModule, LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import {
  HeaderContato,
  HeaderProfile,
  MenuInterface,
  ServicosListInterface,
} from '../../interfaces';
import { CommonModule } from '@angular/common';
import { MenuLeft } from '../../components/menu-left/menu-left';
import { Header } from '../../components/header/header';
import { MatIconModule } from '@angular/material/icon';
import { ServiceList } from '../../components/service-list/service-list';

@Component({
  selector: 'app-servicos',
  standalone: true,
  imports: [CommonModule, MenuLeft, Header, A11yModule, MatIconModule, ServiceList],
  templateUrl: './servicos.html',
  styleUrls: ['./servicos.scss'],
})
export class Servicos {
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

  listServicos: ServicosListInterface[] = [
    { id: 1, titulo: 'Consulta Clínica', categoria: 'Consulta', valor: 230.0 },
    { id: 2, titulo: 'Vacina Raiva', categoria: 'Vacina', valor: 190.0 },
    { id: 3, titulo: 'Vacina V10', categoria: 'Vacina', valor: 240.0 },
    { id: 4, titulo: 'Ecocardiograma', categoria: 'Exame de Imagem', valor: 500.0 },
    { id: 5, titulo: 'Eletrocardiograma', categoria: 'Exame de Imagem', valor: 350.0 },
  ];

  filtered: ServicosListInterface[] = [...this.listServicos];

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
      ? [...this.listServicos]
      : this.listServicos.filter(
          (p) => this.norm(p.categoria).includes(q) || this.norm(p.titulo).includes(q)
        );
  }

  onEditServico(p: ServicosListInterface) {}
  onDeleteServico(p: ServicosListInterface) {}
}
