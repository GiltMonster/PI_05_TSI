import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServicosListInterface } from '../../interfaces';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ServiceCard } from '../service-card/service-card';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule, ServiceCard],
  templateUrl: './service-list.html',
  styleUrls: ['./service-list.scss']
})
export class ServiceList implements OnInit {
  @Input() servicos: ServicosListInterface[] = [];
  @Input() loading = false;
  @Input() emptyMessage = 'Nenhum serviço cadastrado';
  @Input() columns = 1;
  @Input() gap = 12;
  @Input() searchPlaceholder = 'Buscar Serviço';

  @Output() searchChange = new EventEmitter<string>();
  @Output() editServico  = new EventEmitter<ServicosListInterface>();
  @Output() deleteServico= new EventEmitter<ServicosListInterface>();
  @Output() addServico   = new EventEmitter<void>();

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

  onEditServico(p: ServicosListInterface)   { this.editServico.emit(p); }
  onDeleteServico(p: ServicosListInterface) { this.deleteServico.emit(p); }
  onAddServico()                       { this.addServico.emit(); }

  getGridTemplate() { return `repeat(${Math.max(1, this.columns)}, minmax(0,1fr))`; }
  trackById = (index: number, p: ServicosListInterface) => (p as any).id ?? p.titulo;
}
