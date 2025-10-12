import { Routes } from '@angular/router';
import { MeusAnimaisComponent } from './pages/meus-animais/meus-animais.component';
import { HomeComponent } from './pages/home/home.component';
import { MeusDadosComponent } from './pages/meus-dados/meus-dados.component';
import { CadastroPetComponent } from './pages/cadastro-pet/cadastro-pet.component';

export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'meus-animais', component: MeusAnimaisComponent },
  { path: 'meus-dados', component: MeusDadosComponent },
  { path: 'cadastro-pet', component: CadastroPetComponent },
  { path: 'editar-pet/:id', component: CadastroPetComponent },
];
