import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AnimalList } from '../../components/animal-list/animal-list';
import { PetInterface } from '../../interfaces';
import { PetService } from '../../services/pet-service';
import { finalize } from 'rxjs';
import { Loading } from '../../components/loading/loading';

@Component({
  selector: 'app-animais',
  standalone: true,
  imports: [CommonModule, MatIconModule, AnimalList, Loading],
  templateUrl: './animais.html',
  styleUrls: ['./animais.scss'],
})
export class Animais implements OnInit{


    listPets: Array<PetInterface> = [];
    loading = false;

    constructor(
      private petService: PetService
    ) { }

    ngOnInit(): void {
      this.loadPets();
    }

    loadPets() {
      this.loading = true;
      this.petService.getAllPets().pipe(finalize(() => this.loading = false)).subscribe({
        next: (res) => {
          this.listPets = [...res];
        },
        error: (err) => { console.error('Erro ao carregar animais:', err); }
      });
    }
}
