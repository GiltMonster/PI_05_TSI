import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { AcessoVet } from './pages/acesso-vet/acesso-vet';
import { AcessoTutor } from './pages/acesso-tutor/acesso-tutor';
import { AcessoAdmin } from './pages/acesso-admin/acesso-admin';
import { Animais } from './pages/animais/animais';
import { Tutor } from './pages/tutor/tutor';
import { Servicos } from './pages/servicos/servicos';
import { Veterinarios } from './pages/veterinarios/veterinarios';



export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.Login) },
  { path: 'vet', loadComponent: () => import('./pages/acesso-vet/acesso-vet').then(m => m.AcessoVet) },
  { path: 'tutor', loadComponent: () => import('./pages/acesso-tutor/acesso-tutor').then(m => m.AcessoTutor) },
  { path: 'admin', loadComponent: () => import('./pages/acesso-admin/acesso-admin').then(m => m.AcessoAdmin) },
  { path: 'animais', loadComponent: () => import('./pages/animais/animais').then(m => m.Animais) },
  { path: 'responsaveis', loadComponent: () => import('./pages/tutor/tutor').then(m => m.Tutor) },
  { path: 'services', loadComponent: () => import('./pages/servicos/servicos').then(m => m.Servicos) },
  { path: 'veterinarios', loadComponent: () => import('./pages/veterinarios/veterinarios').then(m => m.Veterinarios) },
];
