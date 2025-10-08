import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { MenuLeft } from './components/menu-left/menu-left';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'admin', component: MenuLeft }
];
