import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-footer-alumnos',
  templateUrl: './footer-alumnos.component.html',
  styleUrls: ['./footer-alumnos.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    
  ]
})
export class FooterAlumnosComponent {
  constructor(private router: Router) {}

  onWorkClick() {
    console.log('Trabajando');
    this.router.navigate(['/trabajando']); // Cambia la ruta según tu estructura
  }

  onProfileClick() {
    console.log('Perfil');
    this.router.navigate(['/perfil']); // Cambia la ruta según tu estructura
  }

  navigateToPerfil() {
    this.router.navigate(['/perfil']);
  }
}
