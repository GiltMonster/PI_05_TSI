import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PetConsulta } from '../../../interfaces';
import { DatePipe } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { ConsultasPetModal } from "../consultas-pet-modal/consultas-pet-modal";
import { ModalDelete } from "../../modal-delete/modal-delete";
import { FichaPetService } from '../../../services/ficha-pet-service';
import { Notification } from '../../../services/notification';

@Component({
  selector: 'app-consultas-pet-list',
  imports: [MatIconModule, DatePipe, MatExpansionModule, ConsultasPetModal, ModalDelete],
  templateUrl: './consultas-pet-list.html',
  styleUrl: './consultas-pet-list.scss',
})
export class ConsultasPetList {

  @Output() delete = new EventEmitter<PetConsulta>();
  @Input() pet_consulta: PetConsulta = {} as PetConsulta;
  @Input() userType: string = '';

  deleteModalOpen = false;
  editModalOpen = false;

  constructor(
    private fichaPetService: FichaPetService,
    private notification: Notification
  ) { }

  openUpdatedModal() {
    this.editModalOpen = true;
  }

  closeUpdatedModal() {
    this.editModalOpen = false;
  }

  handleConsultaUpdated(newConsulta: PetConsulta) {
    this.pet_consulta = newConsulta;
    console.log(`pet editado:`, newConsulta);

    this.closeUpdatedModal();
  }

  handleConfirmDelete() {
    this.fichaPetService.deletarConsulta(this.pet_consulta.id).subscribe({
      next: (res) => {
        console.log('Consulta deletada com sucesso:', res);
        this.notification.success('Consulta deletada com sucesso!');
        this.delete.emit(this.pet_consulta);
        this.deleteModalOpen = false;
      },
      error: (err) => {
        console.log('Erro ao deletar consulta:', err);
        this.notification.error('Erro ao deletar consulta. Tente novamente mais tarde.');
      }
    });
  }

  openModalDelete() {
    this.deleteModalOpen = true;
  }

  closeDeleteModal() {
    this.deleteModalOpen = false;
  }

}
