import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog , MatDialogModule } from  '@angular/material/dialog' ;

@Component({
  selector: 'app-dialog-termos',
  standalone: true,
  imports: [MatButtonModule , MatDialogModule],
  changeDetection : ChangeDetectionStrategy.OnPush ,
  templateUrl: './dialog-termos.html',
  styleUrls: ['./dialog-termos.scss']
})

export class DialogTermos {
}
