import { Component, Input, OnInit } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { VacinasPetList } from "../vacinas-pet-list/vacinas-pet-list";
import { PetVacina } from '../../../interfaces';
import { VacinasPetModal } from "../vacinas-pet-modal/vacinas-pet-modal";

@Component({
  selector: 'app-vacinas-pet',
  imports: [MatIcon, VacinasPetList, VacinasPetModal],
  templateUrl: './vacinas-pet.html',
  styleUrl: './vacinas-pet.scss',
})
export class VacinasPet implements OnInit {
  @Input() pet_vacinas: Array<PetVacina> = [];
  @Input() userType: string = '';
  @Input() pet_id: number = 0;

  createModalOpen = false;
  editModalOpen = false;

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

  openCreateModal() {
    this.createModalOpen = true;
  }

  closeCreateModal() {
    this.createModalOpen = false;
  }

  handleVacinaCreated(newVacina: PetVacina) {
    this.pet_vacinas.push(newVacina);
    this.getVacinasResume();
    this.closeCreateModal();
  }

  handleVacinaDeleted(deletedVacina: PetVacina) {
    const index = this.pet_vacinas.findIndex(v => v.id === deletedVacina.id);
    if (index !== -1) {
      this.pet_vacinas.splice(index, 1);
    }
    this.getVacinasResume();
  }



}
