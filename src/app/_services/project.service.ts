import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../_model/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = 'http://localhost:9090/api/project';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  createProject(project: Project, image: File): Observable<Project> {
    const formData = new FormData()
    formData.append('project', new Blob([JSON.stringify(project)], { type: 'application/json' }));
    formData.append('file', image)
    return this.http.post<Project>(this.apiUrl, formData);
  }

  updateProject(project: Project) {
    return this.http.put(this.apiUrl, project);
  }

  deleteProject(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateProjectImage(id: number, image: File): Observable<Project> {
    const formData = new FormData()
    formData.append('file', image)
    return this.http.put<Project>(`${this.apiUrl}/${id}/image`, formData);
  }

  getProjectsByType(type: string): Observable<Project[]> {
    const params = new HttpParams().set('type', type);
    return this.http.get<Project[]>(`${this.apiUrl}/type`, { params });
  }
}
