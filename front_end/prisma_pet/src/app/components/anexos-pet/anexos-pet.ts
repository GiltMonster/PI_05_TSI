import { Component } from '@angular/core';

import { VacinasPet } from "../vacinas/vacinas-pet/vacinas-pet";
import { OutrosAnexosPet } from "../outros-anexos-pet/outros-anexos-pet";
import { ConsultasPet } from '../consultas/consultas-pet/consultas-pet';

@Component({
  selector: 'app-anexos-pet',
  imports: [ConsultasPet, VacinasPet, OutrosAnexosPet],
  templateUrl: './anexos-pet.html',
  styleUrl: './anexos-pet.scss',
  standalone: true,
})
export class AnexosPet {

  activeTab: string = 'consultas';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

}
