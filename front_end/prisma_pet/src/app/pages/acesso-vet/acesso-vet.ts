import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../components/card/card';
import { MenuLeft } from '../../components/menu-left/menu-left';
import { Header } from '../../components/header/header';
import { CardInterface, HeaderContato, HeaderProfile, MenuInterface, TextoInicioInterface } from '../../interfaces';
import { TextoInicio } from '../../components/texto-inicio/texto-inicio';

@Component({
  selector: 'app-acesso-vet',
  imports: [CommonModule, Card, MenuLeft, Header, TextoInicio],
  templateUrl: './acesso-vet.html',
  styleUrls: ['./acesso-vet.scss'],
  standalone: true,
})

export class AcessoVet {

  isMenuOpen = false;

  toggleMenu() { this.isMenuOpen = !this.isMenuOpen; }
  closeMenu()  { this.isMenuOpen = false; }
  
  cardsVet: CardInterface[] = [
    {
      titulo: "Passo 1",
      subtitulo: 'Acessar o tutor ou animal que você irá realizar ou já realizou um atendimento',
      imagem: 'assets/imagens/img-card1-vet.png'
    },
    {
      titulo: "Passo 2",
      subtitulo: 'Analisar ou anexar exames, prescrições e anamnese para um prontuário completo do paciente',
      imagem: 'assets/imagens/img-card2-vet.png'
    },
    {
      titulo: "Passo 3",
      subtitulo: 'Instruir e tirar dúvidas do tutor sobre o atendimento e se necessário novas prescrições, não se esqueça de anexar no prontuário.',
      imagem: 'assets/imagens/img-card3-vet.png'
    }
  ];

  menuVet: MenuInterface[] = [
    { label: 'Início',     link: '/home',     icon: 'home' },
    { label: 'Animais',    link: '/pets',     icon: 'pets' },
    { label: 'Tutores',    link: '/tutores',  icon: 'groups' },
    { label: 'Serviços',   link: '/services', icon: 'work' },
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
      nome: 'Giovanna',
      tipoUsu: 'Veterinária',
      rotaUrl: '/meu_perfil',
      iconUrl: 'account_circle'
    }
  ];

  inicioVet: TextoInicioInterface[] = [
    {
      imagem: 'assets/imagens/img-acesso-vet.png',
      titulo: 'A VetJA conta com você!',
      subtitulo: 'Olá querido colega, a VetJA preza por um atendimento humanizado, claro e profissional. Nossos pacientes merecem um atendimento premium e satisfatório, contamos com você para sempre entregar um atendimento transparente, tranquilo e que transmita segurança, confiamos no seu trabalho e contamos com você!'
    }
  ];
}
