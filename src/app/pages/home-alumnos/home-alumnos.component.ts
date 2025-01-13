import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
// import { SharedMenuComponent } from '../../shared-menu/shared-menu.component';
import { AuthService } from '../../auth.service'; // Asegúrate de ajustar la ruta al servicio de autenticación
import { SharedMenuComponent } from '../../shared-menu/shared-menu.component';

@Component({
  selector: 'app-home-alumnos',
  templateUrl: './home-alumnos.component.html',
  styleUrls: ['./home-alumnos.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule,SharedMenuComponent],
})
export class HomeAlumnosComponent implements OnInit {
  pageTitle: string = 'Home Alumnos';  // Define la propiedad pageTitle
  
  workHistory = [
    {
      name: 'Biblioteca',
      date: '2025-01-10',
      startTime: '10:00',
      hours: 2,
      description: 'Este trabajo consistió en apoyar en la biblioteca.',
    },
    {
      name: 'Punto estudiantil',
      date: '2025-01-11',
      startTime: '12:00',
      hours: 3,
      description: 'Atención en el punto estudiantil.',
    },
  ];

  currentWork: any = null; // Trabajo actual
  isModalOpen = false; // Control de la ventana modal
  selectedWork: any = null; // Trabajo seleccionado en el historial
  timer: any = null; // Temporizador para contar el tiempo
  elapsedTime = 0; // Tiempo transcurrido en segundos
  userRole: 'alumno' | 'administrativo' | null = null; // Rol del usuario

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Obtén el rol del usuario desde el servicio de autenticación
    this.userRole = this.authService.getUserRole();
    console.log('Rol del usuario:', this.userRole);

    // Opcional: Puedes realizar diferentes acciones dependiendo del rol
    if (this.userRole === 'alumno') {
      console.log('Configuración específica para alumnos.');
    } else if (this.userRole === 'administrativo') {
      console.log('Rol incorrecto: redirigiendo o mostrando error.');
    }
  }

  // Calcula el valor monetario basado en las horas trabajadas
  calculateValue(hours: number): number {
    return hours * 2100; // Multiplica las horas por 2100
  }

  // Inicia un trabajo tras escanear el QR
  scanQR() {
    if (this.currentWork) {
      console.log('Ya tienes un trabajo en curso.');
      return;
    }

    this.currentWork = {
      name: 'Trabajo Escaneado',
      startTime: new Date(),
      description: 'Trabajo iniciado tras escanear el QR.',
    };

    // Reinicia el tiempo transcurrido y comienza el temporizador
    this.elapsedTime = 0;
    this.startTimer();

    console.log('Trabajo iniciado:', this.currentWork);
  }

  // Detiene el trabajo actual y lo guarda en el historial
  stopWork() {
    if (!this.currentWork) {
      console.log('No hay un trabajo activo para detener.');
      return;
    }

    // Calcula las horas trabajadas
    const hoursWorked = this.elapsedTime / 3600; // Convierte segundos a horas

    // Agrega el trabajo al historial
    this.workHistory.push({
      name: this.currentWork.name,
      date: this.currentWork.startTime.toISOString().split('T')[0], // Fecha en formato YYYY-MM-DD
      startTime: this.currentWork.startTime.toISOString().split('T')[1].slice(0, 5), // Hora en formato HH:mm
      hours: parseFloat(hoursWorked.toFixed(2)), // Redondea las horas trabajadas a 2 decimales
      description: this.currentWork.description,
    });

    console.log('Trabajo detenido:', this.currentWork);

    // Limpia el trabajo actual y detiene el temporizador
    this.currentWork = null;
    clearInterval(this.timer);
  }

  // Inicia el temporizador para contar el tiempo transcurrido
  startTimer() {
    this.timer = setInterval(() => {
      this.elapsedTime++;
    }, 1000); // Incrementa cada segundo
  }

  // Formatea el tiempo transcurrido en HH:MM:SS
  formatElapsedTime(): string {
    const hours = Math.floor(this.elapsedTime / 3600);
    const minutes = Math.floor((this.elapsedTime % 3600) / 60);
    const seconds = this.elapsedTime % 60;

    return `${this.padNumber(hours)}:${this.padNumber(minutes)}:${this.padNumber(seconds)}`;
  }

  // Añade un cero a la izquierda si el número es menor a 10
  private padNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  // Abre la ventana modal con información del trabajo seleccionado
  openModal(work: any) {
    this.selectedWork = work;
    this.isModalOpen = true;
  }

  // Cierra la ventana modal
  closeModal() {
    this.isModalOpen = false;
    this.selectedWork = null;
  }
}
