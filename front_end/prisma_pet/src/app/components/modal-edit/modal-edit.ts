import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { UserInterface } from '../../interfaces';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario-service';

@Component({
  selector: 'app-modal-edit',
  imports: [FormsModule],
  templateUrl: './modal-edit.html',
  styleUrl: './modal-edit.scss',
})
export class ModalEdit implements OnChanges {
  @Input() user!: UserInterface;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<UserInterface>();

  editedUser: UserInterface = {} as UserInterface;
  class_is_required = '';
  class_group_full_option = '';


  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
      this.editedUser = { ...this.user };
      this.class_is_required = this.user.type !== 'admin' ? 'form-label form-label--required' : 'form-label';
      this.class_group_full_option = this.user.type !== 'vet' ? 'form-group form-group--full' : 'form-group';
    }
  }

  onSave() {
    this.save.emit(this.editedUser);
    this.usuarioService.updateUser(this.editedUser).subscribe({
      next: (res) => {
        console.log('Usuário atualizado com sucesso', res);
      },
      error: (err) => {
        console.log('Erro ao atualizar usuário', err);
      }
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
          bairro: res.neighborhood
        };
      },
      error: (err) => {
        console.log('Erro ao buscar CEP', err);
      }
    });
  }
}
