import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthLogin } from '../../services/auth-login';
import {Validators, NonNullableFormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Route, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-login',
    standalone: true,
  imports: [FontAwesomeModule, FormsModule, ReactiveFormsModule, MatIconModule, MatFormFieldModule, MatInputModule, CommonModule],
  templateUrl: './form-login.html',
  styleUrl: './form-login.scss'
})

export class FormLogin {
  title = 'VeterinariosJA';
  icon_email = faEnvelope;
  icon_senha = faLock;
  
protected loginForms!: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;

  constructor(
    private authLogin: AuthLogin,
    protected formBuilder: NonNullableFormBuilder,
    private router: Router,
    private live: LiveAnnouncer
  ) {
    this.loginForms = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required])
    });
  }

  get emailCtrl()     { return this.loginForms.get('email') as FormControl<string>; }
  get passwordCtrl()  { return this.loginForms.get('password') as FormControl<string>; }

  login() {
    // ABNT 5.9: validar e informar claramente o erro, sem perder dados
    if (this.loginForms.invalid) {
      this.loginForms.markAllAsTouched();
      this.live.announce('Formulário inválido. Por favor, corrija os campos destacados.', 'assertive');
      return;
    }

    const userEmail = this.emailCtrl.value;
    const userPassword = this.passwordCtrl.value;

    this.authLogin.login(userEmail, userPassword).pipe(
      // ABNT 5.7/5.9
      catchError(err => {
        this.live.announce('Falha no login. Verifique suas credenciais.', 'assertive');
        return of(null);
      })
    ).subscribe(resp => {
      if (!resp) return;
      // ABNT 5.7: confirma sucesso
      this.live.announce('Login realizado com sucesso.', 'polite');
      this.router.navigate(['/vet']);
      this.loginForms.reset();
    });
  }

  consoleLog() {
    console.log(this.loginForms.value);
  }


  // VERSÃO ANTERIOR DO CÓDIGO
  // protected loginForms!:  FormGroup<{
  //   email: FormControl<string>;
  //   password: FormControl<string>;
  // }>;

  //   constructor(
  //   private authLogin: AuthLogin,
  //   protected formBuilder: NonNullableFormBuilder,
  //   private router: Router,
  //   private live: LiveAnnouncer
  // ) {
  //   this.loginForms = this.formBuilder.group({
  //     email: this.formBuilder.control('', [Validators.required, Validators.email ]),
  //     password: this.formBuilder.control('', [Validators.required]),
  //   });
  // }

  // login() {
  //   const userEmail = this.loginForms.get('email')!.value;
  //   const userPassword = this.loginForms.get('password')!.value;
  //   this.authLogin.login(userEmail,userPassword).subscribe(
  //     (resp) => {
  //       console.log('Login successful', resp);
  //           this.router.navigate(['/menu'])
  //     }
  //   );

  //   this.loginForms.reset();
  // }
}
