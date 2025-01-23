import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // Cambia según tu backend

  constructor(private http: HttpClient) {}

  login(correo: string, pass: string): Observable<any> {
    const credentials = { correo, pass };
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
}
