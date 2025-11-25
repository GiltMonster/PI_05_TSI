import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../components/card/card';
import { CardInterface, TextoInicioInterface } from '../../interfaces';
import { TextoInicio } from '../../components/texto-inicio/texto-inicio';

@Component({
  selector: 'app-acesso-vet',
  imports: [CommonModule, Card, TextoInicio],
  templateUrl: './acesso-vet.html',
  styleUrls: ['./acesso-vet.scss'],
  standalone: true,
})
export class AcessoVet {

  constructor() { }

  cardsVet: CardInterface[] = [
    {
      titulo: 'Passo 1',
      subtitulo: 'Acessar o responsável ou animal que você irá realizar ou já realizou um atendimento',
      imagem: 'assets/imagens/img-card1-vet.png',
    },
    {
      titulo: 'Passo 2',
      subtitulo:
        'Analisar ou anexar exames, prescrições e anamnese para um prontuário completo do paciente',
      imagem: 'assets/imagens/img-card2-vet.png',
    },
    {
      titulo: 'Passo 3',
      subtitulo:
        'Instruir e tirar dúvidas do responsável sobre o atendimento e se necessário novas prescrições, não se esqueça de anexar no prontuário.',
      imagem: 'assets/imagens/img-card3-vet.png',
    },
  ];

  inicioVet: TextoInicioInterface[] = [
    {
      imagem: 'assets/imagens/img-acesso-vet.png',
      titulo: 'A VetJA conta com você!',
      subtitulo:
        'Olá querido colega, a VetJA preza por um atendimento humanizado, claro e profissional. Nossos pacientes merecem um atendimento premium e satisfatório, contamos com você para sempre entregar um atendimento transparente, tranquilo e que transmita segurança, confiamos no seu trabalho e contamos com você!',
    },
  ];
}
