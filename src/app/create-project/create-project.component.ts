import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../_services/project.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent implements OnInit {
  formProject: FormGroup;
  isSaveInProgress: boolean = false;
  edit: boolean = false;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.formProject = this.fb.group({
      id: [null],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      type: ['', Validators.required],
      image: [null]
    });
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
  
    if (id && id !== 'new') {
      this.edit = true;
      this.getProjectById(+id);
    } else {
      this.edit = false; 
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  getProjectById(id: number) {
    this.projectService.getProjectById(id).subscribe({
      next: (foundProject) => {
        this.formProject.patchValue(foundProject);
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No encontrado',
        });
        this.router.navigateByUrl('/');
      },
    });
  }

  createProject() {
    if (this.formProject.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Revise los campos e intente nuevamente',
      });
      return;
    }
    if (!this.selectedFile) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Seleccione una imagen e intente nuevamente',
      });
      return;
    }
    this.isSaveInProgress = true;
    this.projectService.createProject(this.formProject.value, this.selectedFile).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Guardado',
          text: 'Proyecto guardado correctamente',
        });
        this.isSaveInProgress = false;
        this.router.navigateByUrl('/projects');
      },
      error: () => {
        this.isSaveInProgress = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Revise los campos e intente nuevamente',
        });
      },
    });
  }

  changeImage(event: any) {
    this.selectedFile = event.target.files[0];
    if (!this.selectedFile) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Seleccione una imagen e intente nuevamente',
      });
      return;
    }
    this.projectService.updateProjectImage(this.formProject.value.id, this.selectedFile).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Guardado',
          text: 'Proyecto actualizado correctamente',
        });
        this.isSaveInProgress = false;
        this.router.navigateByUrl('/projects');
      },
      error: () => {
        this.isSaveInProgress = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Revise el archivo seleccionado',
        });
      },
    });
  }

  updateProject() {
    if (this.formProject.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Revise los campos e intente nuevamente',
      });
      return;
    }
    this.isSaveInProgress = true;
    this.projectService.updateProject(this.formProject.value).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Guardado',
          text: 'Proyecto actualizado correctamente',
        });
        this.isSaveInProgress = false;
        this.router.navigateByUrl('/projects');
      },
      error: () => {
        this.isSaveInProgress = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Revise los campos e intente nuevamente',
        });
      },
    });
  }

}
