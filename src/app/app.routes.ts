import { Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'home-alumnos',
    canActivate: [AuthGuard, RoleGuard], // Protegemos con ambos guards
    data: { role: 1 }, // Solo accesible para usuarios tipo 1 (Alumno)
    loadComponent: () =>
      import('./pages/home-alumnos/home-alumnos.component').then(
        (m) => m.HomeAlumnosComponent
      ),
  },
  {
    path: 'home-administrativos',
    canActivate: [AuthGuard, RoleGuard], // Protegemos con ambos guards
    data: { role: 2 }, // Solo accesible para usuarios tipo 2 (Administrador)
    loadComponent: () =>
      import('./pages/home-administrativos/home-administrativos.component').then(
        (m) => m.HomeAdministrativosComponent
      ),
  },
  {
    path: 'alumnos/mistrabajos',
    canActivate: [AuthGuard, RoleGuard], // Protegemos con ambos guards
    data: { role: 1 }, // Solo accesible para usuarios tipo 1 (Alumno)
    loadComponent: () =>
      import('./pages/alumnos/mistrabajos/mistrabajos.component').then(
        (m) => m.MistrabajosComponent
      ),
  },

  {
    path: 'trabajos',
    canActivate: [AuthGuard, RoleGuard], // Protegemos con ambos guards
    data: { role: 2 }, // Solo accesible para usuarios tipo 2 (Administrador)
    loadComponent: () =>
      import('./pages/administrativos/trabajos/trabajos.component').then(
        (m) => m.TrabajosComponent
      ),
  },

  {
    path: 'registrartrabajo',
    canActivate: [AuthGuard, RoleGuard], // Protegemos con ambos guards
    data: { role: 2 }, // Solo accesible para usuarios tipo 2 (Administrador)
    loadComponent: () =>
      import('./pages/administrativos/registrartrabajo/registrartrabajo.component').then(
        (m) => m.RegistrarTrabajoComponent
      ),
  },

  {
    path: 'perfil',
    loadComponent: () => import('./pages/alumnos/perfil/perfil.component').then(m => m.PerfilComponent),
  },
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.component').then(m => m.RegistroComponent),
  },
  

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
