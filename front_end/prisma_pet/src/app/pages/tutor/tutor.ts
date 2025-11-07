import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TutorList } from '../../components/tutor-list/tutor-list';
import { TutorListInterface } from '../../interfaces';

@Component({
  selector: 'app-tutor',
  standalone: true,
  imports: [CommonModule, MatIconModule, TutorList],
  templateUrl: './tutor.html',
  styleUrls: ['./tutor.scss'],
})
export class Tutor {

  constructor() { }

  listTutores: TutorListInterface[] = [
    { id: 1, nome: 'Luciene Angelo', telefone: '(11)95520-7242', animal: 'Luma' },
    { id: 2, nome: 'Giovanna Piccinato', telefone: '(11)95520-7242', animal: 'Simba' },
    { id: 3, nome: 'Pedro Marques', telefone: '(11)95520-7242', animal: 'Tereza' },
    { id: 4, nome: 'Pedro Marques', telefone: '(11)95520-7242', animal: 'Nicolas' },
    { id: 5, nome: 'Andrea Marques', telefone: '(11)95520-7242', animal: 'Evair' },
  ];

  filtered: TutorListInterface[] = [...this.listTutores];

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
      ? [...this.listTutores]
      : this.listTutores.filter(
        (p) => this.norm(p.animal).includes(q) || this.norm(p.nome).includes(q)
      );
  }

  onViewTutor(p: TutorListInterface) { }
  onEditTutor(p: TutorListInterface) { }
  onDeleteTutor(p: TutorListInterface) { }
}
