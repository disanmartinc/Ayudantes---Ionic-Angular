import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Trabajo {
  id: number;
  nombretrabajo: string;
  desctrabajo: string;
  ubicacion: string;
  id_creador: number;
  creador_nombre: string;
  creador_apellido: string;
}

@Injectable({
  providedIn: 'root',
})
export class TrabajosService {
  private apiUrl = 'http://localhost:3000/trabajos';

  constructor(private http: HttpClient) {}

  obtenerTrabajos(): Observable<Trabajo[]> {
    return this.http.get<Trabajo[]>(this.apiUrl);
  }
  // obtener trabajos realizados filtrados x id
  obtenerTrabajosRealizados(usuarioId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/usuario-trabajos/${usuarioId}`);
  }

}
