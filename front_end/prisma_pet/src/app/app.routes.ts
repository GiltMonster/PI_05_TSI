import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { MenuLeft } from './components/menu-left/menu-left';
import { Header } from './components/header/header';
import { Card } from './components/card/card';
import { AcessoVet } from './pages/acesso-vet/acesso-vet';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'vet', component: AcessoVet },
  // { path: 'tutor', component: AcessoTutor },
  // { path: 'admin', component: AcessoAdmin },
];
