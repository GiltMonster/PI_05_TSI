import { Component } from '@angular/core';
import { CardInterface, HeaderContato, HeaderProfile, MenuInterface, TextoInicioInterface } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { Card } from '../../components/card/card';
import { MenuLeft } from '../../components/menu-left/menu-left';
import { Header } from '../../components/header/header';
import { TextoInicio } from '../../components/texto-inicio/texto-inicio';

@Component({
  selector: 'app-acesso-tutor',
  standalone: true,
  imports: [CommonModule, Card, MenuLeft, Header, TextoInicio],
  templateUrl: './acesso-tutor.html',
  styleUrl: './acesso-tutor.scss'
})
export class AcessoTutor {

  isMenuOpen = false;

  toggleMenu() { this.isMenuOpen = !this.isMenuOpen; }
  closeMenu()  { this.isMenuOpen = false; }
  
  cardstutor: CardInterface[] = [
    {
      titulo: "Passo 1",
      subtitulo: 'Acessar o paciente que foi atendido no menu da esquerda.',
      imagem: 'assets/imagens/img-card1-tutor.png'
    },
    {
      titulo: "Passo 2",
      subtitulo: 'Acessar e analizar os serviços prestados, anexos de receitas e exames.',
      imagem: 'assets/imagens/img-card2-tutor.png'
    },
    {
      titulo: "Passo 3",
      subtitulo: 'Com o material necessário em mão, poderá levar ao médico veterinário responsável pelo paciente e esclarecer eventuais dúvidas.',
      imagem: 'assets/imagens/img-card3-tutor.png'
    }
  ];

  menuTutor: MenuInterface[] = [
    { label: 'Início',     link: '/home',     icon: 'home' },
    { label: 'Meus Animais',    link: '/pets',     icon: 'pets' },
    { label: 'Meus Dados',   link: '/meus-dados', icon: 'person' },
  ];


  headerContato: HeaderContato[] = [
    {
      label: 'Fale Conosco',
      wpp: 'chat',
      link: 'https://api.whatsapp.com/send?phone=5511955207242'
    }
  ];

  headerProfile: HeaderProfile[] = [
    {
      nome: 'Pedro',
      tipoUsu: 'Tutor',
      rotaUrl: '/meu_perfil',
      iconUrl: 'account_circle'
    }
  ];

  inicioTutor: TextoInicioInterface[] = [
    {
      imagem: 'assets/imagens/img-acesso-tutor.png',
      titulo: 'A VetJA existe por você!',
      subtitulo: 'Olá querido tutor, a VetJA preza por um atendimento humanizado, claro e profissional. Nossos pacientes merecem um atendimento premium, satisfatório e seguro, contamos com o seu feedback para sempre entregarmos o melhor, caso tenha alguma dúvida sobre a plataforma ou sobre o caso do seu melhor amigo, nossa equipe estará a sua disposição! '
    }
  ];
}
