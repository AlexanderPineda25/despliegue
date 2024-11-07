import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly PATH_OF_API = 'http://localhost:9090/api';

  private readonly requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(private httpclient: HttpClient) { }

  /**
  * @param registerData - Datos del usuario a registrar
   */
  public register(registerData: any): Observable<any> {
    return this.httpclient.post(`${this.PATH_OF_API}/register`, registerData).pipe(
      catchError((error) => {
        console.error('Error al registrar el usuario:', error);
        return throwError(error);
      })
    );
  }

  /**
   * @param allowedRoles - Lista de roles permitidos
   * @returns true si el usuario tiene al menos uno de los roles permitidos, false de lo contrario
   */
  public roleMatch(allowedRoles: string[]): boolean {
    const userRoles = JSON.parse(localStorage.getItem('userRoles') || '[]'); // Supone que los roles se almacenan en localStorage
    return userRoles.some((role: { roleName: string }) => allowedRoles.includes(role.roleName));
  }
}
