import { Component, effect, ElementRef, HostListener, input, output, QueryList, ViewChildren } from '@angular/core';
import { MenuInterface } from '../../interfaces';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-menu-left',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './menu-left.html',
  styleUrls: ['./menu-left.scss'],
})
export class MenuLeft {

  itens = input.required<MenuInterface[]>();
  collapsed = input(false); // controla a classe .open
  close = output<void>(); // para o acessovet fechar ao clicar em um link

  @ViewChildren('itemLink', { read: ElementRef }) itemLinks!: QueryList<ElementRef<HTMLAnchorElement>>;

  constructor() {
    // Quando o menu "abrir" (collapsed === true), foca o primeiro link
    effect(() => {
      const isOpen = this.collapsed();
      if (isOpen) {
        setTimeout(() => this.itemLinks?.first?.nativeElement?.focus(), 0); // ABNT 5.1
      }
    });
  }

@HostListener('keydown.escape', ['$event'])
onEsc(ev: Event) {                       // ⬅️ era KeyboardEvent
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
