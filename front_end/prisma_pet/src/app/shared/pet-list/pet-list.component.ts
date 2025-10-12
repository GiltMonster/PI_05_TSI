import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetCardComponent, Pet } from '../pet-card/pet-card.component';

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [CommonModule, PetCardComponent],
  templateUrl: './pet-list.component.html',
  styleUrl: './pet-list.component.scss'
})
export class PetListComponent {
  @Input() pets: Pet[] = [];
  @Input() loading: boolean = false;
  @Input() emptyMessage: string = 'Nenhum pet cadastrado';
  @Input() showActions: boolean = true;
  @Input() columns: number = 2;
  
  @Output() editPet = new EventEmitter<Pet>();
  @Output() deletePet = new EventEmitter<Pet>();
  @Output() viewPet = new EventEmitter<Pet>();
  @Output() addPet = new EventEmitter<void>();

  onEditPet(pet: Pet): void {
    this.editPet.emit(pet);
  }

  onDeletePet(pet: Pet): void {
    this.deletePet.emit(pet);
  }

  onViewPet(pet: Pet): void {
    this.viewPet.emit(pet);
  }

  onAddPet(): void {
    this.addPet.emit();
  }

  getGridColumns(): string {
    return `repeat(${this.columns}, 1fr)`;
  }

  trackByPetId(index: number, pet: Pet): number {
    return pet.id;
  }
}
