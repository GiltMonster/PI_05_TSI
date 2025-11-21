import { Component, Input } from '@angular/core';
import { PetVacina } from '../../../interfaces';
import { MatIcon } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-vacinas-pet-list',
  imports: [MatIcon, MatExpansionModule, DatePipe],
  templateUrl: './vacinas-pet-list.html',
  styleUrl: './vacinas-pet-list.scss',
})
export class VacinasPetList {

  @Input() pet_vacina: PetVacina = {} as PetVacina;

  styleCorEstadoVacina: string = '';

  constructor() { }

  onEdit() { }
  onDelete() { }

  setStyleCorEstadoVacina() {
    if (this.pet_vacina.estado_vacina.toLowerCase() === 'aplicada') {
      return this.styleCorEstadoVacina = 'estado-aplicada';
    } else if (this.pet_vacina.estado_vacina.toLowerCase() === 'atrasada') {
      return this.styleCorEstadoVacina = 'estado-atrasada';
    } else {
      return this.styleCorEstadoVacina = 'estado-programada';

    }

  }

}
