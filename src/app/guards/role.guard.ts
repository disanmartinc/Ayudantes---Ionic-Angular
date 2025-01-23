import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // Obtén el usuario almacenado en localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    // Obtén el rol esperado de los datos de la ruta
    const expectedRole = route.data['role'];

    // Verifica si el usuario tiene el rol necesario
    if (user && user.tipousuario_id_tipo === expectedRole) {
      return true; // Permite el acceso si el rol coincide
    } else {
      // Redirige al login si el rol no coincide
      this.router.navigate(['/login']);
      return false;
    }
  }
}
