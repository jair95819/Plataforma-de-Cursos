import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService, Curso } from '../../services/curso-service';
import { NavbarComponent } from '../shared/navbar/navbar';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './courses.html',
  styleUrls: ['./courses.css']
})
export class CoursesComponent implements OnInit {
  
  courses: any[] = [];
  filteredCourses: any[] = [];
  isLoading: boolean = true;
  searchQuery: string = '';
  selectedLevel: string = '';
  selectedPlatform: string = '';
  
  // Niveles que coinciden con los del backend
  levels: string[] = ['Básico', 'Intermedio', 'Avanzado'];
  platforms: string[] = [
    'Coursera', 'edX', 'Udemy', 'Platzi', 'LinkedIn Learning',
    'FreeCodeCamp', 'Khan Academy', 'Google Developers', 
    'Harvard OpenCourseWare', 'MIT OpenCourseWare'
  ];
  
  // Imagen por defecto en base64 (carga instantánea)
  private defaultThumbnail: string = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMjAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMzIwIDIwMCI+PHJlY3Qgd2lkdGg9IjMyMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMxYTFhMmUiLz48Y2lyY2xlIGN4PSIxNjAiIGN5PSI4MCIgcj0iNDAiIGZpbGw9IiM2NjdlZWEiIG9wYWNpdHk9IjAuMyIvPjxwYXRoIGQ9Ik0xNDAgNzBsMzAgMjAtMzAgMjB6IiBmaWxsPSIjNjY3ZWVhIi8+PHRleHQgeD0iMTYwIiB5PSIxNTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2N2VlYSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Q3Vyc28gT25saW5lPC90ZXh0Pjwvc3ZnPg==';

  constructor(
    private courseService: CourseService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAllCourses();
  }

  loadAllCourses(): void {
    this.isLoading = true;
    
    // Cargamos todos los cursos
    this.courseService.getAllCursos().subscribe({
      next: (data: Curso[]) => {
        if (data) {
          this.courses = data.map(curso => this.mapearCursoParaVista(curso));
          this.filteredCourses = [...this.courses];
        }
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando cursos:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  searchCourses(): void {
    if (!this.searchQuery || this.searchQuery.trim() === '') {
      this.loadAllCourses();
      return;
    }

    this.isLoading = true;
    
    this.courseService.getRecomendaciones(this.searchQuery).subscribe({
      next: (data: Curso[]) => {
        if (data) {
          this.courses = data.map(curso => this.mapearCursoParaVista(curso));
          this.applyFilters();
        } else {
          this.courses = [];
          this.filteredCourses = [];
        }
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error buscando cursos:', err);
        this.courses = [];
        this.filteredCourses = [];
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  applyFilters(): void {
    this.filteredCourses = this.courses.filter(course => {
      const matchesLevel = !this.selectedLevel || course.level === this.selectedLevel;
      const matchesPlatform = !this.selectedPlatform || course.platform === this.selectedPlatform;
      return matchesLevel && matchesPlatform;
    });
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedLevel = '';
    this.selectedPlatform = '';
    this.loadAllCourses();
  }

  viewCourseDetail(courseId: number): void {
    this.router.navigate(['/curso', courseId]);
  }

  private mapearCursoParaVista(curso: Curso): any {
    return {
      id: curso.id,
      title: curso.titulo,
      description: curso.descripcion,
      url: curso.url,
      type: curso.tipo,
      duration: curso.duracion,
      level: curso.nivel,
      rating: curso.rating,
      students: curso.estudiantes,
      platform: this.obtenerNombrePlataforma(curso.plataformaId),
      thumbnail: this.defaultThumbnail
    };
  }

  private obtenerNombrePlataforma(id: number): string {
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
