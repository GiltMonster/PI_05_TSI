import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServicosInterface } from '../../interfaces';
import { ServicosService } from '../../services/servicos-service';
import { Notification } from '../../services/notification';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-edit-servicos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './modal-edit-servicos.html',
  styleUrl: './modal-edit-servicos.scss',
})
export class ModalEditServicos implements OnChanges {
  @Input() servico!: ServicosInterface;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<ServicosInterface>();
  @ViewChild('modalTitle', { static: true }) modalTitle!: ElementRef<HTMLHeadingElement>;

  editedServico: ServicosInterface = {} as ServicosInterface;
  class_is_required = '';
  class_group_full_option = '';

  categorias: string[] = [
  'Consulta',
  'Vacina',
  'Exame',
  'Cirurgia',
  'Medicamento',
  ].sort((a, b) => a.localeCompare(b, 'pt-BR')); // ordenar em ordem alfabética


  constructor(private servicoService: ServicosService, private notification: Notification) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['servico'] && this.servico) {
      this.editedServico = { ...this.servico };
    }
  }

  onSave() {
    this.save.emit(this.editedServico);
    this.servicoService.updateServico(this.editedServico).subscribe({
      next: (res) => {
        console.log('Serviço atualizado com sucesso', res);
        this.notification.success('Serviço atualizado com sucesso.');
      },
      error: (err) => {
        console.log('Erro ao atualizar serviço', err);
        this.notification.error('Erro ao atualizar serviço');
      },
    });
    this.close.emit();
  }

  onCancel() {
    this.close.emit();
  }
}
