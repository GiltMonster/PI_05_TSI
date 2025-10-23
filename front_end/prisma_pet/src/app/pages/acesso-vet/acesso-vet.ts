import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../components/card/card';
import { MenuLeft } from '../../components/menu-left/menu-left';
import { Header } from '../../components/header/header';
import { CardInterface, MenuInterface } from '../../interfaces';
import { faBriefcase, faHome, faPaw, faStethoscope, faUserFriends } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-acesso-vet',
  imports: [CommonModule, Card, MenuLeft, Header],
  templateUrl: './acesso-vet.html',
  styleUrls: ['./acesso-vet.scss'],
  standalone: true,
})

export class AcessoVet {

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
}
