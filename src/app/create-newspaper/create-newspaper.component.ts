import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NewspaperService } from '../_services/newspaper.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-newspaper',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-newspaper.component.html',
  styleUrl: './create-newspaper.component.css'
})
export class CreateNewspaperComponent implements OnInit {

  formNewspaper: FormGroup;
  isSaveInProgress: boolean = false;
  edit: boolean = false;
  selectedImage: File | null = null;
  selectedFile: File | null = null;
  originalPublicationDate: string | null = null;

  constructor(
    private fb: FormBuilder,
    private newspaperService: NewspaperService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.formNewspaper = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      description: ['', Validators.required],
      publicationDate: [''], 
      image: [null],
      file:[null],
    });
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
  
    if (id && id !== 'new') {
      this.edit = true;
      this.getNewspaperById(+id);
    } else {
      this.edit = false; 
    }
  } 

  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  getNewspaperById(id: number) {
    this.newspaperService.getNewspaperById(id).subscribe({
      next: (foundNewspaper) => {
        this.formNewspaper.patchValue(foundNewspaper);
        this.originalPublicationDate = foundNewspaper.publicationDate;
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

  createNewspaper() {
    if (this.formNewspaper.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Revise los campos e intente nuevamente',
      });
      return;
    }
    if (!this.selectedImage || !this.selectedFile) {
      console.log("Imagen seleccionada:", this.selectedImage);
      console.log("Archivo PDF seleccionado:", this.selectedFile);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Seleccione tanto una imagen como un archivo',
      });
      return;
    }
    this.isSaveInProgress = true;
    this.newspaperService.createNewspaper(this.formNewspaper.value, this.selectedImage, this.selectedFile).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Guardado',
          text: 'Periodico guardado correctamente',
        });
        this.isSaveInProgress = false;
        this.router.navigateByUrl('/schoolNewspaper');
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
    this.selectedImage  = event.target.files[0];
    if (!this.selectedImage ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Seleccione una imagen e intente nuevamente',
      });
      return;
    }
    this.newspaperService.updateNewspaperImage(this.formNewspaper.value.id, this.selectedImage ).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Guardado',
          text: 'Periodico actualizado correctamente',
        });
        this.isSaveInProgress = false;
        this.router.navigateByUrl('/schoolNewspaper');
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

  updateNewspaper() {
    if (this.formNewspaper.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Revise los campos e intente nuevamente',
      });
      return;
    }
  
    // Si estamos en modo de edición y publicationDate está vacío, mantenemos el valor original
    if (this.edit && !this.formNewspaper.value.publicationDate) {
      this.formNewspaper.patchValue({ publicationDate: this.originalPublicationDate });
    }
  
    this.isSaveInProgress = true;
    this.newspaperService.updateNewspaper(this.formNewspaper.value).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Guardado',
          text: 'Periódico actualizado correctamente',
        });
        this.isSaveInProgress = false;
        this.router.navigateByUrl('/schoolNewspaper');
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
