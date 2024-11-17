import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:9090/api';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) { }

  private hasToken(): boolean {
    return typeof window !== 'undefined' && !!localStorage.getItem('authToken');
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response && response.accessToken) {
          localStorage.setItem('authToken', response.accessToken);
          this.loggedIn.next(true);
        } else {
          console.error("No se recibió ningún token en la respuesta.");
          this.loggedIn.next(false);
        }
      }),
      catchError((error) => {
        console.error("Error en la autenticación:", error);
        this.loggedIn.next(false);
        return of({ error: true, message: error.message || "Error de autenticación" });
      })
    );
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  hasRole(role: string): boolean {
    const token = this.getToken();
    if (!token) return false;
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken?.roles?.includes(role);
  }

  isAuthenticated(): boolean {
    return this.loggedIn.value;
  }

}
