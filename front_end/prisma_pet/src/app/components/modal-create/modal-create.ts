import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserInterface } from '../../interfaces';
import { UsuarioService } from '../../services/usuario-service';
import { Notification } from '../../services/notification';
import { Loading } from '../loading/loading';

@Component({
  selector: 'app-modal-create',
  standalone: true,
  imports: [CommonModule, FormsModule, Loading],
  templateUrl: './modal-create.html',
  styleUrls: ['./modal-create.scss'],
})
export class ModalCreate {
  @Input() userType: 'user' | 'vet' | 'admin' = 'user';
  @Output() close = new EventEmitter<void>();
  @Output() save  = new EventEmitter<UserInterface>();

  createUser: UserInterface = {
    id: 0,
    type: 'user',
    name: '',
    email: '',
    password: '',
    phone: '',
    cep: '',
    endereco: '',
    cidade: '',
    estado: '',
    bairro: '',
    complemento: '',
    cpf: '',
    crmv: '',
    especialidade_vet: '',
    pix: '',
  };

  especialidade_vet: string[] = [
  'Clínico Geral',
  'Fisioterapia',
  'Ultrassom',
  'Oftalmologista',
  'Cirurgiã',
  'Nutricionista',
  'Cardiologista',
  'Silvestres',
  'Raio X',
  'Nefrologista',
  'Dermatologista',
  'Endócrinologista',
  'Auxiliar',
  ].sort((a, b) => a.localeCompare(b, 'pt-BR')); // ordenar em ordem alfabética


  confirmPassword = '';
  loading = false;

  class_is_required = 'form-label form-label--required';
  class_group_full_option = 'form-group form-group--full';

  constructor(
    private usuarioService: UsuarioService,
    private notification: Notification,
  ) {}

  ngOnChanges() {
    this.class_is_required =
      this.userType !== 'admin' ? 'form-label form-label--required' : 'form-label';

    this.class_group_full_option =
      this.userType !== 'vet' ? 'form-group form-group--full' : 'form-group';
  }

  onSave() {
    if (!this.createUser.name || !this.createUser.email || !this.createUser.password) {
      this.notification.error('Preencha nome, e-mail e senha.');
      return;
    }

    if (this.createUser.password !== this.confirmPassword) {
      this.notification.error('As senhas não coincidem.');
      return;
    }

    this.loading = true;

    const payload: any = {
      ...this.createUser,
      type: this.userType || this.createUser.type || 'user',
      password_confirmation: this.confirmPassword,
    };

    this.usuarioService.createUser(payload).subscribe({
      next: (res) => {
        this.createUser = res;
        this.save.emit(res);
        this.notification.success('Usuário criado com sucesso.');
        this.loading = false;
        this.close.emit();
      },
      error: (err) => {
        console.log('Erro ao criar usuário', err);

        let msg = 'Erro ao criar usuário.';

        if (err.status === 422 && err.error?.errors) {
          const errors = err.error.errors;

          if (errors.email && Array.isArray(errors.email) && errors.email.length) {
            const emailMsg = String(errors.email[0]).toLowerCase();

            if (
              emailMsg.includes('email já está em uso') ||
              emailMsg.includes('já foi registrado')
            ) {
              msg = 'Este e-mail já está sendo utilizado.';
            } else {
              msg = errors.email[0];
            }
          } else if (typeof err.error?.message === 'string') {
            msg = err.error.message;
          }
        }

        this.notification.error(msg);
        this.loading = false;
      },
    });
  }

  onCancel() {
    this.close.emit();
  }

  applyCpfMask(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    this.createUser.cpf = value;
  }

  applyTelephoneMask(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{2})(\d)/, '($1) $2');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');

    this.createUser.phone = value;
  }

  applyMaskcCEP(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
    this.createUser.cep = value;
  }

  findCEP(cep = '') {
    if (!cep) return;

    const cepSemMascara = cep.replace(/\D/g, '');

    this.usuarioService.findCEP(cepSemMascara).subscribe({
      next: (res) => {
        this.createUser = {
          ...this.createUser,
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
