import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
  collapsed = input(false);
  }
