import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { VetList } from '../../components/vet-list/vet-list';
import { UserInterface } from '../../interfaces';
import { VeterinarioService } from '../../services/veterinario-service';


@Component({
  selector: 'app-veterinarios',
  standalone: true,
  imports: [CommonModule, MatIconModule, VetList],
  templateUrl: './veterinarios.html',
  styleUrls: ['./veterinarios.scss'],
})
export class Veterinarios implements OnInit {

  listVets: Array<UserInterface> = [];

  constructor(
    private veterinarioService: VeterinarioService
  ) { }

  ngOnInit(): void {
    this.loadVets();
  }

  loadVets() {
    this.veterinarioService.getAllVets().subscribe({
      next: (res) => {
        this.listVets = [...res];
      },
      error: (err) => { console.error('Erro ao carregar veterinário:', err); }
    });
  }

}
