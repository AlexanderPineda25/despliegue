import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  showPassword: boolean = false;
  returnUrl: string = '/'; 

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute  
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || this.router.url;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  login(loginForm: NgForm) {
    if (loginForm.invalid) {
      Swal.fire({
        title: 'Formulario incompleto',
        text: 'Por favor, complete todos los campos requeridos.',
        icon: 'warning',
        confirmButtonText: 'Ok'
      });
      return;
    }

    this.authService.login(loginForm.value).subscribe(
      () => {
        const token = this.authService.getToken();  
        if (token) {
          Swal.fire({
            title: 'Inicio de sesión exitoso',
            text: 'Bienvenido al sistema.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.router.navigate(['/']);
            //this.router.navigateByUrl(this.returnUrl);
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo completar el inicio de sesión. Por favor, inténtalo nuevamente.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      },
      (error) => {
        if (error.status === 401) {
          Swal.fire({
            title: 'Error de autenticación',
            text: error.error.message || 'Credenciales incorrectas. Por favor, verifica tus datos.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error en el inicio de sesión. Inténtalo de nuevo más tarde.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      }
    );
  }

  registerUser() {
    this.router.navigate(['/register']);
  }
}
