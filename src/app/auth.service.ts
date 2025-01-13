import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userRole: 'alumno' | 'administrativo' | null = null;

  constructor() {}

// Simula el inicio de sesión basado únicamente en el correo
login(email: string, password: string): boolean {
  if (email === 'alumno@duoc.cl') {
    this.userRole = 'alumno'; // Asigna el rol de alumno
    return true;
  } else if (email === 'adm@duoc.cl') {
    this.userRole = 'administrativo'; // Asigna el rol de administrativo
    return true;
  }

  console.error('Correo no reconocido'); // Mensaje de error para correos no válidos
  return false; // Si el correo no coincide, la autenticación falla
}
  // Devuelve el rol del usuario
  getUserRole(): 'alumno' | 'administrativo' | null {
    return this.userRole;
  }

  // Cierra sesión
  logout(): void {
    this.userRole = null;
  }
}
