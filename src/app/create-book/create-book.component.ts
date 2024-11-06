import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../_services/book.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css'],
})
export class CreateBookComponent implements OnInit {
  formBook: FormGroup;
  isSaveInProgress: boolean = false;
  edit: boolean = false;
  selectedImage: File | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.formBook = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      author: ['', Validators.required],
      publicationDate: ['', Validators.required],
      description: ['', Validators.required],
      image: [null],
      file:[null],
    });
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
  
    if (id && id !== 'new') {
      this.edit = true;
      this.getBookById(+id);
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

  getBookById(id: number) {
    this.bookService.getBookById(id).subscribe({
      next: (foundBook) => {
        this.formBook.patchValue(foundBook);
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

  createBook() {
    if (this.formBook.invalid) {
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
    this.bookService.createBook(this.formBook.value, this.selectedImage, this.selectedFile).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Guardado',
          text: 'Libro guardado correctamente',
        });
        this.isSaveInProgress = false;
        this.router.navigateByUrl('/library');
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
    this.bookService.updateBookImage(this.formBook.value.id, this.selectedImage ).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Guardado',
          text: 'Libro actualizado correctamente',
        });
        this.isSaveInProgress = false;
        this.router.navigateByUrl('/library');
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

  updateBook() {
    if (this.formBook.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Revise los campos e intente nuevamente',
      });
      return;
    }
    this.isSaveInProgress = true;
    this.bookService.updateBook(this.formBook.value).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Guardado',
          text: 'Libro actualizado correctamente',
        });
        this.isSaveInProgress = false;
        this.router.navigateByUrl('/library');
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
