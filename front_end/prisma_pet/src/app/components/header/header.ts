import { Component, input } from '@angular/core';
import { HeaderContato, HeaderProfile } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
    standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  contato = input.required<HeaderContato[]>();
  profile = input.required<HeaderProfile[]>();
  collapsed = input(false);

  logo = "assets/imagens/img-logo-novo.png";
}
