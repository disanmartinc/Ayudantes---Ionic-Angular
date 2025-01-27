import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home-alumnos',
  templateUrl: './home-alumnos.component.html',
  styleUrls: ['./home-alumnos.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule,RouterModule],
})
export class HomeAlumnosComponent implements OnInit{
  pageTitle = 'Home Alumnos';
  isModalOpen = false;
  trabajos: any[] = []; // Lista de trabajos disponibles
  trabajoActivo: any = null; // Trabajo actualmente activo
  tiempoInicio: number = 0; // Timestamp de inicio del trabajo
  constructor (private http: HttpClient, private alertController: AlertController) {}
  ngOnInit(){
    this.obtenerTrabajosDisponibles();
  }
// Abrir el modal
openModal() {
  this.isModalOpen = true;
}

// Cerrar el modal
closeModal() {
  this.isModalOpen = false;
}

// Obtener trabajos disponibles del backend
obtenerTrabajosDisponibles() {
  this.http.get('http://localhost:3000/trabajos-disponibles').subscribe(
    (data: any) => {
      this.trabajos = data;
    },
    (error) => {
      console.error('Error al obtener trabajos:', error);
    }
  );
}

startTrabajo(trabajo: any) {
  console.log('Objeto trabajo recibido:', trabajo); // Verifica el objeto

  const userData = localStorage.getItem('user');
  if (!userData) {
    console.error('No se encontró el objeto "user" en localStorage');
    return;
  }

  const parsedUser = JSON.parse(userData);
  const usuarioId = parsedUser.id_user;

  if (!usuarioId) {
    console.error('No se encontró "id_user" en el objeto "user" del localStorage');
    return;
  }

  this.http.post('http://localhost:3000/usuario-trabajo', {
    usuarioId,
    trabajoId: trabajo.idtrabajo,
    accion: 'iniciar',
  }).subscribe(
    async () => {
      this.trabajoActivo = trabajo;
      this.tiempoInicio = Date.now(); // Guardar el tiempo actual
      this.isModalOpen = false;
      const alert = await this.alertController.create({
        header: 'Trabajo Iniciado',
        message: `Has iniciado el trabajo: ${trabajo.nombretrabajo}`,
        buttons: ['OK'],
      });
      await alert.present();
    },
    (error) => {
      console.error('Error al iniciar el trabajo:', error);
    }
  );
}



// Detener un trabajo activo
stopTrabajo() {
  const userData = localStorage.getItem('user');
  if (!userData) {
    console.error('No se encontró el objeto "user" en localStorage');
    return;
  }

  const parsedUser = JSON.parse(userData);
  const usuarioId = parsedUser.id_user;

  if (!usuarioId) {
    console.error('No se encontró "id_user" en el objeto "user" del localStorage');
    return;
  }

  if (!this.trabajoActivo) {
    console.error('No hay trabajo activo para detener.');
    return;
  }

  console.log('Datos enviados al servidor:', {
    usuarioId,
    trabajoId: this.trabajoActivo.idtrabajo,
    accion: 'detener',
  });

  this.http.post('http://localhost:3000/usuario-trabajo', {
    usuarioId,
    trabajoId: this.trabajoActivo.idtrabajo,
    accion: 'detener',
  }).subscribe(
    async () => {
      this.trabajoActivo = null; // Resetear el trabajo activo
      this.tiempoInicio = 0;
      const alert = await this.alertController.create({
        header: 'Trabajo Detenido',
        message: 'El trabajo ha sido detenido correctamente.',
        buttons: ['OK'],
      });
      await alert.present();
    },
    (error) => {
      console.error('Error al detener el trabajo:', error);
    }
  );
}


}
