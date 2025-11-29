import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PetInterface, UserInterface } from '../../interfaces';
import { PetService } from '../../services/pet-service';
import { Notification } from '../../services/notification';
import { CommonModule } from '@angular/common';
import { VeterinarioService } from '../../services/veterinario-service';

@Component({
  selector: 'app-modal-edit-pet',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './modal-edit-pet.html',
  styleUrls: ['./modal-edit-pet.scss'],
})
export class ModalEditPet implements OnChanges {
  @Input() pet!: PetInterface;
  @Input() typeUser: string = '';
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<PetInterface>();
  @ViewChild('modalTitle', { static: true }) modalTitle!: ElementRef<HTMLHeadingElement>;

  editedPet: PetInterface = {} as PetInterface;
  tutores: UserInterface[] = [];

  especies: string[] = ['Cachorro', 'Gato'].sort((a, b) => a.localeCompare(b, 'pt-BR')); // ordenar em ordem alfabética

  constructor(
    private petService: PetService,
    private notification: Notification,
    private vetService: VeterinarioService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pet'] && this.pet) {
      this.editedPet = { ...this.pet };

      // normaliza data pro input = date
      if (this.editedPet.ano_nascimento) {
        this.editedPet.ano_nascimento = this.editedPet.ano_nascimento;
      }

      // carrega lista de tutores quando o modal abre
      if (this.typeUser === 'admin') {
      this.loadTutores();
    }

      const sexo: any = this.pet.sexo;
      if (sexo === 1 || sexo === '1' || sexo === true) {
        this.editedPet.sexo = true; // macho
      } else if (sexo === 0 || sexo === '0' || sexo === false) {
        this.editedPet.sexo = false; // femea
      }

      const castrado: any = this.pet.castrado;
      if (castrado === 1 || castrado === '1' || castrado === true) {
        this.editedPet.castrado = true;
      } else if (castrado === 0 || castrado === '0' || castrado === false) {
        this.editedPet.castrado = false;
      }
    }
  }

  private loadTutores() {
    this.vetService.getAllTutors().subscribe({
      next: (res) => {
        this.tutores = [...res].sort((a, b) =>
          (a.name || '').localeCompare(b.name || '', 'pt-BR', {
            sensitivity: 'base',
          })
        ); // ordenar em ordem alfabética

        // faz com que o tutor atual do pet fique selecionado
        if (!this.editedPet.user_id && this.pet.user_id) {
          this.editedPet.user_id = this.pet.user_id;
        }
      },
      error: (err) => {
        console.error('Erro ao carregar responsáveis:', err);
        this.notification.error('Erro ao carregar lista de responsáveis.');
      },
    });
  }

  onSave() {
    this.save.emit(this.editedPet);

    this.petService.updatePet(this.editedPet).subscribe({
      next: (res) => {
        console.log('Animal atualizado com sucesso', res);
        this.notification.success('Animal atualizado com sucesso.');
        this.close.emit();
      },
      error: (err) => {
        console.log('Erro ao atualizar animal', err);
        this.notification.error('Erro ao atualizar animal.');
      },
    });
  }

  onCancel() {
    this.close.emit();
  }
}
