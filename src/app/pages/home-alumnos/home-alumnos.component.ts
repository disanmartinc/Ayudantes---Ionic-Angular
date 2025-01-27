import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Trabajo, TrabajosService } from 'src/app/services/trabajos/trabajos.service';

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
  trabajosRealizados: any[] = []; // Aquí se guardarán los trabajos realizados

  constructor (private http: HttpClient, private alertController: AlertController,private trabajosService: TrabajosService) {}
  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (!userData) {
      console.error('No se encontró el objeto "user" en localStorage');
      return;
    }

    const parsedUser = JSON.parse(userData);
    const usuarioId = parsedUser.id_user; // Obtén el ID del usuario logueado desde localStorage

    this.obtenerTrabajosRealizados(usuarioId); // Llama al método para obtener trabajos realizados
    this.obtenerTrabajosDisponibles();
  }

// Obtener trabajos realizados filtrados por usuario
obtenerTrabajosRealizados(usuarioId: number) {
  this.trabajosService.obtenerTrabajosRealizados(usuarioId).subscribe(
    (data) => {
      // Formatear los datos obtenidos
      this.trabajosRealizados = data.map((trabajo) => {
        const inicio = new Date(trabajo.fechainicio);
        const fin = new Date(trabajo.fechatermino);
        const horasTrabajadas = this.calcularHorasTrabajadas(inicio, fin);

        return {
          nombretrabajo: trabajo.nombretrabajo || 'Trabajo sin nombre',
          fechainicio: inicio.toLocaleDateString(), // Formatear la fecha de inicio
          horasTrabajadas: horasTrabajadas, // Calcular horas trabajadas
        };
      });
      console.log('Trabajos realizados (formateados):', this.trabajosRealizados);
    },
    (error) => {
      console.error('Error al obtener trabajos realizados:', error);
    }
  );
}
// Calcular horas
calcularHorasTrabajadas(inicio: Date, fin: Date): number {
  const diferenciaEnMilisegundos = fin.getTime() - inicio.getTime();
  const diferenciaEnHoras = diferenciaEnMilisegundos / (1000 * 60 * 60);
  return Math.ceil(diferenciaEnHoras); // Redondear hacia arriba si hay fracciones de hora
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
