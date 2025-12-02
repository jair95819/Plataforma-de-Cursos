import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { DashboardComponent } from './components/dashboard/dashboard';
import { CourseDetailComponent } from './components/course-detail/course-detail';
import { CoursesComponent } from './components/courses/courses';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cursos', component: CoursesComponent },
  { path: 'curso/:id', component: CourseDetailComponent },
  { path: '**', redirectTo: '' }
];