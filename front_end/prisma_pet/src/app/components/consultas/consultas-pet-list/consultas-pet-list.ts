import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PetConsulta } from '../../../interfaces';
import { DatePipe } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { ConsultasPetModal } from "../consultas-pet-modal/consultas-pet-modal";

@Component({
  selector: 'app-consultas-pet-list',
  imports: [MatIconModule, DatePipe, MatExpansionModule, ConsultasPetModal],
  templateUrl: './consultas-pet-list.html',
  styleUrl: './consultas-pet-list.scss',
})
export class ConsultasPetList {

  @Input() pet_consulta: PetConsulta = {} as PetConsulta;
  @Input() userType: string = '';

  createModalOpen = false;
  editModalOpen = false;

  openCreateModal() {
    this.createModalOpen = true;
  }

  closeCreateModal() {
    this.createModalOpen = false;
  }

  handleConsultaUpdated(newConsulta: PetConsulta) {
    this.pet_consulta = newConsulta;
    console.log(`pet editado:`, newConsulta);

    this.closeCreateModal();
  }

  onDelete() { }

}
