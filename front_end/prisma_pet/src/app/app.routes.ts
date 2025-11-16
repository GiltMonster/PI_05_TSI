import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./app').then(m => m.App) },
  { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.Login) },
  {
    path: 'vet',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/acesso-vet/acesso-vet').then(m => m.AcessoVet)
      },
      {
        path: 'pets',
        loadComponent: () => import('./pages/animais/animais').then(m => m.Animais)
      },
      {
        path: 'tutors',
        loadComponent: () => import('./pages/tutor/tutor').then(m => m.Tutor)
      },
      {
        path: 'services',
        loadComponent: () => import('./pages/servicos/servicos').then(m => m.Servicos)
      },
      {
        path: 'perfil',
        loadComponent: () => import('./pages/perfil/perfil').then(m => m.Perfil)
      },
      {
        path: 'ficha/{userId}',
        loadComponent: () => import('./pages/ficha-pet/ficha-pet').then(m => m.FichaPet)
      }
    ]
  },
  {
    path: 'user',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/acesso-tutor/acesso-tutor').then(m => m.AcessoTutor)
      },
      {
        path: 'pets',
        loadComponent: () => import('./pages/animais/animais').then(m => m.Animais)
      },
      {
        path: 'perfil',
        loadComponent: () => import('./pages/perfil/perfil').then(m => m.Perfil)
      }
    ]
  },
  {
    path: 'admin',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/acesso-admin/acesso-admin').then(m => m.AcessoAdmin)
      },
      {
        path: 'tutores',
        loadComponent: () => import('./pages/tutor/tutor').then(m => m.Tutor)
      },
      {
        path: 'pets',
        loadComponent: () => import('./pages/animais/animais').then(m => m.Animais)
      },
      {
        path: 'veterinarios',
        loadComponent: () => import('./pages/veterinarios/veterinarios').then(m => m.Veterinarios)
      },
      {
        path: 'services',
        loadComponent: () => import('./pages/servicos/servicos').then(m => m.Servicos)
      },
      {
        path: 'perfil',
        loadComponent: () => import('./pages/perfil/perfil').then(m => m.Perfil)
      },
      {
        path: 'ficha/:userId',
        loadComponent: () => import('./pages/ficha-pet/ficha-pet').then(m => m.FichaPet)
      }
    ]
  },
];
