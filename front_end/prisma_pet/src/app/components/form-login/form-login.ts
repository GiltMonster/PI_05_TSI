import { Component, inject } from '@angular/core';
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
import { Notification } from '../../services/notification';
import { Loading } from '../loading/loading';
import { DialogTermos } from '../dialog-termos/dialog-termos';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogPrivacidade } from '../dialog-termos/dialog-privacidade/dialog-privacidade';


@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, ReactiveFormsModule, MatIconModule, MatFormFieldModule, MatInputModule, CommonModule, Loading, MatButtonModule, MatDialogModule,],
  templateUrl: './form-login.html',
  styleUrl: './form-login.scss'
})

export class FormLogin {
  title = 'VeterinariosJA';
  icon_email = faEnvelope;
  icon_senha = faLock;
  readonly dialog = inject(MatDialog);
  loading = false;

protected loginForms!: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;

  constructor(
    private authLogin: AuthLogin,
    protected formBuilder: NonNullableFormBuilder,
    private router: Router,
    private live: LiveAnnouncer,
    private notification: Notification,
  ) {
    this.loginForms = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required])
    });
  }

  get emailCtrl()     { return this.loginForms.get('email') as FormControl<string>; }
  get passwordCtrl()  { return this.loginForms.get('password') as FormControl<string>; }


  openDialogTermos() {
    this.dialog.open(DialogTermos, {
      width: '720px',
      maxWidth: '95vw',
      autoFocus: false,
      restoreFocus: true,
    });
  }

    openDialogPrivacidade() {
    this.dialog.open(DialogPrivacidade, {
      width: '720px',
      maxWidth: '95vw',
      autoFocus: false,
      restoreFocus: true,
    });
  }

  login() {
    // ABNT 5.9: validar e informar claramente o erro, sem perder dados
    if (this.loginForms.invalid) {
      this.loginForms.markAllAsTouched();
      this.live.announce('Formulário inválido. Por favor, corrija os campos destacados.', 'assertive');
      return;
    }
    this.loading = true;

    const userEmail = this.emailCtrl.value;
    const userPassword = this.passwordCtrl.value;

    this.authLogin.login(userEmail, userPassword).pipe(
      // ABNT 5.7/5.9
      catchError(err => {
        this.loading = false;
      // this.live.announce('Falha no login. Verifique suas credenciais.', 'assertive');
      this.notification.error('Falha no login. Verifique suas credenciais.');
        return of(null);
      })
    ).subscribe(resp => {
      if (!resp) return;
      this.loading = false;
      // ABNT 5.7: confirma sucesso
      this.live.announce('Login realizado com sucesso.', 'polite');
      this.notification.success('Login realizado com sucesso.');
      if (resp.role[0] === 'admin') {
        this.router.navigate(['/admin']);
      } else if (resp.role[0] === 'vet') {
        this.router.navigate(['/vet']);
      } else if (resp.role[0] === 'user') {
        this.router.navigate(['/tutor']);
      }

      this.loading = false;

      setTimeout(() => window.location.reload(), 500);
      // window.location.reload();
      this.loginForms.reset();
    });
  }

  consoleLog() {
    console.log(this.loginForms.value);
  }
}
