import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  nombre: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onRegister() {
    if (this.nombre && this.email && this.password) {
      console.log('Registro:', this.nombre, this.email);
      alert('¡Registro exitoso! Bienvenido a CursoFinder');
      this.router.navigate(['/dashboard']);
    } else {
      alert('Por favor completa todos los campos');
    }
  }
}