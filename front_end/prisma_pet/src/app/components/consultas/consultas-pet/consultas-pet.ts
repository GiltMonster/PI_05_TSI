import { Component, Input } from '@angular/core';
import { ConsultasPetList } from "../consultas-pet-list/consultas-pet-list";
import { PetConsulta } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { MatIcon } from "@angular/material/icon";



@Component({
  selector: 'app-consultas-pet',
  templateUrl: './consultas-pet.html',
  styleUrl: './consultas-pet.scss',
  imports: [ConsultasPetList, CommonModule, MatIcon],
})
export class ConsultasPet {
  @Input() pet_consultas: Array<PetConsulta> = [];

}
