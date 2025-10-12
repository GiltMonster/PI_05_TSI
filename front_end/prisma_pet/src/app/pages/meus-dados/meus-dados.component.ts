import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-meus-dados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './meus-dados.component.html',
  styleUrl: './meus-dados.component.scss'
})
export class MeusDadosComponent {
  userData = {
    nome: 'Pedro Angelo',
    email: 'Pedro@gmail.com',
    cpf: '111.111.111-11',
    telefone: '(11) 96660-5555',
    endereco: 'Rua Vinicius de Moraes',
    bairro: 'Jardim São Paulo',
    cidade: 'São Paulo',
    cep: '00000-000',
    numero: '1110',
    complemento: 'Casa 2',
    senha: '**********'
  };

  onSave(): void {
    console.log('Salvando dados:', this.userData);
  }
}
