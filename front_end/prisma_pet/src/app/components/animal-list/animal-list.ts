import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AnimalCard } from '../animal-card/animal-card';
import { PetListInterface } from '../../interfaces';

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule, AnimalCard],
  templateUrl: './animal-list.html',
  styleUrl: './animal-list.scss'
})
export class AnimalList implements OnInit {
  @Input() pets: PetListInterface[] = [];
  @Input() loading = false;
  @Input() emptyMessage = 'Nenhum pet cadastrado';
  @Input() columns = 1;
  @Input() gap = 12;
  @Input() searchPlaceholder = 'Buscar por Nome do Tutor';

  @Output() searchChange = new EventEmitter<string>();
  @Output() viewPet  = new EventEmitter<PetListInterface>();
  @Output() editPet  = new EventEmitter<PetListInterface>();
  @Output() deletePet= new EventEmitter<PetListInterface>();
  @Output() addPet   = new EventEmitter<void>();

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

  onViewPet(p: PetListInterface)   { this.viewPet.emit(p); }
  onEditPet(p: PetListInterface)   { this.editPet.emit(p); }
  onDeletePet(p: PetListInterface) { this.deletePet.emit(p); }
  onAddPet()                       { this.addPet.emit(); }

  getGridTemplate() { return `repeat(${Math.max(1, this.columns)}, minmax(0,1fr))`; }
  trackById = (index: number, p: PetListInterface) => (p as any).id ?? p.nome;
}
