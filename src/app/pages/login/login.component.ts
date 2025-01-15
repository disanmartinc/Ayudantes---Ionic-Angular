import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email } = this.loginForm.value;

      if (email === 'alumno@duoc.cl') {
        console.log('Redirigiendo al Home de Alumnos...');
        this.router.navigate(['/home-alumnos']);
      } else if (email === 'adm@duoc.cl') {
        console.log('Redirigiendo al Home de Administrativos...');
        this.router.navigate(['/home-administrativos']);
      } else {
        console.error('Correo no reconocido.');
        alert('Correo no reconocido. Por favor, intenta nuevamente.');
      }
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}
