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

  fileToUpload!: File;
  selectedFileName: string = '';

  prescricao: PetPrescricao = { } as PetPrescricao;

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

  onFileSelected(event: any) {
    this.fileToUpload = event.target.files[0];
    this.selectedFileName = this.fileToUpload ? this.fileToUpload.name : '';

  }

  onSave() {
    console.log(this.fileToUpload);
    if (!this.prescricao.nome_medicamento || !this.prescricao.dosagem ||
        !this.prescricao.via || !this.prescricao.posologia || !this.prescricao.farmacia ||
        !this.prescricao.data_prescricao ) {
      this.notification.error('Dados da prescrição incompletos.');
      return;
    }

    if (!this.editMode) {
      this.prescricao = {
        ...this.prescricao,
        pet_id: this.pet_id,
        vet_id: this.userOperator.id,
      };

      this.fichaService.cadastrarPrescricao(this.prescricao).subscribe({
        next: (res) => {
          this.notification.success('Prescrição cadastrada com sucesso!');
          this.prescricao = res;
          this.save.emit(this.prescricao);

          if (this.fileToUpload) {
            this.fichaService.uploadPrescricaoFile(this.fileToUpload, this.pet_id, res.id).subscribe({
              next: () => {
                this.notification.success('Arquivo da prescrição enviado com sucesso!');
              },
              error: (err) => {
                console.log('Erro ao enviar arquivo da prescrição:', err);
                this.notification.error('Erro ao enviar arquivo da prescrição.');
              }
            });
          }
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
