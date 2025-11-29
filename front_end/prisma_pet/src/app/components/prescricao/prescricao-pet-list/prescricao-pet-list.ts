import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PetPrescricao } from '../../../interfaces';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { PrescricaoPetModal } from '../prescricao-pet-modal/prescricao-pet-modal';
import { ModalDelete } from '../../modal-delete/modal-delete';
import { FichaPetService } from '../../../services/ficha-pet-service';
import { Notification } from '../../../services/notification';
import { Loading } from '../../loading/loading';

@Component({
  selector: 'app-prescricao-pet-list',
  imports: [MatIcon, DatePipe, MatExpansionModule, PrescricaoPetModal, ModalDelete, Loading],
  templateUrl: './prescricao-pet-list.html',
  styleUrl: './prescricao-pet-list.scss',
})
export class PrescricaoPetList {
  @Input() pet_prescricao: PetPrescricao = {} as PetPrescricao;
  @Input() userType: string = '';
  @Output() delete = new EventEmitter<PetPrescricao>();

  editModalOpen = false;
  deleteModalOpen = false;
  loading = false;

  constructor(
    private fichaService: FichaPetService,
    private notification: Notification
  ) {}

  onEdit() { this.editModalOpen = true; }
  closeEditModal() { this.editModalOpen = false; }

  handlePrescricaoUpdated(newPrescricao: PetPrescricao) {
    this.pet_prescricao = newPrescricao;
    this.closeEditModal();
  }

  onDelete() { this.deleteModalOpen = true; }
  closeDeleteModal() { this.deleteModalOpen = false; }

  handleConfirmDelete() {
    this.loading = true;
    this.fichaService.deletarPrescricao(this.pet_prescricao.id).subscribe({
      next: () => {
        this.notification.success('Prescrição deletada com sucesso!');
        this.delete.emit(this.pet_prescricao);
        this.deleteModalOpen = false;
        this.loading = false;
      },
      error: (err) => {
        console.log('Erro ao deletar prescrição:', err);
        this.notification.error('Erro ao deletar prescrição.');
        this.loading = false;
      }
    });
  }

  downloadAnexo(anexoUrl: string) {
    if (!anexoUrl) {
      this.notification.error('URL do anexo inválida.');
      return;
    }
    try {
      window.open(anexoUrl, '_blank');
    } catch (err) {
      console.error('Erro ao abrir o anexo:', err);
      this.notification.error('Erro ao abrir o anexo.');
    }
  }
}
