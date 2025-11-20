import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PetInterface, UserInterface } from '../../interfaces';
import { PetService } from '../../services/pet-service';
import { VeterinarioService } from '../../services/veterinario-service';
import { Notification } from '../../services/notification';
import { Loading } from '../loading/loading';

@Component({
  selector: 'app-modal-create-pet',
  standalone: true,
  imports: [CommonModule, FormsModule, Loading],
  templateUrl: './modal-create-pet.html',
  styleUrls: ['./modal-create-pet.scss'],
})
export class ModalCreatePet implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() save  = new EventEmitter<PetInterface>();
  loading = false;

  createPet: PetInterface = {
    id: 0,
    nome: '',
    especie: '',
    ano_nascimento: undefined,
    raca: '',
    sexo: undefined,             // true = macho, false = fêmea
    peso: undefined,
    temperamento: '',
    possuiCarteirinha: false,
    castrado: undefined,
    caso_clinico: '',
    imagem: '',
    consultas: [],
    user_id: undefined,
    cor_pelagem: '',
    casoClinico: '',
  };

  especies: string[] = [
  'Cachorro',
  'Gato',
  ]

  tutores: UserInterface[] = [];
  idade: number | null = null;

  constructor(
    private petService: PetService,
    private vetService: VeterinarioService,
    private notification: Notification,
  ) {}

  ngOnInit(): void {
    this.loadTutores();
  }

  private loadTutores() {
    this.vetService.getAllTutors().subscribe({
      next: (res) => {
        this.tutores = [...res].sort((a, b) =>
          (a.name || '').localeCompare(b.name || '', 'pt-BR', {
            sensitivity: 'base',
          })
        );
      },
      error: (err) => {
        console.error('Erro ao carregar responsáveis:', err);
        this.notification.error('Erro ao carregar lista de responsáveis.');
      },
    });
  }
  

private calculaIdade() {
    if (this.idade == null || this.idade < 0) {
      this.createPet.ano_nascimento = undefined;
      return;
    }

    const anoAtual = new Date().getFullYear();
    const anoNasc = anoAtual - this.idade;

    this.createPet.ano_nascimento = new Date(anoNasc, 0, 1);
  }

  onSave() {
    // validações mínimas
    if (!this.createPet.nome || !this.createPet.especie) {
      this.notification.error('Preencha nome e espécie do animal.');
      return;
    }

    if (!this.createPet.user_id) {
      this.notification.error('Selecione o responsável pelo animal.');
      return;
    }

    // converte idade para ano nascimento
    this.calculaIdade();

    // converte Date para string (YYYY-MM-DD)
    const payload: any = {
      ...this.createPet,
      ano_nascimento: this.createPet.ano_nascimento
        ? (this.createPet.ano_nascimento as Date)
            .toISOString()
            .split('T')[0] // "2020-01-01"
        : null,
    };

    this.loading = true;

    this.petService.createPet(payload).subscribe({
      next: (res) => {
        this.notification.success('Animal cadastrado com sucesso.');
        this.save.emit(res);
        this.loading = false;
        this.close.emit();
      },
      error: (err) => {
        if (err.status === 400 && err.error?.message) {
          this.notification.error(err.error.message);
        } else {
          this.notification.error('Erro ao cadastrar animal.');
        }
        this.loading = false;
      },
    });
  }


  onCancel() {
    this.close.emit();
  }
}
