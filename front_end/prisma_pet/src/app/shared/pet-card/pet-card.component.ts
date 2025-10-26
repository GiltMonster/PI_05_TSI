import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Pet {
  id: number;
  nome: string;
  especie: string;
  raca?: string;
  idade: number;
  sexo: 'M' | 'F';
  peso?: number;
  castrado?: boolean;
  temperamento?: string;
  cor_pelagem?: string;
  caso_clinico?: string;
  tutor_nome: string;
  avatar?: string;
}

@Component({
  selector: 'app-pet-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pet-card.component.html',
  styleUrl: './pet-card.component.scss'
})
export class PetCardComponent {
  @Input() pet!: Pet;
  @Input() showActions: boolean = true;
  
  @Output() editClick = new EventEmitter<Pet>();
  @Output() deleteClick = new EventEmitter<Pet>();
  @Output() viewClick = new EventEmitter<Pet>();

  onEdit(): void {
    this.editClick.emit(this.pet);
  }

  onDelete(): void {
    this.deleteClick.emit(this.pet);
  }

  onView(): void {
    this.viewClick.emit(this.pet);
  }

  getSexoLabel(): string {
    return this.pet.sexo === 'M' ? 'Macho' : 'Fêmea';
  }

  

  getSpeciesIcon(): string {
    switch(this.pet.especie.toLowerCase()) {
      case 'cachorro':
      case 'cão':
        return '/icon_dog.svg';
      case 'gato':
        return '/icon_cat.svg';
      
      default:
        return '/icon_cat.svg';
    }
  }
}
