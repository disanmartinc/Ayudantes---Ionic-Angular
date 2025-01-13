import { Component, Input, OnChanges } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shared-menu',
  templateUrl: './shared-menu.component.html',
  styleUrls: ['./shared-menu.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class SharedMenuComponent implements OnChanges {
  @Input() userRole: 'alumno' | 'administrativo' = 'alumno'; // Rol del usuario
  menuOptions: Array<{ label: string; icon: string; action: string }> = []; // Opciones de menú
  constructor(private router: Router) {}
  ngOnChanges() {
    this.updateMenuOptions();
  }

  private updateMenuOptions() {
    console.log('Generando opciones para el rol:', this.userRole);

    if (this.userRole === 'alumno') {
      this.menuOptions = [
        { label: 'Inicio', icon: 'home-outline', action: 'goHome' },
        { label: 'Mis Trabajos', icon: 'folder-outline', action: 'viewWorks' },
        { label: 'Configuración', icon: 'settings-outline', action: 'settings' },
        { label: 'Cerrar Sesión', icon: 'log-out-outline', action: 'logout' },
      ];
    } else if (this.userRole === 'administrativo') {
      this.menuOptions = [
        { label: 'Inicio', icon: 'home-outline', action: 'goHome' },
        { label: 'Gestión de Trabajos', icon: 'construct-outline', action: 'manageWorks' },
        { label: 'Reportes', icon: 'analytics-outline', action: 'viewReports' },
        { label: 'Configuración', icon: 'settings-outline', action: 'settings' },
        { label: 'Cerrar Sesión', icon: 'log-out-outline', action: 'logout' },
      ];
    } else {
      this.menuOptions = [];
    }
  }

  handleAction(action: string) {
    console.log(`Acción seleccionada: ${action}`);
    // Manejar las acciones aquí
    
    switch (action) {
      case 'goHome':
        // Redirigir al inicio (puedes personalizar según el rol)
        console.log('Redirigiendo al Inicio...');
        break;
      case 'logout':
        // Acción de logout
        console.log('Cerrando sesión...');
        this.router.navigate(['/login']); // Redirige al login
        break;
      default:
        console.log('Acción no reconocida.');
    }

  }
}
