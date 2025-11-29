import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PetVacina, UserInterface } from '../../../interfaces';
import { UsuarioService } from '../../../services/usuario-service';
import { FichaPetService } from '../../../services/ficha-pet-service';
import { Notification } from '../../../services/notification';
import { Loading } from '../../loading/loading';

@Component({
  selector: 'app-vacinas-pet-modal',
  imports: [FormsModule, Loading],
  templateUrl: './vacinas-pet-modal.html',
  styleUrl: './vacinas-pet-modal.scss',
})
export class VacinasPetModal implements OnInit {
  @Input() editMode = false;
  @Input() pet_id: number = 0;
  @Input() vacinaToEdit: PetVacina = {} as PetVacina;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<PetVacina>();

  userOperator: UserInterface = {} as UserInterface;
  loading = false;

  vacina: PetVacina = {
    id: 0,
    vet_id: 0,
    pet_id: 0,
    data_vacinacao: undefined as any,
    data_reforco: undefined as any,
    dose_atual: '',
    dose_total: '',
    tipo_vacina: '',
    fabricante: '',
    observacoes: '',
    estado_vacina: 'programada',
    nome_vet: '',
  };

  constructor(
    private usuarioService: UsuarioService,
    private fichaPetService: FichaPetService,
    private notification: Notification
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
    if (this.editMode && this.vacinaToEdit) {
      this.vacina = { ...this.vacinaToEdit };
    }
  }

  onSave() {
    this.vacina = {
      ...this.vacina,
      pet_id: this.pet_id,
      vet_id: this.userOperator.id,
      nome_vet: this.userOperator.name,
    };
    if (
      !this.vacina.nome_vet ||
      !this.vacina.tipo_vacina ||
      !this.vacina.data_vacinacao ||
      !this.vacina.data_reforco ||
      !this.vacina.dose_atual ||
      !this.vacina.dose_total ||
      !this.vacina.fabricante ||
      !this.vacina.estado_vacina ||
      !this.vacina.observacoes
    ) {
      this.notification.error('Dados da vacina incompletos.');
      return;
    }
    // Monta objeto final
    this.loading = true;

    if (!this.editMode) {
      this.fichaPetService.cadastrarVacina(this.vacina).subscribe({
        next: (res) => {
          this.notification.success('Vacina cadastrada com sucesso!');

          // this.vacina = res;
          this.vacina = {
            ...res,
            vet_id: this.userOperator.id,
            nome_vet: this.userOperator.name,
          };
          this.save.emit(this.vacina);
          this.loading = false;
        },
        error: (err) => {
          console.log('Erro ao cadastrar vacina:', err);
          this.notification.error('Erro ao cadastrar vacina.');
          this.close.emit();
          this.loading = false;
        },
      });
    } else {
      this.fichaPetService.editarVacina(this.vacina).subscribe({
        next: (res) => {
          this.notification.success('Vacina editada com sucesso!');
          this.vacina = {
            ...res,
            vet_id: this.userOperator.id,
            nome_vet: this.userOperator.name,
          };
          this.save.emit(this.vacina);
          this.loading = false;
        },
        error: (err) => {
          console.log('Erro ao editar vacina:', err);
          this.notification.error('Erro ao editar vacina');
          this.close.emit();
          this.loading = false;
        },
      });
    }
  }

  onCancel() {
    this.close.emit();
  }

  getCurrentUser() {
    this.usuarioService.getUserData().subscribe({
      next: (res) => {
        this.userOperator = res;
      },
      error: (err) => {
        console.log('Erro ao obter dados do usuário:', err);
      },
    });
  }
}
