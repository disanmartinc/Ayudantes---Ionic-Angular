import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu-alumnos',
  templateUrl: './menu-alumnos.component.html',
  styleUrls: ['./menu-alumnos.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
  ],
})
export class MenuAlumnosComponent {
  // Define los elementos del menú
  menuItems = [
    { title: 'Inicio', icon: 'home', route: '/home-alumnos' },
    { title: 'Historial', icon: 'list', route: '/alumnos/mistrabajos' },
    { title: 'Configuración', icon: 'settings', route: '/configuracion' },
    { title: 'Cerrar Sesión', icon: 'log-out', action: 'logout' }
  ];

  constructor(private router: Router) {}

  handleMenuAction(item: any) {
    if (item.action === 'logout') {
      console.log('Cerrando sesión...');
      this.router.navigate(['/login']); // Redirige al login
    } else if (item.route) {
      console.log(`Redirigiendo a ${item.route}...`);
      this.router.navigate([item.route]); // Navega a la ruta definida
    }
  }
}

