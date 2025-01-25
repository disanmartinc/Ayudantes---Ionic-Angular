import { Component, OnInit } from '@angular/core';
import { RegistrarTrabajoService,Trabajo } from 'src/app/services/registrartrabajo/registrartrabajo.service';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-registrartrabajo',
  templateUrl: './registrartrabajo.component.html',
  styleUrls: ['./registrartrabajo.component.scss'],
  standalone:true,
  imports: [FormsModule, IonicModule]
})
export class RegistrarTrabajoComponent {
  // Objeto enlazado al formulario
  nuevoTrabajo: Trabajo = {
    nombretrabajo: '',
    desctrabajo: '',
    ubicacion: '',
    id_creador: 0,
  };

  constructor(private registrarTrabajoService: RegistrarTrabajoService) {}

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