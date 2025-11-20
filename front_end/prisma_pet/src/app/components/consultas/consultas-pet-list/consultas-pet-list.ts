import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PetConsulta } from '../../../interfaces';
import { DatePipe } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-consultas-pet-list',
  imports: [MatIconModule, DatePipe, MatExpansionModule],
  templateUrl: './consultas-pet-list.html',
  styleUrl: './consultas-pet-list.scss',
})
export class ConsultasPetList {
  @Input() pet_consulta: PetConsulta = {} as PetConsulta;


  onEdit() { }

  onDelete() { }

}
