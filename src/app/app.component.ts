import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MenuAlumnosComponent } from './components/menu-alumnos/menu-alumnos.component';
import { FooterAlumnosComponent } from './components/footer-alumnos/footer-alumnos.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    MenuAlumnosComponent,
    FooterAlumnosComponent,
  ],
})
export class AppComponent {
  constructor(public router: Router) {}
}
