import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Importar HttpClient

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  nombre: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  onRegister() {
    if (this.nombre && this.email && this.password) {
      
      // Creamos el objeto tal cual lo espera tu clase Java 'Usuario'
      const usuarioBackend = {
        nombre: this.nombre,
        email: this.email,
        contrasenaHash: this.password // Java espera 'contrasenaHash', Angular tiene 'password'
      };

      // Hacemos la petición POST al backend
      this.http.post('http://localhost:8080/api/auth/registro', usuarioBackend)
        .subscribe({
          next: (response) => {
            console.log('Usuario registrado:', response);
            alert('¡Registro exitoso! Bienvenido a CursoFinder');
            this.router.navigate(['/login']); // Redirigir al login, no al dashboard directo
          },
          error: (error) => {
            console.error('Error:', error);
            alert('Error al registrar: ' + (error.error || 'Intenta nuevamente'));
          }
        });

    } else {
      alert('Por favor completa todos los campos');
    }
  }
}