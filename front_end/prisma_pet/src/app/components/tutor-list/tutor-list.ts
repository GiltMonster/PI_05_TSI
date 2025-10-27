import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TutorCard } from '../tutor-card/tutor-card';
import { TutorListInterface } from '../../interfaces';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-tutor-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule, TutorCard],
  templateUrl: './tutor-list.html',
  styleUrls: ['./tutor-list.scss']
})
export class TutorList implements OnInit {
  @Input() tutores: TutorListInterface[] = [];
  @Input() loading = false;
  @Input() emptyMessage = 'Nenhum tutor cadastrado';
  @Input() columns = 1;
  @Input() gap = 12;
  @Input() searchPlaceholder = 'Buscar Responsável';

  @Output() searchChange = new EventEmitter<string>();
  @Output() viewTutor  = new EventEmitter<TutorListInterface>();
  @Output() editTutor  = new EventEmitter<TutorListInterface>();
  @Output() deleteTutor= new EventEmitter<TutorListInterface>();
  @Output() addTutor   = new EventEmitter<void>();

  searchCtrl = new FormControl<string>('', { nonNullable: true });
  statusMsg = '';

  ngOnInit(): void {
    this.searchCtrl.valueChanges
      .pipe(debounceTime(250), distinctUntilChanged())
      .subscribe(term => {
        this.searchChange.emit(term);
        this.statusMsg = term ? `Filtrando por: ${term}.` : 'Filtro limpo.';
      });
  }

  onSubmit(e: Event) { e.preventDefault(); this.searchChange.emit(this.searchCtrl.value); }
  clearSearch()      { this.searchCtrl.setValue(''); }

  onViewTutor(p: TutorListInterface)   { this.viewTutor.emit(p); }
  onEditTutor(p: TutorListInterface)   { this.editTutor.emit(p); }
  onDeleteTutor(p: TutorListInterface) { this.deleteTutor.emit(p); }
  onAddTutor()                       { this.addTutor.emit(); }

  getGridTemplate() { return `repeat(${Math.max(1, this.columns)}, minmax(0,1fr))`; }
  trackById = (index: number, p: TutorListInterface) => (p as any).id ?? p.nome;
}
