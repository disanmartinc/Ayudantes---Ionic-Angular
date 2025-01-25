import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define una interfaz para el trabajo
export interface Trabajo {
  nombretrabajo: string;
  desctrabajo: string;
  ubicacion: string;
  id_creador: number;
}

@Injectable({
  providedIn: 'root',
})
export class RegistrarTrabajoService {
  // Define la URL base y endpoint específico
  private apiUrl = 'http://localhost:3000/registrartrabajos';

  constructor(private http: HttpClient) {}

  // Método para registrar un trabajo
  registrarTrabajo(trabajo: Trabajo): Observable<any> {
    return this.http.post<any>(this.apiUrl, trabajo); // Tipa la respuesta si sabes el formato
  }
}
