import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario-service';
import { UserInterface } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormatCPFPipe } from '../../pipes/format-cpf-pipe';
import { FormatPhonePipe } from '../../pipes/format-phone-pipe';
import { FormatCEPPipe } from '../../pipes/format-cep-pipe';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, FormsModule, FormatCPFPipe, FormatPhonePipe, FormatCEPPipe],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
  standalone: true
})
export class Perfil implements OnInit {

  class_is_required = '';
  class_pix_required = '';
  userData: UserInterface = {
    id: 0,
    type: '',
    name: '',
    email: '',
    cep: '',
    cpf: '',
    phone: ''
  }

  constructor(
    private usuarioService: UsuarioService
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

  getUserData() {
    this.usuarioService.getUserData().subscribe({
      next: (res) => {
        this.userData = res;
        this.class_is_required = this.userData.type !== 'cliente' || 'vet' ? 'form-label' : 'form-label form-label--required';
        this.class_pix_required = this.userData.type === 'vet' ? 'form-label form-label--required' : 'form-label';
      },
      error: (err) => {
        console.log('Erro, não foi possível ler os dados do usuário!!');
      }
    });
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
      }
    });

  }

}
