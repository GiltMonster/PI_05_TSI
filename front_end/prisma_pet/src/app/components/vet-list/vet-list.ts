import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { VetCard } from '../vet-card/vet-card';
import { UserInterface } from '../../interfaces';
import { UsuarioService } from '../../services/usuario-service';
import { ModalCreate } from '../modal-create/modal-create';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserTypeProviderService } from '../../shared/user-type-service';

@Component({
  selector: 'app-vet-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, ReactiveFormsModule, VetCard, ModalCreate, MatPaginatorModule],
  templateUrl: './vet-list.html',
  styleUrl: './vet-list.scss'
})
export class VetList implements OnInit {
  @Input() vets: UserInterface[] = [];
  @Input() emptyMessage = 'Nenhum veterinário cadastrado';

  pageSize = 5;
  pageIndex = 0;

  searchValue = '';
  statusMsg = '';
  filteredVets: UserInterface[] = [];
  typeUser = '';
  createModalOpen = false;

  constructor(
    // private usuarioService: UsuarioService
        private userTypeService: UserTypeProviderService
  ) { }

  ngOnInit(): void {
    this.filteredVets = this.vets;
    // this.userTypeVerification();
        this.userTypeService.userType$.subscribe(type => {
      this.typeUser = type;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vets']) {
      this.filteredVets = this.filterVets();
    }
  }

  // userTypeVerification() {
  //   this.usuarioService.getUserType().subscribe({
  //     next: (res) => {
  //       this.typeUser = res.type;
  //     },
  //     error: (err) => {
  //       console.log('erro ao verificar tipo de usuário:', err);
  //     }
  //   });
  // }

  clearSearch() {
    this.searchValue = '';
    this.filteredVets = this.vets;
  }

  onSearch() {
    this.filteredVets = this.filterVets();
    this.pageIndex = 0;
  }

  onVetDeleted(vetId: number) {
    this.vets = this.vets.filter(vet => vet.id !== vetId);
    this.filteredVets = this.filterVets();
    if (this.pageIndex > 0 && this.pagedVets.length === 0) {
      this.pageIndex--;
    }
  }
  get pagedVets(): UserInterface[] {
    const start = this.pageIndex * this.pageSize;
    return this.filteredVets.slice(start, start + this.pageSize);
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  filterVets(): UserInterface[] {
    if (!this.searchValue) {
      return this.vets;
    }

    const searchTerm = this.searchValue.toLowerCase();

    return this.vets.filter(vet =>
      vet.name.toLowerCase().includes(searchTerm) ||
      vet.crmv?.toLowerCase().includes(searchTerm) ||
      vet.especialidade_vet?.toLowerCase().includes(searchTerm)
    );
  }

  openCreateModal() {
    this.createModalOpen = true;
  }

  closeCreateModal() {
    this.createModalOpen = false;
  }


  handleVetCreated(newVet: UserInterface) {
    this.vets = [newVet, ...this.vets];
    this.filteredVets = this.filterVets();
    this.statusMsg = 'Veterinário cadastrado com sucesso.';
    this.createModalOpen = false;
  }
}
