import { Injectable } from '@angular/core';
import { Calendar } from '../_model/calendar.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private baseUrl = 'http://localhost:9090/api/calendar'; // URL del backend

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<Calendar[]> {
    return this.http.get<Calendar[]>(`${this.baseUrl}`);
  }

  getEventById(id: number): Observable<Calendar> {
    return this.http.get<Calendar>(`${this.baseUrl}/${id}`);
  }

  createEvent(event: Calendar): Observable<Calendar> {
    return this.http.post<Calendar>(`${this.baseUrl}`, event);
  }

  updateEvent(id: number, event: Calendar): Observable<Calendar> {
    return this.http.put<Calendar>(`${this.baseUrl}/${id}`, event);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
