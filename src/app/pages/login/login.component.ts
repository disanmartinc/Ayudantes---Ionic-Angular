import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service'; // Importa el servicio de autenticación

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, IonicModule, CommonModule],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService // Inyecta el servicio de autenticación
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
  
      this.authService.login(email, password).subscribe(
        (response) => {
          console.log('Inicio de sesión exitoso:', response);
  
          // Guarda el usuario en localStorage
          localStorage.setItem('user', JSON.stringify(response.user));
  
          // Redirige según el campo tipousuario_id_tipo
          if (response.user.tipousuario_id_tipo === 1) {
            this.router.navigate(['/home-alumnos']);
          } else if (response.user.tipousuario_id_tipo === 2) {
            this.router.navigate(['/home-administrativos']);
          } else {
            alert('Tipo de usuario no reconocido');
          }
        },
        (error) => {
          console.error('Error al iniciar sesión:', error);
          alert('Correo o contraseña incorrectos. Por favor, intenta nuevamente.');
        }
      );
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  


}
