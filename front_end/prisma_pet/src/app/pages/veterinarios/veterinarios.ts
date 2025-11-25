import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { VetList } from '../../components/vet-list/vet-list';
import { UserInterface } from '../../interfaces';
import { VeterinarioService } from '../../services/veterinario-service';
import { Loading } from '../../components/loading/loading';
import { finalize } from 'rxjs';
import { UserTypeProviderService } from '../../shared/user-type-service';


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
  typeUser = '';

  constructor(
    private veterinarioService: VeterinarioService,
    private userTypeService: UserTypeProviderService
  ) { }

  ngOnInit(): void {
    // this.loadVets();
    this.loading = true;

    this.userTypeService.userType$.subscribe(type => {
      this.typeUser = type;
    });

    if(this.typeUser === 'admin' || this.typeUser === 'vet') {
      this.loadVets();
      return;
    }
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

    onVetCreated(newTutor: UserInterface) {
    this.listVets = [newTutor, ...this.listVets];
    this.loadVets();
  }
}
