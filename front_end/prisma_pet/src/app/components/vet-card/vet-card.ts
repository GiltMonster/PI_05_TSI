import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UserInterface } from '../../interfaces';
import { Notification } from '../../services/notification';
import { ModalEdit } from '../modal-edit/modal-edit';
import { UsuarioService } from '../../services/usuario-service';
import { ModalDelete } from '../modal-delete/modal-delete';
import { Loading } from '../loading/loading';

@Component({
  selector: 'app-vet-card',
  imports: [CommonModule, MatIconModule, ModalEdit, ModalDelete,Loading],
  standalone: true,
  templateUrl: './vet-card.html',
  styleUrls: ['./vet-card.scss'],
})
export class VetCard implements OnInit {
  @Input() userVet!: UserInterface;
  @Input() typeUser: string = '';
  @Output() vetDeleted = new EventEmitter<number>();
  @Output() edit = new EventEmitter<UserInterface>();

  editModalOpen = false;
  vetToEdit?: UserInterface;
  loading = false;

  constructor(private vetService: UsuarioService, private notification: Notification) {}

  ngOnInit(): void {
    this.typeUser;
  }

  findUserById(id: number) {}

  deleteVet(vetId: number) {
    this.loading = true;
    this.vetService.deleteAccountVet(vetId).subscribe({
      next: (res) => {
        console.log(res);
        this.vetDeleted.emit(vetId);
        this.notification.success('Veterinário excluído com sucesso');
        this.loading = false;
      },
      error: (err) => {
        console.log('erro ao deletar veterinário:', err);
        this.notification.error('Erro ao deletar veterinário');
        this.loading = false;
      },
    });
  }

  deleteModalOpen = false;
  vetToDelete: UserInterface | null = null;

  openDeleteModal(vet: UserInterface) {
    this.vetToDelete = vet;
    this.deleteModalOpen = true;
  }

  closeDeleteModal() {
    this.deleteModalOpen = false;
    this.vetToDelete = null;
  }

  handleConfirmDelete() {
    if (!this.vetToDelete) return;

    this.deleteVet(this.vetToDelete.id);

    this.closeDeleteModal();
  }

  editVet(vetId: number) {
    this.edit.emit(this.userVet);
  }

  openEditModal(vet: UserInterface) {
    this.vetToEdit = { ...vet };
    this.editModalOpen = true;
  }

  closeEditModal() {
    this.editModalOpen = false;
    this.vetToEdit = undefined;
  }

  saveVet(editedvet: UserInterface) {
    // Atualiza a lista de veterinários com os dados editados
    editedvet.id = this.userVet.id;
    editedvet.type = editedvet.type || 'vet';
    this.loading = true;

    this.vetService.updateUser(editedvet).subscribe({
      next: (res) => {
        this.userVet = { ...this.userVet, ...editedvet };

        this.edit.emit(this.userVet);

        this.notification.success('Dados do veterinário atualizados com sucesso');
        this.closeEditModal();
        this.loading = false;
      },
      error: (err) => {
        console.log('Erro ao atualizar veterinário:', err);
        this.notification.error('Erro ao atualizar veterinário');
        this.loading = false;
      },
    });

    this.closeEditModal();
  }
}
