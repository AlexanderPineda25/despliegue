import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../_model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:9090/api/product';
  constructor(private http: HttpClient) { }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Product, image: File): Observable<Product> {
    const formData = new FormData()
    formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
    formData.append('file', image)
    return this.http.post<Product>(this.apiUrl, formData);
  }

  updateProductImage(id: number, file: File): Observable<Product> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.put<Product>(`${this.apiUrl}/${id}/image`, formData);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.apiUrl, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
