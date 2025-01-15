import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Para redirección
import { AuthService } from '../../../auth.service'; // Ajusta la ruta correctamente
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuAlumnosComponent } from '../../../components/menu-alumnos/menu-alumnos.component';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-mistrabajos',
  templateUrl: './mistrabajos.component.html',
  styleUrls: ['./mistrabajos.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, MenuAlumnosComponent],
})
export class MistrabajosComponent implements OnInit {
  pageTitle: string = 'Mis Trabajos';
  constructor(private menuCtrl: MenuController) {}

  ngOnInit() {
    this.menuCtrl.enable(true, 'main-menu')};
  ionViewWillLeave() {
    this.menuCtrl.enable(false, 'main-menu'); // Deshabilita el menú al salir
  };
}
