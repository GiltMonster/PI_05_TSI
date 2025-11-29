// src/app/components/modal-create-service/modal-create-service.ts
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicosInterface } from '../../interfaces';
import { Notification } from '../../services/notification';
import { Loading } from '../loading/loading';
import { ServicosService } from '../../services/servicos-service';

@Component({
  selector: 'app-modal-create-servico',
  standalone: true,
  imports: [CommonModule, FormsModule, Loading],
  templateUrl: './modal-create-servico.html',
  styleUrls: ['./modal-create-servico.scss'],
})
export class ModalCreateServico {
  @Output() close = new EventEmitter<void>();
  @Output() save  = new EventEmitter<ServicosInterface>();
  @ViewChild('modalTitle', { static: true }) modalTitle!: ElementRef<HTMLHeadingElement>;

  loading = false;

  createServico: ServicosInterface = {
    id: 0,
    nome: '',
    categoria: '',
    preco: 0,
  };

  categorias: string[] = [
  'Consulta',
  'Vacina',
  'Exame',
  'Cirurgia',
  'Medicamento',
  ].sort((a, b) => a.localeCompare(b, 'pt-BR')); // ordenar em ordem alfabética

  constructor(
    private servicosService: ServicosService,
    private notification: Notification,
  ) {}

  onSave() {
    if (!this.createServico.nome || !this.createServico.categoria) {
      this.notification.error('Preencha nome e categoria do serviço.');
      return;
    }

    this.loading = true;

    this.servicosService.createServico(this.createServico).subscribe({
      next: (res) => {
        this.notification.success('Serviço cadastrado com sucesso.');
        this.save.emit(res);
        this.loading = false;
        this.close.emit();
      },
      error: (err) => {
        console.error('Erro ao cadastrar serviço:', err);
        this.notification.error('Erro ao cadastrar serviço.');
        this.loading = false;
      },
    });
  }

  onCancel() {
    this.close.emit();
  }
}
