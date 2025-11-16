import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { VetCard } from '../vet-card/vet-card';
import { UserInterface } from '../../interfaces';
import { UsuarioService } from '../../services/usuario-service';

@Component({
  selector: 'app-vet-list',
  standalone: true,
  imports: [CommonModule,FormsModule, MatIconModule, ReactiveFormsModule, VetCard],
  templateUrl: './vet-list.html',
  styleUrl: './vet-list.scss'
})
export class VetList implements OnInit {
  @Input() vets: UserInterface[] = [];
  @Input() emptyMessage = 'Nenhum veterinário cadastrado';

  searchValue = '';
  statusMsg = '';
  filteredVets: UserInterface[] = [];
  typeUser = '';

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.filteredVets = this.vets;
    this.userTypeVerification();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vets']) {
      this.filteredVets = this.filterVets();
    }
  }

  userTypeVerification() {
    this.usuarioService.getUserType().subscribe({
      next: (res) => {
        this.typeUser = res.type;
      },
      error: (err) => {
        console.log('erro ao verificar tipo de usuário:', err);
      }
    });
  }

  clearSearch() {
    this.searchValue = '';
    this.filteredVets = this.vets;
  }

  onSearch() {
    this.filteredVets = this.filterVets();
  }

  onVetDeleted(vetId: number) {
    this.vets = this.vets.filter(vet => vet.id !== vetId);
    this.filteredVets = this.filterVets();
  }

  filterVets(): UserInterface[] {
    if (!this.searchValue) {
      return this.vets;
    }

    const searchTerm = this.searchValue.toLowerCase();

    return this.vets.filter(vet =>
      vet.name.toLowerCase().includes(searchTerm) ||
      vet.crmv?.toLowerCase().includes(searchTerm) ||
      vet.especialidade?.toLowerCase().includes(searchTerm)
    );
  }
}
