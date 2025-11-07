import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { PetListInterface } from '../../interfaces';
import { AnimalList } from '../../components/animal-list/animal-list';

@Component({
  selector: 'app-animais',
  standalone: true,
  imports: [CommonModule, MatIconModule, AnimalList],
  templateUrl: './animais.html',
  styleUrls: ['./animais.scss'],
})
export class Animais {

  constructor() { }

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
