import { HttpClient } from '@angular/common/http'; // Importa HttpClient
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  user$: Observable<any | null> = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    this.userSubject.next(storedUser);
  }

  // Método para iniciar sesión
  login(correo: string, pass: string): Observable<any> {
    const url = 'http://localhost:3000/login'; // Reemplaza con tu URL de API
    return this.http.post(url, { correo, pass });
  }

  setUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  clearUser(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  getUserRole(): string | null {
    const currentUser = this.userSubject.value;
    return currentUser ? currentUser.role : null;
  }

  hasRole(role: string): boolean {
    return this.getUserRole() === role;
  }
}
