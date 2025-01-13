import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service'; // Ajusta la ruta según tu proyecto
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, IonicModule, CommonModule], // Incluye ReactiveFormsModule aquí
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; // Declaramos loginForm

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService // Inyectamos el servicio AuthService
  ) {}

  ngOnInit() {
    // Inicializamos el formulario reactivo
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
  
      if (this.authService.login(email, password)) {
        const userRole = this.authService.getUserRole();
  
        if (userRole === 'alumno') {
          console.log('Redirigiendo al Home de Alumnos...');
          this.router.navigate(['/home-alumnos']); // Verifica que esta ruta esté correcta
        } else if (userRole === 'administrativo') {
          console.log('Redirigiendo al Home de Administrativos...');
          this.router.navigate(['/home-administrativos']);
        }
      } else {
        console.error('Correo no reconocido.');
        alert('Correo no reconocido. Por favor, intenta nuevamente.');
      }
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
  
}
