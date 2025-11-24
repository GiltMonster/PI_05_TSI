import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PetInterface } from '../../interfaces';
import { PetService } from '../../services/pet-service';
import { Notification } from '../../services/notification';
import { ModalEditPet } from '../modal-edit-pet/modal-edit-pet';
import { UsuarioService } from '../../services/usuario-service';
import { ModalDelete } from '../modal-delete/modal-delete';
import { Loading } from '../loading/loading';
import { Router } from '@angular/router';
import { UserTypeProviderService } from '../../shared/user-type-service';

@Component({
  selector: 'app-animal-card',
  imports: [CommonModule, MatIconModule, ModalEditPet, ModalDelete, Loading],
  standalone: true,
  templateUrl: './animal-card.html',
  styleUrls: ['./animal-card.scss'],
})
export class AnimalCard implements OnInit {
  @Input() userPet!: PetInterface;
  @Input() typeUser: string = '';
  @Output() petDeleted = new EventEmitter<number>();
  @Output() edit = new EventEmitter<PetInterface>();
  // @Output() tutorLoad = new EventEmitter<{ id: number; tutorName: string }>(); // enviar o nome do tutor pro animallist

  editModalOpen = false;
  petToEdit?: PetInterface;
  loading = false;
  deleteModalOpen = false;
  petToDelete: PetInterface | null = null;

  tutorName = '';

  constructor(
    private petService: PetService,
    private notification: Notification,
    // private userTypeService: UserTypeProviderService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // private loadTutorName() {
  //   if (!this.userPet.user_id) return;

  //   this.usuarioService.getTutorById(String(this.userPet.user_id)).subscribe({
  //     next: (user: any) => {
  //       this.tutorName = user.name;

  //       // avisa o componente quem é o tutor desse pet
  //       this.tutorLoad.emit({
  //         id: this.userPet.id,
  //         tutorName: this.tutorName,
  //       });
  //     },
  //     error: (err) => {
  //       console.error('Erro ao buscar responsável do pet:', err);
  //       this.notification.success('Erro ao buscar responsável do pet');
  //       this.tutorName = '';
  //     },
  //   });
  // }

  // findUserById(petId: number) {
  //   const tutorId = this.userPet.user_id;

  //   if (!tutorId) {
  //     this.notification.error('Não foi possível identificar o responsável deste animal.');
  //     return;
  //   }

  //   this.loading = true;

  //   this.petService.getPetsByTutorId(tutorId).subscribe({
  //     next: (res) => {
  //       const hasPets = res && Array.isArray(res.pets) && res.pets.length > 0;

  //       if (!hasPets) {
  //         this.notification.error('Este responsável ainda não possui nenhum animal cadastrado.');
  //         this.loading = false;
  //         return;
  //       }

  //       let baseRoute = '';

  //       if (this.typeUser === 'vet') {
  //         baseRoute = '/vet/ficha';
  //       } else if (this.typeUser === 'admin') {
  //         baseRoute = '/admin/ficha';
  //       } else if (this.typeUser === 'user') {
  //         baseRoute = '/user/ficha';
  //       }

  //       this.router.navigate([`${baseRoute}/${tutorId}`], {
  //         queryParams: { petId },
  //       });

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
  //     },
  //   });
  // }

  findUserById(petId: number) {
  const tutorId = this.userPet.user_id;

  if (!tutorId) {
    this.notification.error('Não foi possível identificar o responsável deste animal.');
    return;
  }

  let baseRoute = '';

  if (this.typeUser === 'vet') {
    baseRoute = '/vet/ficha';
  } else if (this.typeUser === 'admin') {
    baseRoute = '/admin/ficha';
  } else if (this.typeUser === 'user') {
    baseRoute = '/user/ficha';
  }

  this.router.navigate([`${baseRoute}/${tutorId}`], {
    queryParams: { petId },
  });
}

  deletePet(petId: number) {
    this.loading = true;
    this.petService.deleteAccountPet(petId).subscribe({
      next: (res) => {
        console.log(res);
        this.petDeleted.emit(petId);
        this.notification.success('Animal excluído com sucesso');
        this.loading = false;
      },
      error: (err) => {
        console.log('erro ao deletar animal:', err);
        this.notification.error('Erro ao deletar Animal');
        this.loading = false;
      },
    });
  }


  openDeleteModal(pet: PetInterface) {
    this.petToDelete = pet;
    this.deleteModalOpen = true;
  }

  closeDeleteModal() {
    this.deleteModalOpen = false;
    this.petToDelete = null;
  }

  handleConfirmDelete() {
    if (!this.petToDelete) return;

    this.deletePet(this.petToDelete.id);

    this.closeDeleteModal();
  }

  editPet(petId: number) {
    this.edit.emit(this.userPet);
  }

  openEditModal(pet: PetInterface) {
    this.petToEdit = { ...pet };
    this.editModalOpen = true;
  }

  closeEditModal() {
    this.editModalOpen = false;
    this.petToEdit = undefined;
  }

  savePet(editedPet: PetInterface) {
    this.loading = true;
    // Atualiza a lista de animais com os dados editados
    editedPet.id = this.userPet.id;
    editedPet.type = editedPet.type || 'vet';

    this.petService.updatePet(editedPet).subscribe({
      next: (res) => {
        this.userPet = { ...this.userPet, ...editedPet };

        this.edit.emit(this.userPet);
        this.notification.success('Dados do animal atualizados com sucesso');
        this.loading = false;
        this.closeEditModal();
      },
      error: (err) => {
        console.log('Erro ao atualizar animal:', err);
        this.notification.error('Erro ao atualizar animal');
        this.loading = false;
      },
    });

    this.closeEditModal();
  }

  private norm(t?: string): string {
    return (t ?? '') // se vier undefined/null, vira string vazia
      .toLowerCase() // tudo minúsculo
      .normalize('NFD') // separa letras dos acentos
      .replace(/\p{Diacritic}/gu, '') // remove os acentos via regex
      .trim(); // tira espaços no início/fim
  }

  getSexoLabel(): string {
    const sexoPet: any = this.userPet.sexo;
    if (sexoPet === 1 || sexoPet === true) return 'Macho';
    if (sexoPet === 0 || sexoPet === false) return 'Fêmea';
    return 'Indefinido';
  }

  getEspeciesIcon(): string {
    const especie = this.norm(this.userPet.especie);

    if (especie === 'cachorro' || especie === 'cao' || especie === 'canino') {
      return 'assets/imagens/cachorro.png';
    }

    if (especie === 'gato' || especie === 'felino') {
      return 'assets/imagens/gato.png';
    }
    return 'assets/imagens/pet-generico.png';
  }
}
