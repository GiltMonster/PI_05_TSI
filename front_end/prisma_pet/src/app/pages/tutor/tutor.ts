import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PetInterface, UserInterface } from '../../interfaces';
import { VeterinarioService } from '../../services/veterinario-service';
import { TutorList } from '../../components/tutor-list/tutor-list';
import { PetService } from '../../services/pet-service';

@Component({
  selector: 'app-tutor',
  standalone: true,
  imports: [CommonModule, MatIconModule, TutorList],
  templateUrl: './tutor.html',
  styleUrls: ['./tutor.scss'],
})
export class Tutor implements OnInit {

  listTutores: Array<UserInterface> = [];

  constructor(
    private veterinarioService: VeterinarioService,
  ) { }

  ngOnInit(): void {
    this.loadTutores();
  }

  loadTutores() {
    this.veterinarioService.getAllTutors().subscribe({
      next: (res) => {
        this.listTutores = [...res];
      },
      error: (err) => { console.error('Erro ao carregar tutores:', err); }
    });
  }
}
