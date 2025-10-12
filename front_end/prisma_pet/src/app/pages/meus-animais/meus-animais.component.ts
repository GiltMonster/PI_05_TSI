import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PetListComponent } from '../../shared/pet-list/pet-list.component';
import { Pet } from '../../shared/pet-card/pet-card.component';

@Component({
  selector: 'app-meus-animais',
  standalone: true,
  imports: [CommonModule, PetListComponent],
  templateUrl: './meus-animais.component.html',
  styleUrl: './meus-animais.component.scss'
})
export class MeusAnimaisComponent {
  constructor(private router: Router) {}

  pets: Pet[] = [
    {
      id: 1,
      nome: 'Luma',
      especie: 'Cachorro',
      raca: 'Golden Retriever',
      idade: 2,
      sexo: 'F',
      peso: 25,
      castrado: true,
      temperamento: 'Brincalhão',
      cor_pelagem: 'Dourado',
      caso_clinico: 'Pet saudável, sem problemas',
      tutor_nome: 'Luciene Marques',
      avatar: ''
    },
    {
      id: 2,
      nome: 'Tereza',
      especie: 'Gato',
      raca: 'Siamês',
      idade: 3,
      sexo: 'F',
      peso: 4,
      castrado: true,
      temperamento: 'Calmo',
      cor_pelagem: 'Branco e cinza',
      caso_clinico: 'Pet saudável, sem problemas',
      tutor_nome: 'Pedro Angelo',
      avatar: ''
    }
  ];

  loading = false;

  onEditPet(pet: Pet): void {
    console.log('Editar pet:', pet);
    this.router.navigate(['/editar-pet', pet.id]);
  }

  onDeletePet(pet: Pet): void {
    console.log('Excluir pet:', pet);
    if (confirm(`Tem certeza que deseja excluir ${pet.nome}?`)) {
      this.pets = this.pets.filter(p => p.id !== pet.id);
    }
  }

  onViewPet(pet: Pet): void {
    console.log('Visualizar pet:', pet);
  }

  onAddPet(): void {
    console.log('Adicionar novo pet');
    this.router.navigate(['/cadastro-pet']);
  }
}
