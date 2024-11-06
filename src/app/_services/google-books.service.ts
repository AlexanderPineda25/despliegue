import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {

  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  searchBooks(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?q=${query}`);
  }
}
