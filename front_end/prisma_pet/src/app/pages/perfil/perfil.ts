import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario-service';
import { UserInterface } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Notification } from '../../services/notification';
import { Loading } from '../../components/loading/loading';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, FormsModule, Loading],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
  standalone: true
})
export class Perfil implements OnInit {

  class_is_required = '';
  class_group_full_option = '';
  userData: UserInterface = {
    id: 0,
    type: '',
    name: '',
    email: '',
    cep: '',
    cpf: '',
    phone: ''
  }
  loading = false;

  constructor(
    private usuarioService: UsuarioService,
    private notification: Notification,
  ) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getFirstLetterNameAndLast(name: string): string {
    const names = name.split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    } else {
      const firstLetter = names[0].charAt(0).toUpperCase();
      const lastLetter = names[names.length - 1].charAt(0).toUpperCase();
      return firstLetter + lastLetter;
    }
  }

  applyCpfMask(event: any): void {
    let value = event.target.value.replace(/\D/g, ''); // Remove qualquer coisa que não seja número
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca o primeiro ponto
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca o segundo ponto
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca o hífen

    this.userData.cpf = value;
  }

  applyTelephoneMask(event: any): void {
    let value = event.target.value.replace(/\D/g, ''); // Remove qualquer coisa que não seja número
    value = value.replace(/(\d{2})(\d)/, '($1) $2'); // Coloca o parêntese e espaço
    value = value.replace(/(\d{5})(\d)/, '$1-$2'); // Coloca o hífen

    this.userData.phone = value;
  }

  applyMaskcCEP(event: any): void {
    let value = event.target.value.replace(/\D/g, ''); // Remove qualquer coisa que não seja número
    value = value.replace(/(\d{5})(\d)/, '$1-$2'); // Coloca o hífen

    this.userData.cep = value;
  }

  removeMask(value: string): string {
    return value.replace(/\D/g, '');
  }

  getUserData() {
    this.loading = true;
    this.usuarioService.getUserData().subscribe({
      next: (res) => {
        this.userData = res;
        this.class_is_required = this.userData.type !== 'admin' ? 'form-label form-label--required' : 'form-label';
        this.class_group_full_option = this.userData.type !== 'vet' ? 'form-group form-group--full' : 'form-group';

        console.log(res);
        this.loading = false;

      },
      error: (err) => {
        console.log('Erro, não foi possível ler os dados do usuário!!');
        this.loading = false;
      }
    });
  }

  updateUserData() {
    this.loading = true;
    this.userData = {
      ...this.userData,
      cpf: this.removeMask(this.userData.cpf || ''),
      phone: this.removeMask(this.userData.phone || ''),
      cep: this.removeMask(this.userData.cep || '')
    }
    this.usuarioService.updateUser(this.userData).subscribe({
      next: (res) => {
        console.log('Dados atualizados com sucesso!', res);
        this.notification.success('Dados atualizados com sucesso!');
        this.loading = false;
      },
      error: (err) => {
        console.log('Erro ao atualizar os dados do usuário!!', err);
        this.notification.error('Erro ao atualizar os dados do usuário!!');
        this.loading = false;
      }
    });
  }

  restartForm() {
    this.getUserData();
  }

  findCEP(cep = '') {
    this.usuarioService.findCEP(cep).subscribe({
      next: (res) => {
        this.userData = {
          ...this.userData,
          endereco: res.street,
          cidade: res.city,
          estado: res.state,
          bairro: res.neighborhood
        };
      },
      error: (err) => {
        console.log('Erro ao buscar CEP', err);
        this.notification.error('Cep não encontrado!');
      }
    });
  }

}
