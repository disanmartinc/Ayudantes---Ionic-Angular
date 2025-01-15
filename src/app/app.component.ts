import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MenuAlumnosComponent } from './components/menu-alumnos/menu-alumnos.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    MenuAlumnosComponent, // Asegúrate de importar aquí el componente del menú
  ],
})
export class AppComponent {}
