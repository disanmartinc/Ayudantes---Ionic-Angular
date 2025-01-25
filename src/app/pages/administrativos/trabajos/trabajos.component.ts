import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TrabajosService, Trabajo } from 'src/app/services/trabajos/trabajos.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-trabajos',
  templateUrl: './trabajos.component.html',
  styleUrls: ['./trabajos.component.scss'],
  standalone:true,
  imports:[IonicModule,CommonModule,RouterModule]

})
export class TrabajosComponent implements OnInit {
  pageTitle = 'Lista de trabajos';
  trabajos: Trabajo[] = []; // Arreglo para almacenar los trabajos

  constructor(private trabajosService: TrabajosService) {}

  ngOnInit() {
    this.cargarTrabajos();
  }

  cargarTrabajos() {
    this.trabajosService.obtenerTrabajos().subscribe(
      (data) => {
        this.trabajos = data; // Almacena los trabajos recibidos
        console.log('Trabajos cargados:', data);
      },
      (error) => {
        console.error('Error al obtener los trabajos:', error);
      }
    );
  }
}