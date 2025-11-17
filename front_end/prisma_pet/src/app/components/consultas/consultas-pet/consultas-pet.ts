import { Component } from '@angular/core';
import { ConsultasPetList } from "../consultas-pet-list/consultas-pet-list";

@Component({
  selector: 'app-consultas-pet',
  imports: [ConsultasPetList],
  templateUrl: './consultas-pet.html',
  styleUrl: './consultas-pet.scss',
})
export class ConsultasPet {

}
