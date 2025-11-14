import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextoInicio } from '../../components/texto-inicio/texto-inicio';
import { TextoInicioInterface } from '../../interfaces';
import { RouterModule } from "@angular/router";


@Component({
  selector: 'app-acesso-admin',
  standalone: true,
  imports: [CommonModule, TextoInicio, RouterModule],
  templateUrl: './acesso-admin.html',
  styleUrl: './acesso-admin.scss'
})
export class AcessoAdmin {
  inicioAdmin: TextoInicioInterface[] = [
    {
      imagem: 'assets/imagens/img-acesso-adm.png',
      titulo: 'A VetJA precisa de você!',
      subtitulo: 'Olá querido Adm, a VetJA preza por um atendimento especializado, claro e profissional. Nossos pacientes merecem um atendimento premium, satisfatório e seguro, contamos com você, para que todos os cadastros e controles sejam feitos de forma correta e simples para que nosso funcionamento seja sempre fluido!'
    }
  ];
}
