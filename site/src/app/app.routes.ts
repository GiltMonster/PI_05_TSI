import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'quem-somos', loadComponent: () => import('./pages/quem-somos/quem-somos.component').then(m => m.QuemSomosComponent) },
  { path: 'prismapet', loadComponent: () => import('./pages/prismapet/prismapet.component').then(m => m.PrismapetComponent) },
  { path: 'planos', loadComponent: () => import('./pages/planos/planos.component').then(m => m.PlanosComponent) },
  { path: 'contato', loadComponent: () => import('./pages/contato/contato.component').then(m => m.ContatoComponent) }
];

