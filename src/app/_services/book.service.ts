import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../_model/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:9090/api/book';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  createBook(book: Book, image:File, file:File): Observable<Book> {
    const formData = new FormData()
    formData.append('book', new Blob([JSON.stringify(book)], { type: 'application/json' }));
    formData.append('image', image);
    formData.append('file', file);

    return this.http.post<Book>(this.apiUrl, formData);
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(this.apiUrl, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateBookImage(id: number, image:File): Observable<Book> {
    const formData = new FormData()
    formData.append('image', image)
    return this.http.put<Book>(`${this.apiUrl}/${id}/image`,formData);
  }

  updateBookFile(id: number, file:File): Observable<Book>{
    const formData = new FormData()
    formData.append('file', file)
    return this.http.put<Book>(`${this.apiUrl}/${id}/file`, formData);
  }

}
