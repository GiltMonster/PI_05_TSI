import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AnimalList } from '../../components/animal-list/animal-list';
import { PetInterface } from '../../interfaces';
import { PetService } from '../../services/pet-service';
import { finalize, switchMap } from 'rxjs';
import { Loading } from '../../components/loading/loading';
import { UserTypeProviderService } from '../../shared/user-type-service';

@Component({
  selector: 'app-animais',
  standalone: true,
  imports: [CommonModule, MatIconModule, AnimalList, Loading],
  templateUrl: './animais.html',
  styleUrls: ['./animais.scss'],
})
export class Animais implements OnInit {
  listPets: Array<PetInterface> = [];
  loading = false;
  typeUser = '';

  constructor(
    private petService: PetService,
    private userTypeService: UserTypeProviderService
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.userTypeService.userType$.subscribe(type => {
      this.typeUser = type;
    });

    if(this.typeUser === 'admin' || this.typeUser === 'vet') {
      this.loadPets();
      return;
    } else {
      this.loadMyPets();
      return;
    }
  }

  loadPets() {
    this.loading = true;
    this.petService
      .getAllPets()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res) => {
          this.listPets = [...res];
        },
        error: (err) => {
          console.error('Erro ao carregar animais:', err);
        },
      });
  }

  loadMyPets() {
    this.loading = true;
    this.petService
      .getMyPets()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res) => {
          this.listPets = [...res];
        },
        error: (err) => {
          console.error('Erro ao carregar animais do responsável:', err);
        },
      });
  }

  // Resonsável por garantir que a lista de pets seja atualizada quando um novo pet for criado
    onPetCreated(pet: PetInterface) {
      this.listPets = [pet, ...this.listPets];
      this.loadPets();
    }
}
