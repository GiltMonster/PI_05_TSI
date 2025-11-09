import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TutorCard } from '../tutor-card/tutor-card';
import { UserInterface } from '../../interfaces';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-tutor-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule, TutorCard],
  templateUrl: './tutor-list.html',
  styleUrls: ['./tutor-list.scss']
})
export class TutorList implements OnInit {
  @Input() tutores: UserInterface[] = [];
  @Input() loading = false;
  @Input() emptyMessage = 'Nenhum tutor cadastrado';


  searchCtrl = new FormControl<string>('', { nonNullable: true });
  statusMsg = '';

  ngOnInit(): void {

  }




  trackById = (index: number, p: UserInterface) => (p as any).id ?? p.name;
}
