import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AnimalList } from '../../components/animal-list/animal-list';
import { PetInterface } from '../../interfaces';
import { PetService } from '../../services/pet-service';
import { finalize, switchMap } from 'rxjs';
import { Loading } from '../../components/loading/loading';

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

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.loading = true;

    this.petService
      .getUserType()
      .pipe(
        switchMap((res) => {
          if (res.type === 'admin' || res.type === 'vet') {
            return this.petService.getAllPets(); // vê tudo
          }
          return this.petService.getMyPets(); // vê só os pets do tutor logado
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: (pets) => {
          this.listPets = [...pets];
        },
        error: (err) => {
          console.error('Erro ao carregar animais:', err);
        },
      });
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
          console.error('Erro ao carregar animais do tutor:', err);
        },
      });
  }
}
