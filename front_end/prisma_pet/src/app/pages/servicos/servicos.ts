import { Component } from '@angular/core';
import { ServicosListInterface } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ServiceList } from '../../components/service-list/service-list';

@Component({
  selector: 'app-servicos',
  standalone: true,
  imports: [CommonModule, MatIconModule, ServiceList],
  templateUrl: './servicos.html',
  styleUrls: ['./servicos.scss'],
})
export class Servicos {

  constructor() {}

  listServicos: ServicosListInterface[] = [
    { id: 1, titulo: 'Consulta Clínica', categoria: 'Consulta', valor: 230.0 },
    { id: 2, titulo: 'Vacina Raiva', categoria: 'Vacina', valor: 190.0 },
    { id: 3, titulo: 'Vacina V10', categoria: 'Vacina', valor: 240.0 },
    { id: 4, titulo: 'Ecocardiograma', categoria: 'Exame de Imagem', valor: 500.0 },
    { id: 5, titulo: 'Eletrocardiograma', categoria: 'Exame de Imagem', valor: 350.0 },
  ];

  filtered: ServicosListInterface[] = [...this.listServicos];

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
      ? [...this.listServicos]
      : this.listServicos.filter(
          (p) => this.norm(p.categoria).includes(q) || this.norm(p.titulo).includes(q)
        );
  }

  onEditServico(p: ServicosListInterface) {}
  onDeleteServico(p: ServicosListInterface) {}
}
