import { Component, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardInterface } from '../../interfaces';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './card.html',
  styleUrls: ['./card.scss'],
})
export class Card {
  cardInfo = input.required<CardInterface>();
  
}
