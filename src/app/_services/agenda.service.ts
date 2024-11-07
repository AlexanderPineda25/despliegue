import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agenda } from '../_model/agenda.model';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private baseUrl = 'http://localhost:9090/api/agendas';

  constructor(private http: HttpClient) {}

  getAgendasByTeacherId(teacherId: number): Observable<Agenda[]> {
    return this.http.get<Agenda[]>(`${this.baseUrl}/teacher/${teacherId}`);
  }

  createAgenda(agenda: Agenda): Observable<Agenda> {
    return this.http.post<Agenda>(this.baseUrl, agenda);
  }

  deleteAgenda(agendaId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${agendaId}`);
  }
}
