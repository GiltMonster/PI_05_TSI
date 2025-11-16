import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class Notification {
  constructor(private snackBar: MatSnackBar) {}

  success(message = 'Operação realizada com sucesso.') {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      panelClass: ['snackbar-success'],
    });
  }

  error(message = 'Algo deu errado. Tente novamente.') {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      panelClass: ['snackbar-error'],
    });
  }
}
