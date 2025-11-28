import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FichaPetInterface, UserInterface } from '../../interfaces';
import { UsuarioService } from '../../services/usuario-service';
import { FormatPhonePipe } from '../../pipes/format-phone-pipe';
import { ModalEdit } from '../modal-edit/modal-edit';
import { Router } from '@angular/router';
import { Notification } from '../../services/notification';
import { ModalDelete } from '../modal-delete/modal-delete';
import { Loading } from '../loading/loading';
import { PetService } from '../../services/pet-service';
// import { UserTypeProviderService } from '../../shared/user-type-service';

@Component({
  selector: 'app-tutor-card',
  imports: [CommonModule, MatIconModule, FormatPhonePipe, ModalEdit, ModalDelete, Loading],
  standalone: true,
  templateUrl: './tutor-card.html',
  styleUrls: ['./tutor-card.scss'],
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
  ) {}

  ngOnInit(): void {
    // this.userTypeService.userType$.subscribe(type => {
    //   this.typeUser = type;
    // });
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

  // goToFichaPet(tutorId: number) {
  //   this.loading = true;

  //   this.petService.getPetsByTutorId(tutorId).subscribe({
  //     next: (res) => {
  //       const hasPets = res && Array.isArray(res.pets) && res.pets.length > 0;

  //       if (!hasPets) {
  //         this.notification.error('Este responsável ainda não possui nenhum animal cadastrado.');
  //         this.loading = false;
  //         return;
  //       }

  //       if (this.typeUser === 'vet') {
  //         this.router.navigate([`/vet/ficha/${tutorId}`]);
  //       } else if (this.typeUser === 'admin') {
  //         this.router.navigate([`/admin/ficha/${tutorId}`]);
  //       } else {
  //         this.router.navigate([`/user/ficha/${tutorId}`]);
  //       }

  //       this.loading = false;
  //     },
  //     error: (err) => {
  //       console.error('Erro ao buscar pets do responsável:', err);
  //       if (err.status === 404) {
  //         this.notification.error('Este responsável ainda não possui nenhum animal cadastrado.');
  //       } else {
  //         this.notification.error('Não foi possível verificar os animais deste responsável.');
  //       }
  //       this.loading = false;
  //     }
  //   });
  // }

  // responsável apenas por fazer a navegação
  //   goToFichaPet(tutorId: number) {
  //   let baseRoute = '';

  //   if (this.typeUser === 'vet') {
  //     baseRoute = '/vet/ficha';
  //   } else if (this.typeUser === 'admin') {
  //     baseRoute = '/admin/ficha';
  //   } else {
  //     baseRoute = '/user/ficha';
  //   }

  //   this.router.navigate([`${baseRoute}/${tutorId}`]);
  // }

  goToFichaPet(tutorId: number) {
    this.loading = true;

    this.petService.getPetsByTutorId(tutorId).subscribe({
      next: (res: FichaPetInterface) => {
        const hasPets = Array.isArray(res?.pets) && res.pets.length > 0;

        if (!hasPets) {
          this.notification.error('Este responsável ainda não possui nenhum animal cadastrado.');
          this.loading = false;
          return;
        }

        let baseRoute = '';

        if (this.typeUser === 'vet') {
          baseRoute = '/vet/ficha';
        } else if (this.typeUser === 'admin') {
          baseRoute = '/admin/ficha';
        } else {
          baseRoute = '/user/ficha';
        }

        this.router.navigate([`${baseRoute}/${tutorId}`], {
          state: { ficha: res },
        });

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
      },
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
        console.log('erro ao deletar tutor:', err);
        this.notification.error('Erro ao deletar responsável');
        this.loading = false;
      },
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
    // Atualiza a lista de veterinários com os dados editados
    editedTutor.id = this.userTutor.id;
    editedTutor.type = editedTutor.type || 'tutor';
    this.loading = true;

    this.usuarioService.updateUser(editedTutor).subscribe({
      next: (res) => {
        this.userTutor = { ...this.userTutor, ...editedTutor };

        this.edit.emit(this.userTutor);
        this.notification.success('Dados do responsável atualizados com sucesso');
        this.closeEditModal();
        this.loading = false;
      },
      error: (err) => {
        console.log('Erro ao atualizar responsável:', err);
        this.notification.error('Erro ao atualizar responsável');
        this.loading = false;
      },
    });

    this.closeEditModal();
  }
}
