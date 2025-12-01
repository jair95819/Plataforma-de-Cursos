import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../shared/navbar/navbar';

interface Course {
  id: number;
  title: string;
  platform: string;
  description: string;
  thumbnail: string;
  url: string;
  type: string;
  duration: string;
  level: string;
  rating: string;
  students: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  searchQuery: string = '';
  courses: Course[] = [];
  hasSearched: boolean = false;

  // Datos de ejemplo (simulando una base de datos)
  allCourses: Course[] = [
    {
      id: 1,
      title: 'Cálculo Diferencial - Curso Completo',
      platform: 'Udemy',
      description: 'Aprende derivadas, límites e integrales desde cero con ejercicios prácticos',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
      url: 'https://www.udemy.com',
      type: '📹 Video Curso',
      duration: '12 horas',
      level: 'Principiante',
      rating: '4.8',
      students: '45,230'
    },
    {
      id: 2,
      title: 'Derivadas en 30 Minutos',
      platform: 'YouTube - Math2me',
      description: 'Tutorial rápido y efectivo sobre derivadas básicas y sus aplicaciones',
      thumbnail: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400',
      url: 'https://www.youtube.com',
      type: '🎥 Video',
      duration: '30 min',
      level: 'Intermedio',
      rating: '4.9',
      students: '125,500'
    },
    {
      id: 3,
      title: 'Bootcamp de Matemáticas Universitarias',
      platform: 'Platzi',
      description: 'Programa intensivo de matemáticas para aprobar con excelencia',
      thumbnail: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400',
      url: 'https://www.platzi.com',
      type: '🚀 Bootcamp',
      duration: '6 semanas',
      level: 'Avanzado',
      rating: '4.7',
      students: '8,420'
    },
    {
      id: 4,
      title: 'Programación en Python para Principiantes',
      platform: 'Coursera',
      description: 'Aprende Python desde cero con proyectos prácticos',
      thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400',
      url: 'https://www.coursera.org',
      type: '📹 Video Curso',
      duration: '20 horas',
      level: 'Principiante',
      rating: '4.6',
      students: '95,300'
    },
    {
      id: 5,
      title: 'Física - Cinemática y Dinámica',
      platform: 'Khan Academy',
      description: 'Entiende el movimiento y las fuerzas con ejemplos visuales',
      thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400',
      url: 'https://www.khanacademy.org',
      type: '📚 Curso',
      duration: '15 horas',
      level: 'Intermedio',
      rating: '4.8',
      students: '67,890'
    },
    {
      id: 6,
      title: 'Química Orgánica Explicada Fácil',
      platform: 'YouTube - Quimiayudas',
      description: 'Videos cortos sobre compuestos orgánicos y reacciones',
      thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400',
      url: 'https://www.youtube.com',
      type: '🎥 Video',
      duration: '45 min',
      level: 'Principiante',
      rating: '4.7',
      students: '52,100'
    }
  ];

  searchCourses(event?: any) {
    // Prevenir el salto de línea en el textarea al presionar Enter
    if (event) {
      event.preventDefault();
    }

    if (!this.searchQuery.trim()) return;

    this.hasSearched = true;

    // Simulación de búsqueda inteligente
    const query = this.searchQuery.toLowerCase();
    
    this.courses = this.allCourses.filter(course => 
      course.title.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query) ||
      course.platform.toLowerCase().includes(query) ||
      this.matchKeywords(query, course)
    );

    // Si no hay resultados exactos, mostrar cursos relacionados
    if (this.courses.length === 0) {
      this.courses = this.allCourses.slice(0, 3);
    }
  }

  matchKeywords(query: string, course: Course): boolean {
    // Palabras clave para matemáticas
    if ((query.includes('matemática') || query.includes('cálculo') || 
         query.includes('derivada') || query.includes('integral')) &&
        (course.title.toLowerCase().includes('cálculo') || 
         course.title.toLowerCase().includes('matemática'))) {
      return true;
    }

    // Palabras clave para programación
    if ((query.includes('programación') || query.includes('código') || 
         query.includes('python')) &&
        course.title.toLowerCase().includes('python')) {
      return true;
    }

    // Palabras clave para física
    if ((query.includes('física') || query.includes('cinemática')) &&
        course.title.toLowerCase().includes('física')) {
      return true;
    }

    return false;
  }
}