import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-school-market',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './school-market.component.html',
  styleUrl: './school-market.component.css'
})
export class SchoolMarketComponent implements OnInit {
  products: Product[] = [];
  isDeleteInProgress: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  trackById(index: number, book: any): number {
    return book.id;
  }

  getAllProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  deleteProduct(id: number) {
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
        this.productService.deleteProduct(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El proyecto ha sido eliminado', 'success');
            this.isDeleteInProgress = false;
            this.getAllProducts();
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
