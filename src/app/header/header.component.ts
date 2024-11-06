import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  private authSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn(); // Ahora `isLoggedIn$` es un Observable

  }

  public logout() {
    Swal.fire({
      title: '¿Realmente deseas cerrar sesión?',
      text: 'Se cerrará tu sesión actual',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        this.router.navigate(['/']); 
      }
    });
  }

  public isAdmin(): boolean {
    return this.userService.roleMatch(['Admin']);
  }

  public isUser(): boolean {
    return this.userService.roleMatch(['User']);
  }
}
