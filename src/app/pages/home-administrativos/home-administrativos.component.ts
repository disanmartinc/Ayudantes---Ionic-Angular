import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SharedMenuComponent } from '../../shared-menu/shared-menu.component';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-home-administrativos',
  templateUrl: './home-administrativos.component.html',
  styleUrls: ['./home-administrativos.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, SharedMenuComponent],
})
export class HomeAdministrativosComponent implements OnInit {
  pageTitle: string = 'Home Administrativos';
  userRole: 'alumno' | 'administrativo' | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Obtén el rol del usuario desde el servicio de autenticación
    this.userRole = this.authService.getUserRole();
    console.log('Rol del usuario:', this.userRole);
  }
}
