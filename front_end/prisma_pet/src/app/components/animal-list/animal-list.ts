import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { AnimalCard } from '../animal-card/animal-card';
import { PetInterface } from '../../interfaces';
import { PetService } from '../../services/pet-service';

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule, AnimalCard, FormsModule],
  templateUrl: './animal-list.html',
  styleUrls: ['./animal-list.scss'],
})
export class AnimalList implements OnInit {
  @Input() pets: PetInterface[] = [];
  @Input() emptyMessage = 'Nenhum animal cadastrado';

  searchValue = '';
  statusMsg = '';
  filteredPets: PetInterface[] = [];
  typeUser = '';

  constructor(private petService: PetService) {}

  onSubmit(event: Event) {
    event.preventDefault();
    this.onSearch();
  }

  ngOnInit(): void {
    this.filteredPets = this.pets;
    this.userTypeVerification();
  }

  ngOnChanges(): void {
    this.filteredPets = this.filterPets();
  }

  userTypeVerification() {
    this.petService.getUserType().subscribe({
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
    this.filteredPets = this.pets;
  }

  onSearch() {
    this.filteredPets = this.filterPets();
  }

  onPetDeleted(petId: number) {
    this.pets = this.pets.filter((pet) => pet.id !== petId);
    this.filteredPets = this.filterPets();
  }

  onTutorLoad(event: { id: number; tutorName: string }) {
  this.pets = this.pets.map(pet =>
    pet.id === event.id ? { ...pet, tutorName: event.tutorName } : pet
  );
  this.filteredPets = this.filterPets();
}

  filterPets(): PetInterface[] {
    if (!this.searchValue) {
      return this.pets;
    }

  const searchTerm = this.searchValue.toLowerCase();

  return this.pets.filter((pet) => {
    const sexoTexto   = pet.sexo === true ? 'macho' : 'femea';
    const tutorTexto  = (pet.tutorName ?? '').toLowerCase();

    return (
      pet.nome.toLowerCase().includes(searchTerm) ||
      tutorTexto.includes(searchTerm) ||
      sexoTexto.includes(searchTerm)
    );
  });
}
}



