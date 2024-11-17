import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly PATH_OF_API = 'http://localhost:9090/api';
  private readonly requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(private httpclient: HttpClient) { }

  /**
   * @param registerData
   * @returns
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
   * @param roles
   * @returns 
   */
  public roleMatch(roles: string[]): boolean {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return roles.some(role => decodedToken.roles.includes(role));
    }
    return false;
  }

  /**
   * @returns
   */
  private getToken(): string | null {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  /**
   * @param token 
   * @returns 
   */
  private decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }

}
