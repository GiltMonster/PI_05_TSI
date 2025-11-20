import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { VetList } from '../../components/vet-list/vet-list';
import { UserInterface } from '../../interfaces';
import { VeterinarioService } from '../../services/veterinario-service';
import { Loading } from '../../components/loading/loading';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-veterinarios',
  standalone: true,
  imports: [CommonModule, MatIconModule, VetList, Loading],
  templateUrl: './veterinarios.html',
  styleUrls: ['./veterinarios.scss'],
})
export class Veterinarios implements OnInit {

  listVets: Array<UserInterface> = [];
  loading = false;

  constructor(
    private veterinarioService: VeterinarioService
  ) { }

  ngOnInit(): void {
    this.loadVets();
  }

  loadVets() {
    this.loading = true;
    this.veterinarioService.getAllVets().pipe(finalize(() => this.loading = false)).subscribe({
      next: (res) => {
        this.listVets = [...res];
      },
      error: (err) => { console.error('Erro ao carregar veterinário:', err); }
    });
  }

}
