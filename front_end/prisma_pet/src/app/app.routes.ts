import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { AcessoVet } from './pages/acesso-vet/acesso-vet';
import { AcessoTutor } from './pages/acesso-tutor/acesso-tutor';
import { AcessoAdmin } from './pages/acesso-admin/acesso-admin';
import { Animais } from './pages/animais/animais';
import { Tutor } from './pages/tutor/tutor';



export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'vet', component: AcessoVet },
  { path: 'tutor', component: AcessoTutor },
  { path: 'admin', component: AcessoAdmin },
  { path: 'animais', component: Animais },
  { path: 'responsaveis', component: Tutor },
];
