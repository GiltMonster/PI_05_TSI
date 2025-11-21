import { Component, Input, OnInit } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { VacinasPetList } from "../vacinas-pet-list/vacinas-pet-list";
import { PetVacina } from '../../../interfaces';

@Component({
  selector: 'app-vacinas-pet',
  imports: [MatIcon, VacinasPetList],
  templateUrl: './vacinas-pet.html',
  styleUrl: './vacinas-pet.scss',
})
export class VacinasPet implements OnInit {
  @Input() pet_vacinas: Array<PetVacina> = [];

  vacinasAplicadas: number = 0;
  vacinasAtrasadas: number = 0;
  vacinasProgramadas: number = 0;

  constructor() { }

  ngOnInit() {
    this.getVacinasResume();
  }

  getVacinasResume() {
    this.vacinasAplicadas = this.pet_vacinas.filter(vacina => vacina.estado_vacina.toLowerCase() === 'aplicada').length;
    this.vacinasAtrasadas = this.pet_vacinas.filter(vacina => vacina.estado_vacina.toLowerCase() === 'atrasada').length;
    this.vacinasProgramadas = this.pet_vacinas.filter(vacina => vacina.estado_vacina.toLowerCase() === 'programada').length;
  }



}
