import { Component, effect, ElementRef, HostListener, Input, Output, EventEmitter, QueryList, ViewChildren } from '@angular/core';
import { MenuInterface } from '../../interfaces';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MenuService } from '../../services/menu-service';

@Component({
  selector: 'app-menu-left',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './menu-left.html',
  styleUrls: ['./menu-left.scss'],
})
export class MenuLeft {

  itens: MenuInterface[] = [];
  @Input() collapsed: boolean = false; // controla a classe .open
  @Output() close = new EventEmitter<void>(); // para o acessovet fechar ao clicar em um link

  @ViewChildren('itemLink', { read: ElementRef }) itemLinks!: QueryList<ElementRef<HTMLAnchorElement>>;

  constructor(
    menuService: MenuService,
    private router: Router
  ) {
    // Quando o menu "abrir" (collapsed === true), foca o primeiro link
    effect(() => {
      if (this.collapsed) {
        setTimeout(() => this.itemLinks?.first?.nativeElement?.focus(), 0); // ABNT 5.1
      }
    });

    menuService.getTypeMenuUser().subscribe(
      (typeUser) => {
        if (typeUser.type === 'admin') {
          this.itens = [
            { label: 'Home', link: '/admin', icon: 'home' },
            { label: 'Tutores', link: '/admin/tutores', icon: 'people' },
            { label: 'Pets', link: '/admin/pets', icon: 'pets' },
            { label: 'Veterinários', link: '/admin/veterinarios', icon: 'medical_services' },
            { label: 'Serviços', link: '/admin/services', icon: 'list_alt' },
            { label: 'Meus Dados', link: '/admin/perfil', icon: 'person' }
          ];
        } else if (typeUser.type === 'vet') {
          this.itens = [
            { label: 'Home', link: '/vet', icon: 'home' },
            { label: 'Animais', link: '/vet/pets', icon: 'pets' },
            { label: 'Tutores', link: '/vet/tutors', icon: 'people' },
            { label: 'Serviços', link: '/vet/services', icon: 'list_alt' },
            { label: 'Meus Dados', link: '/vet/perfil', icon: 'person' }
          ];
        } else if (typeUser.type === 'user') {
          this.itens = [
            { label: 'Home', link: '/user', icon: 'home' },
            { label: 'Meus Pets', link: '/user/pets', icon: 'pets' },
            { label: 'Meus Dados', link: '/user/perfil', icon: 'person' },
          ];
        }
      },
      (error) => {
        console.error('Erro ao obter o tipo de usuário para o menu:', error);
        this.itens = [
          { label: 'login', link: '/login', icon: 'login' }
        ];
      }
    );
  }

  @HostListener('keydown.escape', ['$event'])
  onEsc(ev: Event) {
    const e = ev as KeyboardEvent;
    const target = e.target as HTMLElement;
    if (e.key === 'Escape' && this.isInsideMenu(target)) {
      this.close.emit();
    }
  }

  private isInsideMenu(el: HTMLElement | null): boolean {
    return !!el?.closest('.menu_left');
  }

  goToLink(link: string) {
    this.router.navigate([link]);
  }
}
