import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faPaw, faUserFriends, faStethoscope, faBriefcase } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-menu-left',
  imports: [FontAwesomeModule],
  templateUrl: './menu-left.html',
  styleUrl: './menu-left.scss'
})
export class MenuLeft {
  Home = 'Home';
  Animais = 'Animais';
  Tutores = 'Tutores';
  Vets = 'Veterinários';
  Services = 'Serviços';
  icon_pata = faPaw;
  icon_home = faHome;
  icon_tutor = faUserFriends;
  icon_vet = faStethoscope;
  icon_service = faBriefcase;
  }
