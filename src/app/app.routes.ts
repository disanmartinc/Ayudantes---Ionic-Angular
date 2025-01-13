import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'home-alumnos',
    loadComponent: () => import('./pages/home-alumnos/home-alumnos.component').then(m => m.HomeAlumnosComponent),
  },
  {
    path: 'home-administrativos',
    loadComponent: () => import('./pages/home-administrativos/home-administrativos.component').then(m => m.HomeAdministrativosComponent),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
