import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UserInterface } from '../../interfaces';
import { UsuarioService } from '../../services/usuario-service';
import { FormatPhonePipe } from '../../pipes/format-phone-pipe';
import { ModalEdit } from '../modal-edit/modal-edit';
import { Router } from '@angular/router';
import { Notification } from '../../services/notification';
import { ModalDelete } from '../modal-delete/modal-delete';
import { Loading } from '../loading/loading';
import { PetService } from '../../services/pet-service';

@Component({
  selector: 'app-tutor-card',
  imports: [CommonModule, MatIconModule, FormatPhonePipe, ModalEdit, ModalDelete, Loading],
  standalone: true,
  templateUrl: './tutor-card.html',
  styleUrls: ['./tutor-card.scss']
})
export class TutorCard implements OnInit {

  @Input() userTutor!: UserInterface;
  @Input() typeUser: string = '';
  @Output() tutorDeleted = new EventEmitter<number>();
  @Output() edit = new EventEmitter<UserInterface>();

  editModalOpen = false;
  tutorToEdit?: UserInterface;
  deleteModalOpen = false;
  tutorToDelete: UserInterface | null = null;
  loading = false;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private notification: Notification,
    private petService: PetService
  ) { }

  ngOnInit(): void {
    this.typeUser
  }

  // goToFichaPet(tutorId: number) {
  //   this.loading = true;
  //   if (this.typeUser === 'vet') {
  //     this.router.navigate([`/vet/ficha/${tutorId}`]);
  //   } else if (this.typeUser === 'admin') {
  //     this.router.navigate([`/admin/ficha/${tutorId}`]);
  //   } else {
  //     this.router.navigate([`/user/ficha/${tutorId}`]);
  //   }
  // }

  goToFichaPet(tutorId: number) {
    this.loading = true;

    this.petService.getPetsByTutorId(tutorId).subscribe({
      next: (res) => {
        const hasPets = res && Array.isArray(res.pets) && res.pets.length > 0;

        if (!hasPets) {
          this.notification.error('Este responsável ainda não possui nenhum animal cadastrado.');
          this.loading = false;
          return;
        }

        if (this.typeUser === 'vet') {
          this.router.navigate([`/vet/ficha/${tutorId}`]);
        } else if (this.typeUser === 'admin') {
          this.router.navigate([`/admin/ficha/${tutorId}`]);
        } else {
          this.router.navigate([`/user/ficha/${tutorId}`]);
        }

        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar pets do responsável:', err);
        if (err.status === 404) {
          this.notification.error('Este responsável ainda não possui nenhum animal cadastrado.');
        } else {
          this.notification.error('Não foi possível verificar os animais deste responsável.');
        }
        this.loading = false;
      }
    });
  }

  deleteTutor(tutorId: number) {
    this.loading = true;
    this.usuarioService.deleteAccount(tutorId).subscribe({
      next: (res) => {
        console.log(res);
        this.tutorDeleted.emit(tutorId);
        this.notification.success('Responsável excluído com sucesso');
        this.loading = false;
      },
      error: (err) => {
        console.log("erro ao deletar tutor:", err);
        this.notification.error('Erro ao deletar responsável');
        this.loading = false;
      }
    });
  }

    openDeleteModal(tutor: UserInterface) {
      this.tutorToDelete = tutor;
      this.deleteModalOpen = true;
    }

    closeDeleteModal() {
      this.deleteModalOpen = false;
      this.tutorToDelete = null;
    }

    handleConfirmDelete() {
      if (!this.tutorToDelete) return;
      this.deleteTutor(this.tutorToDelete.id);

      this.closeDeleteModal();
    }

  editTutor(tutorId: number) {
    this.edit.emit(this.userTutor);
  }

  openEditModal(tutor: UserInterface) {
    this.tutorToEdit = { ...tutor };
    this.editModalOpen = true;
  }

  closeEditModal() {
    this.editModalOpen = false;
    this.tutorToEdit = undefined;
  }

  saveTutor(editedTutor: UserInterface) {

    this.closeEditModal();
  }

}
