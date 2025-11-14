import { Component } from '@angular/core';
import { DocumentosPet } from "../documentos-pet/documentos-pet";
import { VacinasPet } from "../vacinas-pet/vacinas-pet";
import { OutrosAnexosPet } from "../outros-anexos-pet/outros-anexos-pet";

@Component({
  selector: 'app-anexos-pet',
  imports: [DocumentosPet, VacinasPet, OutrosAnexosPet],
  templateUrl: './anexos-pet.html',
  styleUrl: './anexos-pet.scss',
  standalone: true,
})
export class AnexosPet {

  activeTab: string = 'documentos';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

}
