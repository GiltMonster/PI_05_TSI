import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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
export class CadastroPetComponent implements OnInit {
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

  isEditMode: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const petId = params['id'];
      if (petId) {
        this.isEditMode = true;
        this.loadPetData(parseInt(petId));
      }
    });
  }

  loadPetData(petId: number): void {
    const pets = this.getPetsFromStorage();
    const pet = pets.find(p => p.id === petId);
    if (pet) {
      this.pet = {
        id: pet.id,
        nome: pet.nome || '',
        especie: pet.especie.toLowerCase() || 'cachorro',
        raca: pet.raca || '',
        idade: pet.idade ? pet.idade.toString() : '',
        sinPatinnha: '',
        cor: '',
        pelagem: pet.cor_pelagem || '',
        sexo: pet.sexo === 'F' ? 'femea' : 'macho',
        microchip: '',
        tutor: pet.tutor_nome || '',
        observacoes: pet.caso_clinico || ''
      };
    }
  }

  getPetsFromStorage(): any[] {
    const petsData = localStorage.getItem('pets');
    return petsData ? JSON.parse(petsData) : [];
  }

  setPetsInStorage(pets: any[]): void {
    localStorage.setItem('pets', JSON.stringify(pets));
  }

  onSave(): void {
    if (this.isFormValid()) {
      const pets = this.getPetsFromStorage();
      if (this.isEditMode && this.pet.id) {
        const index = pets.findIndex(p => p.id === this.pet.id);
        if (index !== -1) {
          pets[index] = { ...pets[index], ...this.pet };
        }
      } else {
        const newId = Math.max(...pets.map(p => p.id), 0) + 1;
        pets.push({ ...this.pet, id: newId });
      }
      this.setPetsInStorage(pets);
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
    return this.pet.especie === 'gato' ? '/icon_cat.svg' : '/icon_dog.svg';
  }

  onSpeciesChange(): void {
  }

  getSwitchButtonClass(especie: string): string {
    return this.pet.especie === especie ? 'active' : '';
  }

  getSwitchButtonStyle(especie: string): any {
    if (this.pet.especie === especie) {
      return {
        'background-color': especie === 'gato' ? '#FF914D' : '#004AAD',
        'color': 'white',
        'box-shadow': especie === 'gato' 
          ? '0 2px 4px rgba(255, 145, 77, 0.3)' 
          : '0 2px 4px rgba(0, 74, 173, 0.3)'
      };
    }
    return {};
  }
}
