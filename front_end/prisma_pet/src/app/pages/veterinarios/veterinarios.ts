import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { VetList } from '../../components/vet-list/vet-list';
import { VeterinarioListInterface } from '../../interfaces';

@Component({
  selector: 'app-veterinarios',
  standalone: true,
  imports: [CommonModule, MatIconModule, VetList],
  templateUrl: './veterinarios.html',
  styleUrl: './veterinarios.scss',
})
export class Veterinarios {

  constructor() { }

  listVets: VeterinarioListInterface[] = [
    { id: 1, nome: 'Pamela Pereira', crmv: 'CRMV: 4556 - SP', especialidade: 'Clinica' },
    { id: 2, nome: 'Mirian Azevedo', crmv: 'CRMV: 4556 - SP', especialidade: 'Clinica' },
    { id: 3, nome: 'Ana Carolina Primo', crmv: 'CRMV: 4556 - SP', especialidade: 'Clinica' },
    {
      id: 4,
      nome: 'Giovanna Brancacci',
      crmv: 'CRMV: 4556 - SP',
      especialidade: 'Clinica  |  Cirurgiã',
    },
  ];

  filtered: VeterinarioListInterface[] = [...this.listVets];

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
      ? [...this.listVets]
      : this.listVets.filter(
        (p) => this.norm(p.especialidade).includes(q) || this.norm(p.nome).includes(q)
      );
  }

  onViewVet(p: VeterinarioListInterface) { }
  onEditVet(p: VeterinarioListInterface) { }
  onDeleteVet(p: VeterinarioListInterface) { }
}
