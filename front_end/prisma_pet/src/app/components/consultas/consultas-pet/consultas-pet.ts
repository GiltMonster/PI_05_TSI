import { Component, Input } from '@angular/core';
import { ConsultasPetList } from "../consultas-pet-list/consultas-pet-list";
import { PetConsulta } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { MatIcon } from "@angular/material/icon";
import { ConsultasPetModal } from "../consultas-pet-modal/consultas-pet-modal";

@Component({
  selector: 'app-consultas-pet',
  templateUrl: './consultas-pet.html',
  styleUrl: './consultas-pet.scss',
  imports: [ConsultasPetList, CommonModule, MatIcon, ConsultasPetModal],
})
export class ConsultasPet {

  @Input() pet_consultas: Array<PetConsulta> = [];
  @Input() pet_id: number = 0;
  @Input() userType: string = '';

  createModalOpen = false;
  editModalOpen = false;

  openCreateModal() {
    this.createModalOpen = true;
  }

  closeCreateModal() {
    this.createModalOpen = false;
  }

  handleConsultaCreated(newConsulta: PetConsulta) {
    if (!this.editModalOpen) {
      this.pet_consultas = [...this.pet_consultas, newConsulta];
      this.closeCreateModal();
    } else {
      const index = this.pet_consultas.findIndex(c => c.id === newConsulta.id);
      if (index !== -1) {
        this.pet_consultas[index] = newConsulta;
      }
      this.closeCreateModal();
    }
  }

    handleConsultaUpdated(updated: PetConsulta) {
    this.pet_consultas = this.pet_consultas.map(c =>
      c.id === updated.id ? updated : c
    );
  }

  handleConsultaDeleted(deletedPetConsulta: PetConsulta) {
    this.pet_consultas = this.pet_consultas.filter(c => c.id !== deletedPetConsulta.id);

  }

}
