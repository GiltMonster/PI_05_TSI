import { Component, OnInit } from '@angular/core';
import { ServicosInterface } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ServiceList } from '../../components/service-list/service-list';
import { ServicosService } from '../../services/servicos-service';
import { finalize } from 'rxjs/internal/operators/finalize';
import { Loading } from '../../components/loading/loading';

@Component({
  selector: 'app-servicos',
  standalone: true,
  imports: [CommonModule, MatIconModule, ServiceList, Loading],
  templateUrl: './servicos.html',
  styleUrls: ['./servicos.scss'],
})
export class Servicos implements OnInit {
  listServicos: Array<ServicosInterface> = [];
  loading = false;

  constructor(private servicosService: ServicosService) {}

  ngOnInit(): void {
    this.loadServicos();
  }

  loadServicos() {
    this.loading = true;
    this.servicosService.getAllServicos().pipe(finalize(() => this.loading = false)).subscribe({
      next: (res) => {
        this.listServicos = [...res];
      },
      error: (err) => {
        console.error('Erro ao carregar serviços:', err);
      },
    });
  }

    onServicoCreated(newServico: ServicosInterface) {
      this.listServicos = [newServico, ...this.listServicos];
      this.loadServicos();
    }
}
