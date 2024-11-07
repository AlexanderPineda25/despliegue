import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../_services/product.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnInit {
  formProduct: FormGroup;
  isSaveInProgress: boolean = false;
  edit: boolean = false;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.formProduct = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      price: ['', Validators.required],
      image: [null]
    });
  }
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.edit = true;
      this.getProductById(+id);
    } else {
      this.edit = false;
    }
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  getProductById(id: number) {
    this.productService.getProductById(id).subscribe({
      next: (foundProduct) => {
        this.formProduct.patchValue(foundProduct);
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
  createProduct() {
    if (this.formProduct.invalid) {
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
    this.productService.createProduct(this.formProduct.value, this.selectedFile).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Guardado',
          text: 'Proyecto guardado correctamente',
        });
        this.isSaveInProgress = false;
        this.router.navigateByUrl('/schoolMarket');
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
    this.productService.updateProductImage(this.formProduct.value.id, this.selectedFile).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Guardado',
          text: 'Proyecto actualizado correctamente',
        });
        this.isSaveInProgress = false;
        this.router.navigateByUrl('/schoolMarket');
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

  updateProduct() {
    if (this.formProduct.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Revise los campos e intente nuevamente',
      });
      return;
    }
    this.isSaveInProgress = true;
    this.productService.updateProduct(this.formProduct.value).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Guardado',
          text: 'Proyecto actualizado correctamente',
        });
        this.isSaveInProgress = false;
        this.router.navigateByUrl('/schoolMarket');
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
