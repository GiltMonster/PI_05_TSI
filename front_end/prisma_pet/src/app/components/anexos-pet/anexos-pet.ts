import { Component, Input, OnInit } from '@angular/core';

import { VacinasPet } from "../vacinas/vacinas-pet/vacinas-pet";
import { VacinasPetModal } from "../vacinas/vacinas-pet-modal/vacinas-pet-modal";
import { OutrosAnexosPet } from "../outros-anexos-pet/outros-anexos-pet";
import { ConsultasPet } from '../consultas/consultas-pet/consultas-pet';
import { PrescricaoPet } from '../prescricao/prescricao-pet/prescricao-pet';
import { PrescricaoPetModal } from '../prescricao/prescricao-pet-modal/prescricao-pet-modal';
import { PetPrescricao } from '../../interfaces';
import { PetConsulta, PetVacina } from '../../interfaces';
import { ConsultasPetModal } from '../consultas/consultas-pet-modal/consultas-pet-modal';
import { UsuarioService } from '../../services/usuario-service';

@Component({
  selector: 'app-anexos-pet',
  imports: [ConsultasPet, VacinasPet, OutrosAnexosPet, ConsultasPetModal, VacinasPetModal, PrescricaoPet, PrescricaoPetModal],
  templateUrl: './anexos-pet.html',
  styleUrl: './anexos-pet.scss',
  standalone: true,
})
export class AnexosPet implements OnInit {

  @Input() pet_consultas: Array<PetConsulta> = [];
  @Input() pet_vacinas: Array<PetVacina> = [];
  @Input() pet_anexos: Array<any> = [];
  @Input() pet_prescricoes: Array<PetPrescricao> = [];
  @Input() pet_id: number = 0;

  activeTab: string = 'consultas';

  createModalOpen = false;
  editModalOpen = false;
  createVacinaModalOpen = false;
  editVacinaModalOpen = false;
  createPrescricaoModalOpen = false;
  editPrescricaoModalOpen = false;

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

  // Vacinas
  openCreateVacinaModal() {
    this.createVacinaModalOpen = true;
  }

  closeCreateVacinaModal() {
    this.createVacinaModalOpen = false;
  }

  handleVacinaCreated(newVacina: PetVacina) {
    this.pet_vacinas = [...this.pet_vacinas, newVacina];
    this.closeCreateVacinaModal();
  }

  // Prescrições
  openCreatePrescricaoModal() {
    this.createPrescricaoModalOpen = true;
  }

  closeCreatePrescricaoModal() {
    this.createPrescricaoModalOpen = false;
  }

  handlePrescricaoCreated(newPrescricao: PetPrescricao) {
    this.pet_prescricoes = [...this.pet_prescricoes, newPrescricao];
    this.closeCreatePrescricaoModal();
  }

}
