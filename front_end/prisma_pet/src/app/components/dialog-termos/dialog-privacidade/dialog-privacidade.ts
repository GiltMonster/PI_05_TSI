import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-privacidade',
  standalone: true,
  imports: [MatButtonModule , MatDialogModule],
  templateUrl: './dialog-privacidade.html',
  styleUrl: './dialog-privacidade.scss'
})
export class DialogPrivacidade {

}
