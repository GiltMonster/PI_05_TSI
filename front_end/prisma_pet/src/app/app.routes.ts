import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { MenuLeft } from './components/menu-left/menu-left';
import { Header } from './components/header/header';
import { Card } from './components/card/card';
import { AcessoVet } from './pages/acesso-vet/acesso-vet';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'admin', component: MenuLeft },
  { path: 'header', component: Header },
  { path: 'card', component: Card },
  { path: 'vet', component: AcessoVet },
];
