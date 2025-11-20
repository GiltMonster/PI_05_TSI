import { Component, OnInit } from '@angular/core';
import { ServicosInterface } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ServiceList } from '../../components/service-list/service-list';
import { ServicosService } from '../../services/servicos-service';

@Component({
  selector: 'app-servicos',
  standalone: true,
  imports: [CommonModule, MatIconModule, ServiceList],
  templateUrl: './servicos.html',
  styleUrls: ['./servicos.scss'],
})
export class Servicos implements OnInit {
  listServicos: Array<ServicosInterface> = [];

  constructor(private servicosService: ServicosService) {}

  ngOnInit(): void {
    this.loadServicos();
  }

  loadServicos() {
    this.servicosService.getAllServicos().subscribe({
      next: (res) => {
        this.listServicos = [...res];
      },
      error: (err) => {
        console.error('Erro ao carregar serviços:', err);
      },
    });
  }
}
