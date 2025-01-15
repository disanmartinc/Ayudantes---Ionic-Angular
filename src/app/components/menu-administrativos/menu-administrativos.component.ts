import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-administrativos',
  templateUrl: './menu-administrativos.component.html',
  styleUrls: ['./menu-administrativos.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
  ],
})
export class MenuAdministrativosComponent {
  pageTitle: string = 'Menú Administrativo';
  menuItems = [
    { title: 'Dashboard', icon: 'grid', route: '/dashboard' },
    { title: 'Gestionar Usuarios', icon: 'people', route: '/gestionar-usuarios' },
    { title: 'Configuración', icon: 'settings', route: '/configuracion' },
    { title: 'Cerrar Sesión', icon: 'log-out', action: 'logout' },
  ];

  constructor(private router: Router) {}

  handleMenuAction(item: any) {
    if (item.action === 'logout') {
      console.log('Cerrando sesión...');
      this.router.navigate(['/login']);
    }
  }
}
