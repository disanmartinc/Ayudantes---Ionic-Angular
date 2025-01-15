import { Component, OnInit, ChangeDetectorRef,ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router'; // Para redirección
import { AuthService } from '../../../auth.service'; // Ajusta la ruta correctamente
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { TrabajosService } from '../../../services/trabajos.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-mistrabajos',
  templateUrl: './mistrabajos.component.html',
  styleUrls: ['./mistrabajos.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule,FormsModule,],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MistrabajosComponent implements OnInit {
  trabajos: any[] = [];
  pageTitle: string = 'Mis Trabajos';
  filteredTrabajos: any[] = []; // Lista filtrada para mostrar en la vista
  searchTerm: string = ''; // Término de búsqueda
  constructor(private menuCtrl: MenuController,private trabajosService: TrabajosService,private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Habilita el menú al entrar a esta página
    this.menuCtrl.enable(true, 'main-menu');

    // Suscríbete al observable del servicio para obtener la lista de trabajos
    this.trabajosService.trabajos$.subscribe((data) => {
      this.trabajos = data; // Asigna la lista al componente
    });
    this.filterTrabajos(); // Filtra la lista inicialmente
  }
  ionViewWillLeave() {
    this.menuCtrl.enable(false, 'main-menu'); // Deshabilita el menú al salir
  };
  filterTrabajos() {
    const term = this.searchTerm.toLowerCase(); // Convierte el término de búsqueda a minúsculas
    this.filteredTrabajos = this.trabajos.filter((trabajo) =>
      trabajo.name.toLowerCase().includes(term) // Filtra por el campo `name`
    );
  
    // Depuración
    console.log('Término de búsqueda:', term);
    console.log('Trabajos originales:', this.trabajos);
    console.log('Trabajos filtrados:', this.filteredTrabajos);
  }
}
