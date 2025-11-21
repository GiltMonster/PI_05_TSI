import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TutorCard } from '../tutor-card/tutor-card';
import { UserInterface } from '../../interfaces';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario-service';
import { ModalCreate } from '../modal-create/modal-create';

@Component({
  selector: 'app-tutor-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, TutorCard, FormsModule, ModalCreate],
  templateUrl: './tutor-list.html',
  styleUrls: ['./tutor-list.scss']
})
export class TutorList implements OnInit {
  @Input() tutores: UserInterface[] = [];
  @Input() emptyMessage = 'Nenhum Responsável cadastrado';

  searchValue = "";
  statusMsg = '';
  filteredTutores: UserInterface[] = [];
  typeUser = '';
  createModalOpen = false;

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.filteredTutores = this.tutores;
    this.userTypeVerification();
  }

  ngOnChanges(): void {
    this.filteredTutores = this.filterTutors();

  }

  userTypeVerification() {
    this.usuarioService.getUserType().subscribe({
      next: (res) => {
        this.typeUser = res.type;
      },
      error: (err) => {
        console.log("erro ao verificar tipo de usuário:", err);
      }
    });
  }

  clearSearch() {
    this.searchValue = "";
    this.filteredTutores = this.tutores;
  }

  onSearch() {
    this.filteredTutores = this.filterTutors();
  }

  onTutorDeleted(tutorId: number) {
    this.tutores = this.tutores.filter(tutor => tutor.id !== tutorId);
    this.filteredTutores = this.filterTutors();
  }

  filterTutors(): UserInterface[] {
    if (!this.searchValue) {
      return this.tutores;
    }

    const searchTerm = this.searchValue.toLowerCase();
    return this.tutores.filter(tutor =>
      tutor.name.toLowerCase().includes(searchTerm) ||
      tutor.email.toLowerCase().includes(searchTerm) ||
      (tutor.phone && tutor.phone.toLowerCase().includes(searchTerm))
    );
  }

  openCreateModal() {
    this.createModalOpen = true;
  }

  closeCreateModal() {
    this.createModalOpen = false;
  }

  handleTutorCreated(newTutor: UserInterface) {
    this.tutores = [newTutor, ...this.tutores];
    this.filteredTutores = this.filterTutors();
    this.statusMsg = 'Responsável cadastrado com sucesso.';
    this.createModalOpen = false;
  }
}
