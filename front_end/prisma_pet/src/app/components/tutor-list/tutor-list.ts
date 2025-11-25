import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TutorCard } from '../tutor-card/tutor-card';
import { UserInterface } from '../../interfaces';
import { FormsModule } from '@angular/forms';
import { ModalCreate } from '../modal-create/modal-create';
import { MatPaginator } from '@angular/material/paginator';
import { UserTypeProviderService } from '../../shared/user-type-service';

@Component({
  selector: 'app-tutor-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, TutorCard, FormsModule, ModalCreate, MatPaginator],
  templateUrl: './tutor-list.html',
  styleUrls: ['./tutor-list.scss'],
})
export class TutorList implements OnInit {
  @Input() tutores: UserInterface[] = [];
  @Input() emptyMessage = 'Nenhum Responsável cadastrado';
  @Output() tutorCreated = new EventEmitter<UserInterface>();

  searchValue = '';
  statusMsg = '';
  filteredTutores: UserInterface[] = [];
  typeUser = '';
  createModalOpen = false;

  pageSize = 5;
  pageIndex = 0;

  constructor(
    // private usuarioService: UsuarioService,
    private userTypeService: UserTypeProviderService
  ) {}

  ngOnInit(): void {
    this.filteredTutores = this.tutores;
    this.userTypeService.userType$.subscribe((type) => {
      this.typeUser = type;
    });
    // this.userTypeVerification();
  }

  get pagedTutores(): UserInterface[] {
    const start = this.pageIndex * this.pageSize;
    return this.filteredTutores.slice(start, start + this.pageSize);
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  ngOnChanges(): void {
    this.filteredTutores = this.filterTutors();
  }

  // userTypeVerification() {
  //   this.usuarioService.getUserType().subscribe({
  //     next: (res) => {
  //       this.typeUser = res.type;
  //     },
  //     error: (err) => {
  //       console.log("erro ao verificar tipo de usuário:", err);
  //     }
  //   });
  // }

  clearSearch() {
    this.searchValue = '';
    this.filteredTutores = this.tutores;
  }

  onSearch() {
    this.filteredTutores = this.filterTutors();
    this.pageIndex = 0;
  }

  onTutorDeleted(tutorId: number) {
    this.tutores = this.tutores.filter((tutor) => tutor.id !== tutorId);
    this.filteredTutores = this.filterTutors();
    if (this.pageIndex > 0 && this.pagedTutores.length === 0) {
      this.pageIndex--;
    }
  }

  filterTutors(): UserInterface[] {
    if (!this.searchValue) {
      return this.tutores;
    }

    const searchTerm = this.searchValue.toLowerCase();
    return this.tutores.filter(
      (tutor) =>
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

  // handleTutorCreated(newTutor: UserInterface) {
  //   this.tutores = [newTutor, ...this.tutores];
  //   this.filteredTutores = this.filterTutors();
  //   this.statusMsg = 'Responsável cadastrado com sucesso.';
  //   this.createModalOpen = false;
  // }

  //Responsável por emitir o evento de criação de tutor para o componente pai (tutor.ts)
  handleTutorCreated(newTutor: UserInterface) {
    this.tutorCreated.emit(newTutor);

    this.tutores = [newTutor, ...this.tutores];
    this.filteredTutores = this.filterTutors();

    this.statusMsg = 'Responsável cadastrado com sucesso.';
    this.createModalOpen = false;
  }
}
