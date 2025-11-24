import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingCardComponent } from '../../shared/pricing-card/pricing-card.component';

@Component({
  selector: 'app-planos',
  standalone: true,
  imports: [CommonModule, PricingCardComponent],
  templateUrl: './planos.component.html',
  styleUrl: './planos.component.scss'
})
export class PlanosComponent implements OnInit {
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  basicFeatures = [
    'Até 5 usuários administradores/veterinários',
    'Perfil detalhado do paciente',
    'Informações do Responsável',
    'Atendimento do Paciente',
    'Cadastro completo de animais - 100 CADASTROS',
    'Indexação de exames - 5 POR MÊS'
  ];

  proFeatures = [
    'Acesso ilimitado de Usuários com diferentes permissões',
    'Perfil detalhado do paciente',
    'Informações do Responsável',
    'Atendimento do Paciente',
    'Cadastro completo de animais - ilimitado',
    'Indexação de exames - ilimitado',
    'Protocolo de Vacina',
    'Cadastro de Serviços'
  ];
}
