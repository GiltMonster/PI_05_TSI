import { Component } from '@angular/core';
import { FormLogin } from '../../components/form-login/form-login';
import { AuthLogin } from '../../services/auth-login';

@Component({
  selector: 'app-login',
  imports: [FormLogin],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'] 
})

export class Login {
}
