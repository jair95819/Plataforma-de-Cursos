import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  constructor(private router: Router) {}

  logout() {
    // Aquí podrías limpiar el localStorage, tokens, etc.
    console.log('Cerrando sesión...');
    this.router.navigate(['/']);
  }
}