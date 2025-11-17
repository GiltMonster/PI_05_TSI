import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AnimalList } from '../../components/animal-list/animal-list';
import { PetInterface } from '../../interfaces';
import { PetService } from '../../services/pet-service';

@Component({
  selector: 'app-animais',
  standalone: true,
  imports: [CommonModule, MatIconModule, AnimalList],
  templateUrl: './animais.html',
  styleUrls: ['./animais.scss'],
})
export class Animais implements OnInit{


    listPets: Array<PetInterface> = [];

    constructor(
      private petService: PetService
    ) { }

    ngOnInit(): void {
      this.loadPets();
    }

    loadPets() {
      this.petService.getAllPets().subscribe({
        next: (res) => {
          this.listPets = [...res];
        },
        error: (err) => { console.error('Erro ao carregar animais:', err); }
      });
    }
}
