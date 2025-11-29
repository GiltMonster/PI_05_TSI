import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PetInterface } from '../../interfaces';
import { PetService } from '../../services/pet-service';
import { Notification } from '../../services/notification';
import { ModalEditPet } from '../modal-edit-pet/modal-edit-pet';
import { ModalDelete } from '../modal-delete/modal-delete';
import { Loading } from '../loading/loading';
import { Router } from '@angular/router';

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

  editModalOpen = false;
  petToEdit?: PetInterface;
  loading = false;
  deleteModalOpen = false;
  petToDelete: PetInterface | null = null;

  tutorName = '';

  constructor(
    private petService: PetService,
    private notification: Notification,
    private router: Router
  ) {}

  ngOnInit(): void {}

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
    editedPet.type = editedPet.type || 'user';

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

    calcIdadePet(data_nascimento?: Date): string | number {
    if (data_nascimento) {
      const nascimento = new Date(data_nascimento);
      const hoje = new Date();
      let idade = hoje.getFullYear() - nascimento.getFullYear();
      const mes = hoje.getMonth() - nascimento.getMonth();

      if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
      }

      return idade;
    }
    return '';
  }
}
