import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../_services/project.service';
import { Project } from '../_model/project.model';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  projectType: string = '';
  isDeleteInProgress: boolean = false;
  isAdmin: boolean = false;

  constructor(private route: ActivatedRoute,
    private projectService: ProjectService, private authService: AuthService) { }

    ngOnInit(): void {
      this.isAdmin = this.authService.hasRole('ADMIN');
      this.route.paramMap.subscribe((params) => {
        this.projectType = params.get('type') || '';
        
        if (this.projectType) {
          this.loadProjectsByType(this.projectType);
        } else {
          this.getAllProjects();
        }
      });
    }

  loadProjectsByType(type: string): void {
    this.projectService.getProjectsByType(type).subscribe(
      (projects) => {
        this.projects = projects;
      },
      (error) => {
        console.error('Error al cargar proyectos por tipo:', error);
        this.projects = [];
      }
    );
  }

  trackById(index: number, book: any): number {
    return book.id;
  }

  getAllProjects() {
    this.projectService.getProjects().subscribe((data) => {
      this.projects = data;
    });
  }

  deleteProject(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isDeleteInProgress = true;
        this.projectService.deleteProject(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El proyecto ha sido eliminado', 'success');
            this.isDeleteInProgress = false;
            this.getAllProjects();
          },
          error: () => {
            this.isDeleteInProgress = false;
            Swal.fire('Error', 'No se pudo eliminar el proyecto', 'error');
          }
        });
      }
    });
  }
}
