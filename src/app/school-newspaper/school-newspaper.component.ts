import { Component, OnInit } from '@angular/core';
import { NewspaperService } from '../_services/newspaper.service';
import { Newspaper } from '../_model/newspaper.model';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-school-newspaper',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './school-newspaper.component.html',
  styleUrl: './school-newspaper.component.css'
})
export class SchoolNewspaperComponent implements OnInit {

  newspapers: Newspaper[] = [];
  isDeleteInProgress: boolean = false;

  constructor(private newspaperService: NewspaperService) {}

  ngOnInit(): void {
    this.getAllNewspapers();
  }

  trackById(index: number, newspaper: any): number {
    return newspaper.id;
  }

  getAllNewspapers() {
    this.newspaperService.getNewspapers().subscribe((data) => {
      this.newspapers = data;
    });
  }

  readOnline(url?: string): void {
    if (url) {
      window.open(url, '_blank');
    } else {
      console.error("El archivo PDF no está disponible.");
    }
  }
  
  deleteNewspaper(id: number) {
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
        this.newspaperService.deleteNewspaper(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El Periodico ha sido eliminado', 'success');
            this.isDeleteInProgress = false;
            this.getAllNewspapers();
          },
          error: () => {
            this.isDeleteInProgress = false;
            Swal.fire('Error', 'No se pudo eliminar el periodico', 'error');
          }
        });
      }
    });
  }

}
