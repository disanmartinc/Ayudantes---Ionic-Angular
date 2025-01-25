import { Component, OnInit } from '@angular/core';
import { RegistrarTrabajoService,Trabajo } from 'src/app/services/registrartrabajo/registrartrabajo.service';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrartrabajo',
  templateUrl: './registrartrabajo.component.html',
  styleUrls: ['./registrartrabajo.component.scss'],
  standalone:true,
  imports: [FormsModule, IonicModule, CommonModule]
})
export class RegistrarTrabajoComponent {
  pageTitle = 'Home Administrativos';
  // Objeto enlazado al formulario
  nuevoTrabajo: Trabajo = {
    nombretrabajo: '',
    desctrabajo: '',
    ubicacion: '',
    id_creador: 0,
  };

  usuarios: any[] = []; // Almacena los usuarios tipo 2

  constructor(private registrarTrabajoService: RegistrarTrabajoService) {}

  ngOnInit() {
    this.cargarUsuariosTipo2();
  }

  cargarUsuariosTipo2() {
    this.registrarTrabajoService.obtenerUsuariosTipo2().subscribe(
      (data) => {
        this.usuarios = data; // Almacena los usuarios en la variable
      },
      (error) => {
        console.error('Error al obtener los usuarios tipo 2:', error);
      }
    );
  }

  registrar() {
    this.registrarTrabajoService.registrarTrabajo(this.nuevoTrabajo).subscribe(
      (response) => {
        console.log('Trabajo registrado con éxito:', response);
        // Aquí puedes agregar lógica para limpiar el formulario o mostrar un mensaje de éxito
        this.nuevoTrabajo = {
          nombretrabajo: '',
          desctrabajo: '',
          ubicacion: '',
          id_creador: 0,
        };
      },
      (error) => {
        console.error('Error al registrar trabajo:', error);
      }
    );
  }
}