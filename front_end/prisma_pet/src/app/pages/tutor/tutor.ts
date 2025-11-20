import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UserInterface } from '../../interfaces';
import { VeterinarioService } from '../../services/veterinario-service';
import { TutorList } from '../../components/tutor-list/tutor-list';
import { Loading } from '../../components/loading/loading';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-tutor',
  standalone: true,
  imports: [CommonModule, MatIconModule, TutorList, Loading],
  templateUrl: './tutor.html',
  styleUrls: ['./tutor.scss'],
})
export class Tutor implements OnInit {

  listTutores: Array<UserInterface> = [];
  loading = false;

  constructor(
    private veterinarioService: VeterinarioService,
  ) { }

  ngOnInit(): void {
    this.loadTutores();
  }

  loadTutores() {
    this.loading = true;
    this.veterinarioService.getAllTutors().pipe(finalize(() => this.loading = false)).subscribe({
      next: (res) => {
        this.listTutores = [...res];
      },
      error: (err) => { console.error('Erro ao carregar tutores:', err); }
    });
  }
}
