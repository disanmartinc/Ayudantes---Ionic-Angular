import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrabajosService {
  private trabajosSubject = new BehaviorSubject<any[]>([
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
  ]);

  trabajos$ = this.trabajosSubject.asObservable();

  getTrabajos() {
    return this.trabajosSubject.value;
  }

  agregarTrabajo(trabajo: any) {
    const trabajosActuales = this.trabajosSubject.value;
    this.trabajosSubject.next([...trabajosActuales, trabajo]);
  }
}
