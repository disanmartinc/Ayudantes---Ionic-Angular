import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  registrarUsuario(
    rut: string
    ,nombre: string
    ,apellido_paterno: string
    ,apellido_materno: string
    ,correo: string
    ,pass: string
    ,tipousuario_id_tipo: number
    ,nomadmin: string):
    Observable<any> {
      const usuario = { 
        nombre
        ,apellido_paterno
        ,apellido_materno
        ,correo,pass
        ,tipousuario_id_tipo
        ,nomadmin};
      return this.http.post(this.apiUrl,usuario);
    }
  // Método para obtener tipos de usuario
  obtenerTiposUsuario(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tipousuario`);
  }
}
