import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'; 

@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  logo = "assets/imagens/img-logo-novo.png";
  profile = "assets/icons/icon_profile.svg";
  userName = "Giovanna";
  tipo_usuario = "Administrador";
  telefone = "11999999999";
  icon_whats = faWhatsapp;
}
