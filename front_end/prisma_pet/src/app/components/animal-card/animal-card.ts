import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { PetListInterface } from '../../interfaces';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-animal-card',
  imports: [CommonModule, MatIconModule],
  standalone: true,
  templateUrl: './animal-card.html',
  styleUrls: ['./animal-card.scss']
})
export class AnimalCard {
  petCard = input.required<PetListInterface>();

  editClick   = output<PetListInterface>();
  deleteClick = output<PetListInterface>();
  viewClick   = output<PetListInterface>();

  onEdit()   { this.editClick.emit(this.petCard()); }
  onDelete() { this.deleteClick.emit(this.petCard()); }
  onView()   { this.viewClick.emit(this.petCard()); }


  private norm(t?: string): string {
    return (t ?? '')  // se vier undefined/null, vira string vazia
      .toLowerCase() // tudo minúsculo
      .normalize('NFD') // separa letras dos acentos
      .replace(/\p{Diacritic}/gu, '') // remove os acentos via regex
      .trim(); // tira espaços no início/fim
  }

  getSexoLabel(): string {
    const s = this.norm(this.petCard().sexo);
    if (s.startsWith('m')) return 'Macho';
    if (s.startsWith('f')) return 'Fêmea';
    return 'Indefinido';
  }

  getEspeciesIcon(): string {
    const especie = this.norm(this.petCard().especie);
    if (especie === 'cachorro') {
      return 'assets/imagens/cachorro.png';
    }
    else if (especie === 'gato') {
      return 'assets/imagens/gato.png';
    } else{
      return 'assets/imagens/pet-generico.png';
    }
  }
}
