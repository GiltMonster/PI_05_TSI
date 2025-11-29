import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-delete.html',
  styleUrls: ['./modal-delete.scss'],
})
export class ModalDelete {
  @Input() title: string = 'Confirmar exclusão';
  @Input() message: string = 'Tem certeza que deseja excluir este registro?';
  @Input() confirmLabel: string = 'Excluir';
  @Input() cancelLabel: string = 'Cancelar';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @ViewChild('modalTitle', { static: true }) modalTitle!: ElementRef<HTMLHeadingElement>;

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
