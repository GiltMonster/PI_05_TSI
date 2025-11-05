import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { VetCard } from '../vet-card/vet-card';
import { VeterinarioListInterface } from '../../interfaces';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-vet-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule, VetCard],
  templateUrl: './vet-list.html',
  styleUrl: './vet-list.scss'
})
export class VetList {
  @Input() veterinarios: VeterinarioListInterface[] = [];
  @Input() loading = false;
  @Input() emptyMessage = 'Nenhum Veterinário cadastrado';
  @Input() columns = 1;
  @Input() gap = 12;
  @Input() searchPlaceholder = 'Buscar Veterinário';

  @Output() searchChange = new EventEmitter<string>();
  @Output() viewVet  = new EventEmitter<VeterinarioListInterface>();
  @Output() editVet  = new EventEmitter<VeterinarioListInterface>();
  @Output() deleteVet= new EventEmitter<VeterinarioListInterface>();
  @Output() addVet   = new EventEmitter<void>();

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

  onViewVet(p: VeterinarioListInterface)   { this.viewVet.emit(p); }
  onEditVet(p: VeterinarioListInterface)   { this.editVet.emit(p); }
  onDeleteVet(p: VeterinarioListInterface) { this.deleteVet.emit(p); }
  onAddVet()                       { this.addVet.emit(); }

  getGridTemplate() { return `repeat(${Math.max(1, this.columns)}, minmax(0,1fr))`; }
  trackById = (index: number, p: VeterinarioListInterface) => (p as any).id ?? p.nome;
}
