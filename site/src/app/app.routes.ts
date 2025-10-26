import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'quem-somos', loadComponent: () => import('./pages/quem-somos/quem-somos.component').then(m => m.QuemSomosComponent) },
  { path: 'servicos', loadComponent: () => import('./pages/servicos/servicos.component').then(m => m.ServicosComponent) },
  { path: 'vantagens', loadComponent: () => import('./pages/vantagens/vantagens.component').then(m => m.VantagensComponent) },
  { path: 'equipe', loadComponent: () => import('./pages/equipe/equipe.component').then(m => m.EquipeComponent) },
  { path: 'especialidades', loadComponent: () => import('./pages/especialidades/especialidades.component').then(m => m.EspecialidadesComponent) },
  { path: 'trabalhe-conosco', loadComponent: () => import('./pages/trabalhe-conosco/trabalhe-conosco.component').then(m => m.TrabalheConoscoComponent) }
];

