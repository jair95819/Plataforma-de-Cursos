import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService, Curso } from '../../services/curso-service';
import { NavbarComponent } from '../shared/navbar/navbar';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './course-detail.html',
  styleUrls: ['./course-detail.css']
})
export class CourseDetailComponent implements OnInit {
  
  course: any = null;
  isLoading: boolean = true;
  error: string = '';
  relatedCourses: any[] = [];
  
  // Imagen por defecto en base64 (carga instantánea)
  private defaultThumbnail: string = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgODAwIDQwMCI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiMxYTFhMmUiLz48Y2lyY2xlIGN4PSI0MDAiIGN5PSIxODAiIHI9IjgwIiBmaWxsPSIjNjY3ZWVhIiBvcGFjaXR5PSIwLjMiLz48cGF0aCBkPSJNMzYwIDE1MGw4MCA1MC04MCA1MHoiIGZpbGw9IiM2NjdlZWEiLz48dGV4dCB4PSI0MDAiIHk9IjMwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjNjY3ZWVhIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5DdXJzbyBPbmxpbmU8L3RleHQ+PC9zdmc+';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const courseId = +params['id'];
      if (courseId) {
        this.loadCourse(courseId);
      }
    });
  }

  loadCourse(id: number): void {
    this.isLoading = true;
    this.error = '';
    
    this.courseService.getCursoById(id).subscribe({
      next: (curso: Curso) => {
        if (curso) {
          this.course = this.mapearCursoParaVista(curso);
          this.isLoading = false;
          this.cdr.detectChanges(); // Forzar actualización inmediata
          this.loadRelatedCourses(curso.tipo);
        } else {
          this.error = 'Curso no encontrado';
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.error('Error cargando curso:', err);
        this.error = 'Error al cargar el curso. Por favor, intenta de nuevo.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadRelatedCourses(tipo: string): void {
    this.courseService.getRecomendaciones(tipo).subscribe({
      next: (data: Curso[]) => {
        if (data) {
          // Filtramos el curso actual y tomamos solo 3 relacionados
          this.relatedCourses = data
            .filter(c => c.id !== this.course?.id)
            .slice(0, 3)
            .map(curso => this.mapearCursoParaVista(curso));
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.error('Error cargando cursos relacionados:', err)
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  viewCourse(courseId: number): void {
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
      platformId: curso.plataformaId,
      thumbnail: this.defaultThumbnail // Imagen SVG inline - carga instantánea
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

  getPlatformLogo(platformId: number): string {
    // Emojis en lugar de URLs externas para carga instantánea
    const logos: { [key: number]: string } = {
      1: '🎓', // Coursera
      2: '📚', // edX
      3: '🎯', // Udemy
      4: '🚀', // Platzi
      5: '💼', // LinkedIn Learning
      6: '💻', // FreeCodeCamp
      7: '🏫', // Khan Academy
      8: '🔧', // Google Developers
      9: '🏛️', // Harvard
      10: '🔬'  // MIT
    };
    return logos[platformId] || '📖';
  }

  getRatingStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < Math.round(rating) ? 1 : 0);
  }
}
