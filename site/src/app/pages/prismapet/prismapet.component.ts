import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceCardComponent } from '../../shared/service-card/service-card.component';
import { FeatureCardComponent } from '../../shared/feature-card/feature-card.component';
import { PricingCardComponent } from '../../shared/pricing-card/pricing-card.component';

@Component({
  selector: 'app-prismapet',
  standalone: true,
  imports: [CommonModule, ServiceCardComponent, FeatureCardComponent, PricingCardComponent],
  templateUrl: './prismapet.component.html',
  styleUrl: './prismapet.component.scss'
})
export class PrismapetComponent implements OnInit {
  activeTab: string = 'animal';

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  basicFeatures = [
    'Até 1 Usuário',
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

  openPrismapet(): void {
    // Redirecionar para o PrismaPet
    window.open('/prismapet', '_blank');
  }
}
