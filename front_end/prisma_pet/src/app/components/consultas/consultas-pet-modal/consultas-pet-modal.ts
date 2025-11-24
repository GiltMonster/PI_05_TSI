import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PetConsulta, ServicosInterface, UserInterface } from '../../../interfaces';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario-service';
import { ServicosService } from '../../../services/servicos-service';
import { Notification } from '../../../services/notification';
import { CurrencyPipe } from '@angular/common';
import { FichaPetService } from '../../../services/ficha-pet-service';

@Component({
  selector: 'app-consultas-pet-modal',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './consultas-pet-modal.html',
  styleUrl: './consultas-pet-modal.scss',
})
export class ConsultasPetModal implements OnInit {

  @Input() editMode = false;
  @Input() pet_id: number = 0;
  @Input() consultaToEdit: PetConsulta = {} as PetConsulta;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<PetConsulta>();

  consulta: PetConsulta = {
    servico_id: 0,
  } as PetConsulta;
  createModalOpen = false;

  userOperator: UserInterface = {} as UserInterface;
  servicosList: Array<ServicosInterface> = [];

  constructor(
    private fichaService: FichaPetService,
    private usuarioService: UsuarioService,
    private servicosService: ServicosService,
    private notification: Notification
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getServicosList();

    if (this.editMode && this.consultaToEdit) {
      this.consulta = { ...this.consultaToEdit };
    }

  }

  onSave() {

    this.consulta = {
      servico_id: this.consulta.servico_id,
      pet_id: this.pet_id,
      vet_id: this.userOperator.id,
      nome_vet: this.userOperator.name,
      nome_servico: this.servicosList.find(s => s.id === Number(this.consulta.servico_id))?.nome || '', data_consulta: this.consulta.data_consulta,
      anamnese: this.consulta.anamnese,
      id: this.consulta.id || 0,
    }

    if (!this.editMode) {
    this.fichaService.cadastrarConsulta(this.consulta).subscribe({
        next: (res) => {
          this.notification.success('Consulta cadastrada com sucesso!');
          console.log(res);
          this.save.emit(this.consulta);
        },
        error: (err) => {
          this.notification.error('Erro ao cadastrar consulta.');
          console.log('erro ao cadastrar consulta:', err);
          this.close.emit();
        }
      });
    } else {

      this.fichaService.editarConsulta(this.consulta).subscribe({
        next: (res) => {
          this.notification.success('Consulta editada com sucesso!');
          console.log(res);
          this.save.emit(this.consulta);
        },
        error: (err) => {
          this.notification.error('Erro ao editar consulta.');
          console.log('erro ao editar consulta:', err);
          this.close.emit();
        }
      });
    }

  }

  onCancel() {
    this.close.emit();
  }

  getCurrentUser() {
    this.usuarioService.getUserData().subscribe({
      next: (res) => {
        this.userOperator = res;
        console.log(this.userOperator);
        console.log(`Pet ID recebido: ${this.pet_id}`);

      },
      error: (err) => {
        console.log('erro ao obter dados do usuário:', err);
      }
    });
  }

  getServicosList() {
    this.servicosService.getAllServicos().subscribe({
      next: (res) => {
        this.servicosList = res;
        console.log(this.servicosList);
        console.log(`Pet ID recebido: ${this.pet_id}`);

      },
      error: (err) => {
        console.log('erro ao obter lista de serviços:', err);
        this.notification.error('Erro ao obter lista de serviços');
      }
    });
  }

}
