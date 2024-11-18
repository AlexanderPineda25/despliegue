import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agenda } from '../_model/agenda.model';
import { AgendaCreateRequest } from '../_model/agendaCreateRequest.model';
import { User } from '../_model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private apiUrl = 'http://localhost:9090/api/agendas';

  constructor(private http: HttpClient) {}

  getUsersByRole(role: string): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:9090/api/users/role/${role}`);
  }  

  getAgendasByTeacher(teacherId: number, role: string): Observable<Agenda[]> {
    return this.http.get<Agenda[]>(`${this.apiUrl}/teacher/${teacherId}?role=${role}`);
  }
  

  getAgendasByStudent(studentId: number): Observable<Agenda[]> {
    return this.http.get<Agenda[]>(`${this.apiUrl}/student/${studentId}`);
  }

  getAgendasByDate(date: string): Observable<Agenda[]> {
    return this.http.get<Agenda[]>(`${this.apiUrl}/date?date=${date}`);
  }

  createAgenda(agenda: AgendaCreateRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}`, agenda);
  }  

  deleteAgenda(agendaId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${agendaId}`);
  }

  changeAgendaStatus(agendaId: number, status: string): Observable<void> {
    const params = { status }; // El parámetro "status" se envía en la consulta
    return this.http.patch<void>(`${this.apiUrl}/${agendaId}/status`, {}, { params });
  }
  
  
  
}
