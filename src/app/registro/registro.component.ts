import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../services/registro/registro.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  standalone:true,
  imports:[IonicModule,FormsModule,HttpClientModule,CommonModule],
  
})
export class RegistroComponent  implements OnInit {
  rut: string = '';
  nombre: string = '';
  apellido_paterno: string = '';
  apellido_materno: string = '';
  correo: string = '';
  pass: string = '';
  tipousuario_id_tipo: number = 0;
  nomadmin: string = '';
  tiposUsuario: any[] = [];  
  constructor(private registroService:RegistroService,private http: HttpClient) { }
  
    
  ngOnInit() {
    this.cargarTiposUsuario();
  }
  
  cargarTiposUsuario() {
    this.registroService.obtenerTiposUsuario().subscribe(
      (data) => {
        this.tiposUsuario = data; // Guarda los tipos de usuario obtenidos del backend
      },
      (error) => {
        console.error('Error al cargar tipos de usuario:', error);
      }
    );
  }

  registrarUsuario() {
    const usuario = {
        rut: this.rut, // Asegúrate de que `this.rut` tenga el valor correcto
        nombre: this.nombre,
        apellido_paterno: this.apellido_paterno,
        apellido_materno: this.apellido_materno,
        correo: this.correo,
        pass: this.pass,
        tipousuario_id_tipo: this.tipousuario_id_tipo,
        nomadmin: ''
    };

    console.log('Datos enviados:', usuario); // Verifica que el valor de `rut` no sea null

    this.http.post('http://localhost:3000/registro', usuario).subscribe(
        (response) => {
            console.log('Usuario registrado:', response);
        },
        (error) => {
            console.error('Error al registrar usuario:', error);
        }
    );
}
  
}
