import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario-service';
import { UserInterface } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
  standalone: true
})
export class Perfil implements OnInit {

  class_is_required = '';
  userData: UserInterface = {
    id: 0,
    type: '',
    name: '',
    email: ''
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

      },
      error: (err) => {
        console.log('Erro, não foi possível ler os dados do usuário!!');
      }
    });
  }

}
