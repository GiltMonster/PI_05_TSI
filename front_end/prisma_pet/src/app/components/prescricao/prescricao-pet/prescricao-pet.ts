import { Component, Input } from '@angular/core';
import { PetPrescricao } from '../../../interfaces';
import { PrescricaoPetList } from '../prescricao-pet-list/prescricao-pet-list';
import { PrescricaoPetModal } from '../prescricao-pet-modal/prescricao-pet-modal';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-prescricao-pet',
  imports: [PrescricaoPetList, PrescricaoPetModal, MatIcon],
  templateUrl: './prescricao-pet.html',
  styleUrl: './prescricao-pet.scss',
})
export class PrescricaoPet {
  @Input() pet_prescricoes: Array<PetPrescricao> = [];
  @Input() pet_id: number = 0;
  @Input() userType: string = '';

  createModalOpen = false;
  editModalOpen = false;

  openCreateModal() { this.createModalOpen = true; }
  closeCreateModal() { this.createModalOpen = false; }

  handlePrescricaoCreated(newPrescricao: PetPrescricao) {
    this.pet_prescricoes.push(newPrescricao);
    this.closeCreateModal();
  }

  handlePrescricaoDeleted(deleted: PetPrescricao) {
    const idx = this.pet_prescricoes.findIndex(p => p.id === deleted.id);
    if (idx !== -1) this.pet_prescricoes.splice(idx, 1);
  }
}
