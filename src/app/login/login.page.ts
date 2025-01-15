import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa el servicio Router
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class LoginPage implements OnInit {
  constructor(private router: Router) {} // Inyecta el Router

  ngOnInit() {}

  // Método para navegar a la página 'inicio'
  navigateToInicio() {
    this.router.navigate(['/inicio']);
  }

  // Método para navegar a la página 'registro'
  navigateToRegistro() {
    this.router.navigate(['/registro']);
  }
}
