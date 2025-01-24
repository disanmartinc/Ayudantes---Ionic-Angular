import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
})
export class MenuComponent implements OnInit {
  menuItems: { label: string; path: string }[] = [];
  userRole: number | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    this.userRole = user?.tipousuario_id_tipo || null;

    this.loadMenuItems();
  }

  loadMenuItems() {
    if (this.userRole === 1) {
      this.menuItems = [
        { label: 'Home', path: '/home-alumnos' },
        { label: 'Historial', path: '/alumnos/mistrabajos' },
        { label: 'Perfil', path: '/perfil' },
      ];
    } else if (this.userRole === 2) {
      this.menuItems = [
        { label: 'Home', path: '/home-administrativos' },
        { label: 'Trabajos', path: '/trabajos' },
        { label: 'Registrar', path: '/registro' },
      ];
    } else {
      this.menuItems = []; // Si no hay rol, no se muestran opciones
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}