import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TextoInicioInterface } from '../../interfaces';

@Component({
  selector: 'app-texto-inicio',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './texto-inicio.html',
  styleUrl: './texto-inicio.scss'
})
export class TextoInicio {
  inicio = input.required<TextoInicioInterface[]>();
  collapsed = input(false);
}
