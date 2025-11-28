import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ServicosInterface } from '../../interfaces';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ServiceCard } from '../service-card/service-card';
import { UsuarioService } from '../../services/usuario-service';
import { ServicosService } from '../../services/servicos-service';
import { ModalCreateServico } from '../modal-create-servico/modal-create-servico';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserTypeProviderService } from '../../shared/user-type-service';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, ReactiveFormsModule, ServiceCard, ModalCreateServico, MatPaginatorModule],
  templateUrl: './service-list.html',
  styleUrls: ['./service-list.scss'],
})
export class ServiceList implements OnInit {
  @Input() servicos: ServicosInterface[] = [];
  @Input() emptyMessage = 'Nenhum serviço cadastrado';
  @Output() servicoCreated = new EventEmitter<ServicosInterface>();

  pageSize = 5;
  pageIndex = 0;

  searchValue = '';
  statusMsg = '';
  filteredServicos: ServicosInterface[] = [];
  typeUser = '';
  createModalOpen = false;

  constructor(
    // private servicoService: ServicosService,
    // private usuarioService: UsuarioService,
    private userTypeService: UserTypeProviderService) {}

  onSubmit(event: Event) {
    event.preventDefault();
    this.onSearch();
  }

  ngOnInit(): void {
    this.filteredServicos = this.servicos;
      this.userTypeService.userType$.subscribe(type => {
      this.typeUser = type;
    });
    // this.userTypeVerification();
  }

  ngOnChanges(): void {
    this.filteredServicos = this.filterServicos();
  }

  // userTypeVerification() {
  //   this.usuarioService.getUserType().subscribe({
  //     next: (res) => {
  //       this.typeUser = res.type;
  //     },
  //     error: (err) => {
  //       console.log('erro ao verificar tipo de usuário:', err);
  //     },
  //   });
  // }

  clearSearch() {
    this.searchValue = '';
    this.filteredServicos = this.servicos;
  }

  onSearch() {
    this.filteredServicos = this.filterServicos();
    this.pageIndex = 0;
  }

  onServicoDeleted(servicoId: number) {
    this.servicos = this.servicos.filter((servico) => servico.id !== servicoId);
    this.filteredServicos = this.filterServicos();
    if (this.pageIndex > 0 && this.pagedServicos.length === 0) {
      this.pageIndex--;
    }
  }
  get pagedServicos(): ServicosInterface[] {
    const start = this.pageIndex * this.pageSize;
    return this.filteredServicos.slice(start, start + this.pageSize);
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
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

    openCreateModal() {
      this.createModalOpen = true;
    }

    closeCreateModal() {
      this.createModalOpen = false;
    }

    // handleServicoCreated(newServico: ServicosInterface) {
    //   this.servicos = [newServico, ...this.servicos];
    //   this.filteredServicos = this.filterServicos();
    //   this.statusMsg = 'Serviço cadastrado com sucesso.';
    //   this.createModalOpen = false;
    // }


  
    handleServicoCreated(newServico: ServicosInterface) {
      this.servicoCreated.emit(newServico);

      this.servicos = [newServico, ...this.servicos];
      this.filteredServicos = this.filterServicos();

      this.statusMsg = 'Serviço cadastrado com sucesso.';
      this.createModalOpen = false;
    }
}
