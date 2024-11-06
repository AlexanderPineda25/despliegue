import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Newspaper } from '../_model/newspaper.model';

@Injectable({
  providedIn: 'root'
})
export class NewspaperService {
  private apiUrl = 'http://localhost:9090/api/newspaper';

  constructor(private http: HttpClient) { }

  getNewspapers(): Observable<Newspaper[]> {
    return this.http.get<Newspaper[]>(this.apiUrl);
  }

  getNewspaperById(id: number): Observable<Newspaper> {
    return this.http.get<Newspaper>(`${this.apiUrl}/${id}`);
  }

  createNewspaper(newspaper: Newspaper, image:File, file:File): Observable<Newspaper> {
    const formData = new FormData()
    formData.append('newspaper', new Blob([JSON.stringify(newspaper)], { type: 'application/json' }));
    formData.append('image', image);
    formData.append('file', file);

    return this.http.post<Newspaper>(this.apiUrl, formData);
  }

  updateNewspaper(newspaper: Newspaper): Observable<Newspaper> {
    return this.http.put<Newspaper>(this.apiUrl, newspaper);
  }

  deleteNewspaper(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateNewspaperImage(id: number, image:File): Observable<Newspaper> {
    const formData = new FormData()
    formData.append('image', image)
    return this.http.put<Newspaper>(`${this.apiUrl}/${id}/image`,formData);
  }

  updateNewspaperFile(id: number, file:File): Observable<Newspaper>{
    const formData = new FormData()
    formData.append('file', file)
    return this.http.put<Newspaper>(`${this.apiUrl}/${id}/file`, formData);
  }

}
