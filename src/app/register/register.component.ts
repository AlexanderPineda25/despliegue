import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../_services/user.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {}

  showPassword: boolean = false;
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {}

  register(registerForm: NgForm) {
    if (!registerForm.valid) {
      if (registerForm.controls['userPassword']?.errors?.['minlength']) {
        Swal.fire({
          title: 'Error en la contraseña',
          text: 'La contraseña debe tener al menos 4 caracteres.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      } else {
        Swal.fire({
          title: 'Campos incompletos',
          text: 'Por favor, completa todos los campos requeridos.',
          icon: 'warning',
          confirmButtonText: 'Ok'
        });
      }
      return;
    }

    this.userService.register(registerForm.value).subscribe(
      (response) => {
        Swal.fire({
          title: 'Usuario registrado',
          text: `Se ha creado el usuario: ${registerForm.value.userName}`,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      (error) => {
        console.error('Error en el registro:', error);
        const errorMessage = error?.error?.message || 'Hubo un problema al registrar el usuario. Inténtalo de nuevo más tarde.';
        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }
}
