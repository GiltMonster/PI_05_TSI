import { Component, ElementRef, HostListener, input, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderContato, HeaderProfile, MenuInterface, PetListInterface } from '../../interfaces';
import { Header } from '../../components/header/header';
import { MenuLeft } from '../../components/menu-left/menu-left';
import { A11yModule, LiveAnnouncer } from '@angular/cdk/a11y';
import { AnimalList } from '../../components/animal-list/animal-list';

@Component({
  selector: 'app-animais',
  standalone: true,
  imports: [CommonModule, MenuLeft, Header, A11yModule, MatIconModule, AnimalList],
  templateUrl: './animais.html',
  styleUrls: ['./animais.scss'],
})
export class Animais {
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

  listAnimais: PetListInterface[] = [
    {
      id: 1,
      especie: 'Cachorro',
      nome: 'Luma',
      sexo: 'F',
      idade: '5 anos',
      tutor: 'Luciene Angelo',
    },
    {
      id: 2,
      especie: 'Gato',
      nome: 'Simba',
      sexo: 'M',
      idade: '5 anos',
      tutor: 'Giovanna Piccinato',
    },
    {
      id: 3,
      especie: 'Gato',
      nome: 'Tereza',
      sexo: 'F',
      idade: '4 anos',
      tutor: '  Pedro Marques',
    },
    { id: 4, especie: 'gato', nome: 'Nicolas', sexo: 'M', idade: '2 anos', tutor: 'Pedro Marques' },
    {
      id: 5,
      especie: 'cachorro',
      nome: 'Evair',
      sexo: 'M',
      idade: '2 anos',
      tutor: 'Andrea Marques',
    },
  ];

  filtered: PetListInterface[] = [...this.listAnimais];

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
      ? [...this.listAnimais]
      : this.listAnimais.filter(
          (p) => this.norm(p.tutor).includes(q) || this.norm(p.nome).includes(q)
        );
  }

  onViewPet(p: PetListInterface) {
    /* navegar/abrir modal */
  }
  onEditPet(p: PetListInterface) {
    /* editar */
  }
  onDeletePet(p: PetListInterface) {
    /* confirmar exclusão */
  }
}
