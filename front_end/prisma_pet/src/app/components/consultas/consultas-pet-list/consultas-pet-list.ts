import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PetConsulta } from '../../../interfaces';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-consultas-pet-list',
  imports: [MatIconModule, DatePipe],
  templateUrl: './consultas-pet-list.html',
  styleUrl: './consultas-pet-list.scss',
})
export class ConsultasPetList {
  @Input() pet_consulta: PetConsulta = {} as PetConsulta;


  onEdit() { }

  onDelete() { }

}
