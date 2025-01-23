import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Verifica si hay un usuario autenticado en el localStorage
    const user = localStorage.getItem('user');
    if (user) {
      return true; // Permite el acceso
    } else {
      // Redirige al login si no está autenticado
      this.router.navigate(['/login']);
      return false;
    }
  }
}
