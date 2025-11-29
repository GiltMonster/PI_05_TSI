import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { UserInterface } from '../../interfaces';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario-service';
import { Notification } from '../../services/notification';
import { Loading } from '../loading/loading';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-edit',
  imports: [FormsModule, CommonModule, Loading],
  templateUrl: './modal-edit.html',
  styleUrl: './modal-edit.scss',
})
export class ModalEdit implements OnChanges {
  @Input() user!: UserInterface;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<UserInterface>();
  @ViewChild('modalTitle', { static: true }) modalTitle!: ElementRef<HTMLHeadingElement>;

  editedUser: UserInterface = {} as UserInterface;
  class_is_required = '';
  class_group_full_option = '';
  loading = false;

  especialidadesVet: string[] = [
    'Auxiliar',
    'Cardiologista',
    'Cirurgiã',
    'Clínico Geral',
    'Dermatologista',
    'Endócrinologista',
    'Fisioterapia',
    'Nefrologista',
    'Nutricionista',
    'Oftalmologista',
    'Raio X',
    'Silvestres',
    'Ultrassom',
  ];

  constructor(private usuarioService: UsuarioService, private notification: Notification) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
      this.editedUser = { ...this.user };
      this.class_is_required =
        this.user.type !== 'admin' ? 'form-label form-label--required' : 'form-label';
      this.class_group_full_option =
        this.user.type !== 'vet' ? 'form-group form-group--full' : 'form-group';

      if (this.user.type === 'vet' && !this.editedUser.especialidade_vet) {
        this.editedUser.especialidade_vet = '';
      }
    }
  }

  onSave() {
    this.loading = true;
    console.log('Salvando usuário editado:', this.editedUser);

    this.save.emit(this.editedUser);
    this.usuarioService.updateUser(this.editedUser).subscribe({
      next: (res) => {
        console.log('Usuário atualizado com sucesso', res);
        this.notification.success('Usuário atualizado com sucesso.');
        this.loading = false;
      },
      error: (err) => {
        console.log('Erro ao atualizar usuário', err);
        this.notification.error('Erro ao atualizar usuário');
        this.loading = false;
      },
    });
    this.close.emit();
  }

  onCancel() {
    this.close.emit();
  }

  applyCpfMask(event: any): void {
    let value = event.target.value.replace(/\D/g, ''); // Remove qualquer coisa que não seja número
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca o primeiro ponto
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca o segundo ponto
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca o hífen

    this.editedUser.cpf = value;
  }

  applyTelephoneMask(event: any): void {
    let value = event.target.value.replace(/\D/g, ''); // Remove qualquer coisa que não seja número
    value = value.replace(/(\d{2})(\d)/, '($1) $2'); // Coloca o parêntese e espaço
    value = value.replace(/(\d{5})(\d)/, '$1-$2'); // Coloca o hífen

    this.editedUser.phone = value;
  }

  applyMaskcCEP(event: any): void {
    let value = event.target.value.replace(/\D/g, ''); // Remove qualquer coisa que não seja número
    value = value.replace(/(\d{5})(\d)/, '$1-$2'); // Coloca o hífen

    this.editedUser.cep = value;
  }

  removeMask(value: string): string {
    return value.replace(/\D/g, '');
  }

  findCEP(cep = '') {
    this.usuarioService.findCEP(cep).subscribe({
      next: (res) => {
        this.editedUser = {
          ...this.editedUser,
          endereco: res.street,
          cidade: res.city,
          estado: res.state,
          bairro: res.neighborhood,
        };
      },
      error: (err) => {
        console.log('Erro ao buscar CEP', err);
        this.notification.error('Erro ao buscar CEP');
      },
    });
  }
}
