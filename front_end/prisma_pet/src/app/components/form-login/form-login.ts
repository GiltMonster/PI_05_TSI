import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-form-login',
  imports: [FontAwesomeModule],
  templateUrl: './form-login.html',
  styleUrl: './form-login.scss'
})
export class FormLogin {
  title = 'VeterinariosJA';
  icon_email = faEnvelope;
  icon_senha = faLock;
}
