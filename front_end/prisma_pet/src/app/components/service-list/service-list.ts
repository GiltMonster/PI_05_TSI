import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ServicosInterface } from '../../interfaces';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ServiceCard } from '../service-card/service-card';
import { UsuarioService } from '../../services/usuario-service';
import { ServicosService } from '../../services/servicos-service';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, ReactiveFormsModule, ServiceCard],
  templateUrl: './service-list.html',
  styleUrls: ['./service-list.scss'],
})
export class ServiceList implements OnInit {
  @Input() servicos: ServicosInterface[] = [];
  @Input() emptyMessage = 'Nenhum serviço cadastrado';

  searchValue = '';
  statusMsg = '';
  filteredServicos: ServicosInterface[] = [];
  typeUser = '';

  constructor(
    private servicoService: ServicosService,
    private usuarioService: UsuarioService) {}

  onSubmit(event: Event) {
    event.preventDefault();
    this.onSearch();
  }

  ngOnInit(): void {
    this.filteredServicos = this.servicos;
    this.userTypeVerification();
  }

  ngOnChanges(): void {
    this.filteredServicos = this.filterServicos();
  }

  userTypeVerification() {
    this.usuarioService.getUserType().subscribe({
      next: (res) => {
        this.typeUser = res.type;
      },
      error: (err) => {
        console.log('erro ao verificar tipo de usuário:', err);
      },
    });
  }

  clearSearch() {
    this.searchValue = '';
    this.filteredServicos = this.servicos;
  }

  onSearch() {
    this.filteredServicos = this.filterServicos();
  }

  onServicoDeleted(servicoId: number) {
    this.servicos = this.servicos.filter((servico) => servico.id !== servicoId);
    this.filteredServicos = this.filterServicos();
  }

  filterServicos(): ServicosInterface[] {
    if (!this.searchValue) {
      return this.servicos;
    }

    const searchTerm = this.searchValue.toLowerCase();

    return this.servicos.filter((servico) => {
      const precoStr = String(servico.preco);

      return (
        servico.nome.toLowerCase().includes(searchTerm) ||
        servico.categoria.toLowerCase().includes(searchTerm) ||
        precoStr.includes(searchTerm)
      );
    });
  }
}
