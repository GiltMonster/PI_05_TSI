import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PetVacina } from '../../../interfaces';
import { MatIcon } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";
import { DatePipe } from '@angular/common';
import { VacinasPetModal } from "../vacinas-pet-modal/vacinas-pet-modal";
import { ModalDelete } from "../../modal-delete/modal-delete";
import { FichaPetService } from '../../../services/ficha-pet-service';
import { Notification } from '../../../services/notification';

@Component({
  selector: 'app-vacinas-pet-list',
  imports: [MatIcon, MatExpansionModule, DatePipe, VacinasPetModal, ModalDelete],
  templateUrl: './vacinas-pet-list.html',
  styleUrl: './vacinas-pet-list.scss',
})
export class VacinasPetList {

  @Input() pet_vacina: PetVacina = {} as PetVacina;
  @Input() userType: string = '';
  @Output() delete = new EventEmitter<PetVacina>();

  deleteModalOpen = false;
  editModalOpen = false;

  styleCorEstadoVacina: string = '';

  constructor(
    private fichaPetService: FichaPetService,
    private notification: Notification
  ) { }

  onEdit() {
    this.editModalOpen = true;
  }

  closeEditModal() {
    this.editModalOpen = false;
  }

  handleVacinaUpdated(newVacina: PetVacina) {
    this.pet_vacina = newVacina;
    this.closeEditModal();
  }

  onDelete() {
    this.deleteModalOpen = true;
  }

  closeDeleteModal() {
    this.deleteModalOpen = false;
  }

  handleConfirmDelete() {
    this.fichaPetService.deletarVacina(this.pet_vacina.id).subscribe({
      next: (res) => {
        this.notification.success('Vacina deletada com sucesso!');
        this.delete.emit(this.pet_vacina);
        this.deleteModalOpen = false;
      },
      error: (err) => {
        console.log('Erro ao deletar vacina:', err);
        this.notification.error('Erro ao deletar vacina.');
      }
    });
  }

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
