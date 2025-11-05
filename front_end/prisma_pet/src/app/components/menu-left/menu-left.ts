import { Component, effect, ElementRef, HostListener, Input, Output, EventEmitter, QueryList, ViewChildren } from '@angular/core';
import { MenuInterface } from '../../interfaces';
import { RouterModule } from '@angular/router';
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

  @Input() itens: MenuInterface[] = [];
  @Input() collapsed: boolean = false; // controla a classe .open
  @Output() close = new EventEmitter<void>(); // para o acessovet fechar ao clicar em um link

  @ViewChildren('itemLink', { read: ElementRef }) itemLinks!: QueryList<ElementRef<HTMLAnchorElement>>;

  constructor(
    menuService: MenuService
   ) {
    // Quando o menu "abrir" (collapsed === true), foca o primeiro link
    effect(() => {
      if (this.collapsed) {
        setTimeout(() => this.itemLinks?.first?.nativeElement?.focus(), 0); // ABNT 5.1
      }
    });

    menuService.getTypeMenuUser().subscribe((typeUser) => {
      console.log(typeUser);

      if (typeUser.type === 'admin') {
        this.itens = [
          { label: 'Dashboard', link: '/admin/dashboard', icon: 'dashboard' },
          { label: 'Gerenciar Usuários', link: '/admin/users', icon: 'group' },
          { label: 'Relatórios', link: '/admin/reports', icon: 'bar_chart' },
        ];
      } else if (typeUser.type === 'vet') {
        this.itens = [
          { label: 'Meus Pacientes', link: '/vet/patients', icon: 'pets' },
          { label: 'Agendamentos', link: '/vet/appointments', icon: 'event' },
          { label: 'Perfil', link: '/vet/profile', icon: 'person' },
        ];
      } else if (typeUser.type === 'user') {
        this.itens = [
          { label: 'Meus Pets', link: '/user/mypets', icon: 'pets' },
          { label: 'Agendar Consulta', link: '/user/schedule', icon: 'event' },
          { label: 'Perfil', link: '/user/profile', icon: 'person' },
        ];
      }
    });
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

}
