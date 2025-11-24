import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PetPrescricao, UserInterface } from '../../../interfaces';
import { UsuarioService } from '../../../services/usuario-service';
import { FichaPetService } from '../../../services/ficha-pet-service';
import { Notification } from '../../../services/notification';

@Component({
  selector: 'app-prescricao-pet-modal',
  imports: [FormsModule],
  templateUrl: './prescricao-pet-modal.html',
  styleUrl: './prescricao-pet-modal.scss',
})
export class PrescricaoPetModal implements OnInit {
  @Input() editMode = false;
  @Input() pet_id: number = 0;
  @Input() prescricaoToEdit: PetPrescricao = {} as PetPrescricao;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<PetPrescricao>();

  userOperator: UserInterface = {} as UserInterface;

  prescricao: PetPrescricao = {
    id: 0,
    vet_id: 0,
    pet_id: 0,
    data_prescricao: undefined as any,
    nome_medicamento: '',
    dosagem: '',
    farmacia: '',
    via: '',
    posologia: '',
  };

  constructor(
    private usuarioService: UsuarioService,
    private fichaService: FichaPetService,
    private notification: Notification
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
    if (this.editMode && this.prescricaoToEdit) {
      this.prescricao = { ...this.prescricaoToEdit };
    }
  }

  onSave() {
    this.prescricao = {
      ...this.prescricao,
      pet_id: this.pet_id,
      vet_id: this.userOperator.id,
    };

    if (!this.editMode) {
      this.fichaService.cadastrarPrescricao(this.prescricao).subscribe({
        next: () => {
          this.notification.success('Prescrição cadastrada com sucesso!');
          this.save.emit(this.prescricao);
        },
        error: (err) => {
          console.log('Erro ao cadastrar prescrição:', err);
          this.notification.error('Erro ao cadastrar prescrição.');
          this.close.emit();
        }
      });
    } else {
      this.fichaService.editarPrescricao(this.prescricao).subscribe({
        next: () => {
          this.notification.success('Prescrição editada com sucesso!');
          this.save.emit(this.prescricao);
        },
        error: (err) => {
          console.log('Erro ao editar prescrição:', err);
          this.notification.error('Erro ao editar prescrição.');
          this.close.emit();
        }
      });
    }
  }

  onCancel() { this.close.emit(); }

  getCurrentUser() {
    this.usuarioService.getUserData().subscribe({
      next: (res) => { this.userOperator = res; },
      error: (err) => { console.log('Erro ao obter usuário:', err); }
    });
  }
}
