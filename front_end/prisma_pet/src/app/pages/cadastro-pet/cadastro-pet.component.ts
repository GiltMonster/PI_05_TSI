import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

export interface PetData {
  id?: number;
  nome: string;
  especie: string;
  raca: string;
  idade: string;
  sinPatinnha: string;
  cor: string;
  pelagem: string;
  sexo: string;
  microchip: string;
  tutor: string;
  observacoes: string;
}

@Component({
  selector: 'app-cadastro-pet',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-pet.component.html',
  styleUrl: './cadastro-pet.component.scss'
})
export class CadastroPetComponent {
  @Input() petData: PetData | null = null;
  @Output() petSaved = new EventEmitter<PetData>();
  @Output() cancelled = new EventEmitter<void>();

  pet: PetData = {
    nome: '',
    especie: 'cachorro',
    raca: '',
    idade: '',
    sinPatinnha: '',
    cor: '',
    pelagem: '',
    sexo: '',
    microchip: '',
    tutor: '',
    observacoes: ''
  };

  especies = [
    { value: 'cachorro', label: 'Cachorro' },
    { value: 'gato', label: 'Gato' },
    { value: 'outros', label: 'Outros' }
  ];

  sexos = [
    { value: 'macho', label: 'Macho' },
    { value: 'femea', label: 'Fêmea' }
  ];

  constructor(private router: Router) {
    if (this.petData) {
      this.pet = { ...this.petData };
    }
  }

  onSave(): void {
    if (this.isFormValid()) {
      this.petSaved.emit(this.pet);
      this.router.navigate(['/meus-animais']);
    }
  }

  onCancel(): void {
    this.cancelled.emit();
    this.router.navigate(['/meus-animais']);
  }

  isFormValid(): boolean {
    return !!(this.pet.nome && this.pet.sexo);
  }

  getSpeciesIcon(): string {
    return this.pet.especie === 'gato' ? '/icon_cat.png' : '/icon_dog.png';
  }

  onSpeciesChange(): void {
  }

  getSwitchButtonClass(especie: string): string {
    return this.pet.especie === especie ? 'active' : '';
  }

  getSwitchButtonStyle(especie: string): any {
    if (this.pet.especie === especie) {
      return {
        'background-color': especie === 'gato' ? '#F4864D' : '#537FC0',
        'color': 'white',
        'box-shadow': especie === 'gato' 
          ? '0 2px 4px rgba(244, 134, 77, 0.3)' 
          : '0 2px 4px rgba(83, 127, 192, 0.3)'
      };
    }
    return {};
  }
}
