import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UserInterface } from '../../interfaces';
import { Notification } from '../../services/notification';
import { ModalEdit } from '../modal-edit/modal-edit';
import { UsuarioService } from '../../services/usuario-service';


@Component({
  selector: 'app-vet-card',
  imports: [CommonModule, MatIconModule, ModalEdit],
  standalone: true,
  templateUrl: './vet-card.html',
  styleUrls: ['./vet-card.scss']
})
export class VetCard implements OnInit{

  @Input() userVet!: UserInterface;
  @Input() typeUser: string = '';
  @Output() vetDeleted = new EventEmitter<number>();
  @Output() edit = new EventEmitter<UserInterface>();

  editModalOpen = false;
  vetToEdit?: UserInterface;

  constructor(
    private vetService: UsuarioService,
    private notification: Notification,

  ) { }

  ngOnInit(): void {
    this.typeUser
  }

  findUserById(id: number) {
  }

  deleteVet(vetId: number) {
    this.vetService.deleteAccountVet(vetId).subscribe({
      next: (res) => {
        console.log(res);
        this.vetDeleted.emit(vetId);
        this.notification.success('Veterinário excluído com sucesso');
      },
      error: (err) => {
        console.log("erro ao deletar veterinário:", err);
        this.notification.error('Erro ao deletar veterinário');
      }
    });
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

    this.vetService.updateUser(editedvet).subscribe({
      next: (res) => {
        this.userVet = { ...this.userVet, ...editedvet };

        this.edit.emit(this.userVet);

        this.notification.success('Dados do veterinário atualizados com sucesso');
        this.closeEditModal();
      },
      error: (err) => {
        console.log('Erro ao atualizar veterinário:', err);
        this.notification.error('Erro ao atualizar veterinário');
      }
    });

    this.closeEditModal();
  }
}
