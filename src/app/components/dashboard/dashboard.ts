import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para *ngIf y *ngFor
import { FormsModule } from '@angular/forms';     // Necesario para [(ngModel)]
import { CourseService, Curso } from '../../services/curso-service'; // Asegúrate que la ruta sea correcta
import { NavbarComponent } from '../shared/navbar/navbar';
// import { NavbarComponent } from '../navbar/navbar.component'; // Descomenta si ya tienes tu Navbar creada

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent], // Agrega NavbarComponent aquí si lo tienes
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  
  // Variables ligadas al HTML
  searchQuery: string = '';
  courses: any[] = []; // Usamos 'any' aquí porque mapearemos los datos de Java al formato visual de tu HTML
  hasSearched: boolean = false;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    // Opcional: Cargar cursos destacados al iniciar
    this.cargarDestacados();
  }

  searchCourses(event?: any): void {
    // Si se presiona Enter, evitamos el comportamiento por defecto
    if (event) {
      event.preventDefault();
    }

    if (!this.searchQuery || this.searchQuery.trim() === '') {
      return;
    }

    this.hasSearched = true;
    
    // Llamada al servicio (Backend Spring Boot)
    this.courseService.getRecomendaciones(this.searchQuery).subscribe({
      next: (data: Curso[]) => {
        // CORRECCIÓN IMPORTANTE:
        // Validamos si 'data' existe. Si el backend devuelve null (204 No Content), 
        // asignamos un array vacío [] para evitar errores con .map
        if (data) {
          this.courses = data.map(curso => this.mapearCursoParaVista(curso));
        } else {
          this.courses = [];
        }
        console.log('Cursos encontrados:', this.courses);
      },
      error: (err) => {
        console.error('Error buscando cursos:', err);
        this.courses = [];
      }
    });
  }

  cargarDestacados() {
    this.courseService.getDestacados().subscribe({
      next: (data: Curso[]) => {
        // Misma protección aquí para los destacados
        if (data) {
          this.courses = data.map(curso => this.mapearCursoParaVista(curso));
        } else {
          this.courses = [];
        }
      },
      error: (err) => console.error(err)
    });
  }

  // Función auxiliar para traducir Backend -> Frontend
  private mapearCursoParaVista(curso: Curso): any {
    return {
      title: curso.titulo,
      description: curso.descripcion,
      url: curso.url,
      type: curso.tipo,      // Ej: "Matemáticas"
      duration: curso.duracion,
      level: curso.nivel,
      rating: curso.rating,
      students: curso.estudiantes,
      // Mapeo especial para Plataforma (ID -> Nombre)
      platform: this.obtenerNombrePlataforma(curso.plataformaId),
      // Imagen por defecto si viene vacía
      thumbnail: 'https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg' 
      // Nota: Si agregaste urlImagen al backend, usa: curso.urlImagen || 'imagen_por_defecto...'
    };
  }

  private obtenerNombrePlataforma(id: number): string {
    // Actualizado con tus IDs reales de la BD
    switch(id) {
      case 1: return 'Coursera';
      case 2: return 'edX';
      case 3: return 'Udemy';
      case 4: return 'Platzi';
      case 5: return 'LinkedIn Learning';
      case 6: return 'FreeCodeCamp';
      case 7: return 'Khan Academy';
      case 8: return 'Google Developers';
      case 9: return 'Harvard OpenCourseWare';
      case 10: return 'MIT OpenCourseWare';
      default: return 'Plataforma Externa';
    }
  }
}