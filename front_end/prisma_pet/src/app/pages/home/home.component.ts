import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface InfoCard {
  id: number;
  step: string;
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  infoCards: InfoCard[] = [
    {
      id: 1,
      step: 'Passo 1',
      title: 'Acessar o paciente',
      description: 'Acessar o paciente que foi atendido no menu da esquerda',
      image: '/img_card1.svg'
    },
    {
      id: 2,
      step: 'Passo 2',
      title: 'Analisar serviços',
      description: 'Acessar e analisar os serviços prestados, anexos de receitas e exames',
      image: '/img_card2.svg'
    },
    {
      id: 3,
      step: 'Passo 3',
      title: 'Esclarecer dúvidas',
      description: 'Com o material necessário em mão, poderá levar ao médico veterinário responsável pelo paciente e esclarecer eventuais dúvidas',
      image: '/img_card3.svg'
    }
  ];

  mainTitle = 'A VetJA existe por você!';
  mainDescription = 'Olá querido tutor, a VetJA preza por um atendimento humanizado, claro e profissional. Nossos pacientes merecem um atendimento premium, satisfatório e seguro, contamos com o seu feedback para sempre entregarmos o melhor, caso tenha alguma dúvida sobre a plataforma ou sobre o caso do seu melhor amigo, nossa equipe estará a sua disposição!';

  imagePlaceholder = {
    alt: 'Mulher segurando gato laranja e branco',
    description: 'Imagem da mulher com cabelo escuro preso em coque, usando blusa azul e saia preta, segurando um gato laranja e branco nos braços'
  };
}
