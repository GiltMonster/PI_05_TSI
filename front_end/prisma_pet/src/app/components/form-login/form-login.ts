import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthLogin } from '../../services/auth-login';
import {Validators, NonNullableFormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Route, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form-login',
  imports: [FontAwesomeModule, FormsModule, ReactiveFormsModule, MatIconModule,MatFormFieldModule, MatInputModule],
  standalone: true,
  templateUrl: './form-login.html',
  styleUrl: './form-login.scss'
})

export class FormLogin {
  title = 'VeterinariosJA';
  icon_email = faEnvelope;
  icon_senha = faLock;

  protected loginForms!:  FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;

    constructor(
    private authLogin: AuthLogin,
    protected formBuilder: NonNullableFormBuilder,
    private router: Router
  ) {
    this.loginForms = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email ]),
      password: this.formBuilder.control('', [Validators.required]),
    });
  }

  login() {
    const userEmail = this.loginForms.get('email')!.value;
    const userPassword = this.loginForms.get('password')!.value;
    this.authLogin.login(userEmail,userPassword).subscribe(
      (resp) => {
        console.log('Login successful', resp);
            this.router.navigate(['/menu'])
      }
    );

    this.loginForms.reset();
  }
}
