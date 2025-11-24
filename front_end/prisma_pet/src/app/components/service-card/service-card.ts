import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServicosInterface } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ServicosService } from '../../services/servicos-service';
import { Notification } from '../../services/notification';
import { ModalDelete } from '../modal-delete/modal-delete';
import { ModalEditServicos } from '../modal-edit-servicos/modal-edit-servicos';
import { Loading } from '../loading/loading';

@Component({
  selector: 'app-service-card',
  imports: [CommonModule, MatIconModule, ModalDelete, ModalEditServicos, Loading],
  standalone: true,
  templateUrl: './service-card.html',
  styleUrls: ['./service-card.scss'],
})
export class ServiceCard implements OnInit {
  @Input() servicoCard!: ServicosInterface;
  @Input() typeUser: string = '';
  @Output() servicoDeleted = new EventEmitter<number>();
  @Output() edit = new EventEmitter<ServicosInterface>();

  editModalOpen = false;
  deleteModalOpen = false;
  servicoToEdit?: ServicosInterface;
  servicoToDelete: ServicosInterface | null = null;
  loading = false;

  constructor(private servicoService: ServicosService, private notification: Notification) {}

  ngOnInit(): void {
    this.typeUser;
  }

  findUserById(id: number) {}

  deleteServico(servicoId: number) {
    this.loading = true;
    this.servicoService.deleteAccountServico(servicoId).subscribe({
      next: (res) => {
        console.log(res);
        this.servicoDeleted.emit(servicoId);
        this.notification.success('Serviço excluído com sucesso');
        this.loading = false;
      },
      error: (err) => {
        console.log('Erro ao deletar serviço:', err);
        this.notification.error('Erro ao deletar serviço');
        this.loading = false;
      },
    });
  }

  openDeleteModal(servico: ServicosInterface) {
    this.servicoToDelete = servico;
    this.deleteModalOpen = true;
  }

  closeDeleteModal() {
    this.deleteModalOpen = false;
    this.servicoToDelete = null;
  }

  handleConfirmDelete() {
    if (!this.servicoToDelete) return;

    this.deleteServico(this.servicoToDelete.id);
    this.closeDeleteModal();
  }

  editServico(servicoId: number) {
    this.edit.emit(this.servicoCard);
  }

  openEditModal(servico: ServicosInterface) {
    this.servicoToEdit = { ...servico };
    this.editModalOpen = true;
  }

  closeEditModal() {
    this.editModalOpen = false;
    this.servicoToEdit = undefined;
  }

  saveServico(editedServico: ServicosInterface) {

    
    if (this.typeUser !== 'admin') {
      this.notification.error('Você não tem permissão para editar serviços.');
      this.closeEditModal();
      return;
    }

    editedServico.id = this.servicoCard.id;
    editedServico.type = editedServico.type || 'servico';
    this.loading = true;

    this.servicoService.updateServico(editedServico).subscribe({
      next: (res) => {
        this.servicoCard = { ...this.servicoCard, ...editedServico };

        this.edit.emit(this.servicoCard);

        this.notification.success('Dados do serviço atualizados com sucesso');
        this.closeEditModal();
        this.loading = false;
      },
      error: (err) => {
        console.log('Erro ao atualizar serviço:', err);
        this.notification.error('Erro ao atualizar serviço');
        this.loading = false;
      },
    });
    this.closeEditModal();
  }
}
