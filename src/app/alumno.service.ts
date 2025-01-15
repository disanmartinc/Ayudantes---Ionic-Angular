import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlumnoService {
  private apiUrl = 'http://localhost:3000/registro'; // URL de la API

  constructor(private http: HttpClient) {}

  registrarAlumno(rut: string, nombre: string, edad: number,correo: string,pass: string,carrera: string): Observable<any> {
    const alumno = { rut, nombre, edad,correo,pass,carrera };
    return this.http.post(this.apiUrl, alumno);
  }
}
