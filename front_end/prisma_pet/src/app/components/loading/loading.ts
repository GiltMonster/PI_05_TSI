import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './loading.html',
  styleUrl: './loading.scss'
})
export class Loading {

}
