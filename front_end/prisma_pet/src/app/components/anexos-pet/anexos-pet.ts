import { Component, Input, OnInit } from '@angular/core';

import { VacinasPet } from "../vacinas/vacinas-pet/vacinas-pet";
import { OutrosAnexosPet } from "../outros-anexos-pet/outros-anexos-pet";
import { ConsultasPet } from '../consultas/consultas-pet/consultas-pet';
import { PetConsulta, PetVacina } from '../../interfaces';
import { ConsultasPetModal } from '../consultas/consultas-pet-modal/consultas-pet-modal';
import { UsuarioService } from '../../services/usuario-service';

@Component({
  selector: 'app-anexos-pet',
  imports: [ConsultasPet, VacinasPet, OutrosAnexosPet, ConsultasPetModal],
  templateUrl: './anexos-pet.html',
  styleUrl: './anexos-pet.scss',
  standalone: true,
})
export class AnexosPet implements OnInit {

  @Input() pet_consultas: Array<PetConsulta> = [];
  @Input() pet_vacinas: Array<PetVacina> = [];
  @Input() pet_anexos: Array<any> = [];
  @Input() pet_id: number = 0;

  activeTab: string = 'consultas';

  createModalOpen = false;
  editModalOpen = false;

  userType: string = '';

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.usuarioService.getUserType().subscribe({
      next: (res) => {
        this.userType = res.type;
      },
      error: (err) => {
        console.log('erro ao verificar tipo de usuário:', err);
      }
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  openCreateModal() {
    this.createModalOpen = true;
  }

  closeCreateModal() {
    this.createModalOpen = false;
  }

  handleConsultaCreated(newConsulta: PetConsulta) {
    this.pet_consultas = [...this.pet_consultas, newConsulta];
    this.closeCreateModal();
  }

}
