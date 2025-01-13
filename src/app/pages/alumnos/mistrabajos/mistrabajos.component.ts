import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Para redirección
import { AuthService } from '../../../auth.service'; // Ajusta la ruta correctamente
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedMenuComponent } from '../../../shared-menu/shared-menu.component';

@Component({
  selector: 'app-mistrabajos',
  templateUrl: './mistrabajos.component.html',
  styleUrls: ['./mistrabajos.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, SharedMenuComponent],
})
export class MistrabajosComponent implements OnInit {
  pageTitle: string = 'Mis Trabajos';
  userRole: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Verifica el rol del usuario
    this.userRole = this.authService.getUserRole();

    if (this.userRole !== 'alumno') {
      console.error('Acceso denegado. Solo los alumnos pueden acceder a esta página.');
      this.router.navigate(['/login']);
    } else {
      console.log('Acceso permitido. Rol:', this.userRole);
    }
  }
}
