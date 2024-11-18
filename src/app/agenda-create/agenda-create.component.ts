import { Component, OnInit } from '@angular/core';
import { AgendaService } from '../_services/agenda.service';
import { AgendaCreateRequest } from '../_model/agendaCreateRequest.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import { User } from '../_model/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agenda-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './agenda-create.component.html',
  styleUrl: './agenda-create.component.css'
})
export class AgendaCreateComponent implements OnInit {
  newAgenda: AgendaCreateRequest = {
    teacherId: null,
    studentId: null,
    parentName: '',
    contactInfo: '',
    meetingDate: '',
    startTime: '',
    endTime: ''
  };

  teachers: User[] = [];
  students: User[] = [];
  errorMessage: string | null = null;

  constructor(private agendaService: AgendaService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.agendaService.getUsersByRole('TEACHER').subscribe(
      (data) => {
        this.teachers = data;
        console.log('Profesores cargados:', this.teachers);
      },
      (error) => console.error('Error al cargar profesores:', error)
    );

    this.agendaService.getUsersByRole('STUDENT').subscribe(
      (data) => {
        this.students = data;
        console.log('Estudiantes cargados:', this.students);
      },
      (error) => console.error('Error al cargar estudiantes:', error)
    );
  }


  onTeacherChange(event: any): void {
    console.log('Profesor seleccionado:', this.newAgenda.teacherId, event.target.value);
  }

  onStudentChange(event: any): void {
    console.log('Estudiante seleccionado:', this.newAgenda.studentId, event.target.value);
  }

  createAgenda(): void {
    if (!this.newAgenda.teacherId || !this.newAgenda.studentId) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos obligatorios',
        text: 'Por favor, selecciona un profesor y un estudiante.',
        confirmButtonText: 'Entendido',
      });
      return;
    }

    console.log('Enviando agenda:', this.newAgenda);
    this.agendaService.createAgenda(this.newAgenda).subscribe(
      (data) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Agenda creada con éxito.',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          this.router.navigate(['/']); 
        });
        this.resetForm();
      },
      (error) => {
        console.error('Error al crear la agenda:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al crear la agenda. Por favor, inténtalo nuevamente.',
          confirmButtonText: 'Cerrar',
        });
      }
    );
  }

  resetForm(): void {
    this.newAgenda = {
      teacherId: null,
      studentId: null,
      parentName: '',
      contactInfo: '',
      meetingDate: '',
      startTime: '',
      endTime: ''
    };
    this.errorMessage = null;
  }

  isFormValid(): boolean {
    return (
      this.newAgenda.teacherId !== null &&
      this.newAgenda.studentId !== null &&
      this.newAgenda.parentName.trim().length > 0 &&
      this.newAgenda.meetingDate.trim().length > 0 &&
      this.newAgenda.startTime.trim().length > 0 &&
      this.newAgenda.endTime.trim().length > 0
    );
  }
}
