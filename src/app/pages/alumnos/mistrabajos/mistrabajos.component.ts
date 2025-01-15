import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Para redirección
import { AuthService } from '../../../auth.service'; // Ajusta la ruta correctamente
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuAlumnosComponent } from '../../../components/menu-alumnos/menu-alumnos.component';
import { MenuController } from '@ionic/angular';
import { TrabajosService } from '../../../services/trabajos.service';


@Component({
  selector: 'app-mistrabajos',
  templateUrl: './mistrabajos.component.html',
  styleUrls: ['./mistrabajos.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, MenuAlumnosComponent],
})
export class MistrabajosComponent implements OnInit {
  trabajos: any[] = [];
  pageTitle: string = 'Mis Trabajos';
  constructor(private menuCtrl: MenuController,private trabajosService: TrabajosService) {}

  ngOnInit() {
    // Habilita el menú al entrar a esta página
    this.menuCtrl.enable(true, 'main-menu');

    // Suscríbete al observable del servicio para obtener la lista de trabajos
    this.trabajosService.trabajos$.subscribe((data) => {
      this.trabajos = data; // Asigna la lista al componente
    });
  }
  ionViewWillLeave() {
    this.menuCtrl.enable(false, 'main-menu'); // Deshabilita el menú al salir
  };
}
