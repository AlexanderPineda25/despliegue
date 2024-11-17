import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles = route.data['roles'];

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    if (Array.isArray(expectedRoles)) {
      if (!expectedRoles.some(role => this.authService.hasRole(role))) {
        this.showAccessDenied();
        return false;
      }
    } else if (typeof expectedRoles === 'string') {
      if (!this.authService.hasRole(expectedRoles)) {
        this.showAccessDenied();
        return false;
      }
    }

    return true;
  }

  private showAccessDenied(): void {
    Swal.fire({
      icon: 'error',
      title: 'Acceso Denegado',
      text: 'No tienes permisos para acceder a esta página.',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      this.router.navigate(['/']);
    });
  }
}
