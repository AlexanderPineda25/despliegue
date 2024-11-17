import { Component, OnInit } from '@angular/core';
import { AgendaService } from '../_services/agenda.service';
import { Agenda } from '../_model/agenda.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  agendas: Agenda[] = [];

  newAgenda: Agenda = {
    teacherId: 1, 
    parentName: '',
    meetingDate: '',
    startTime: '',
    endTime: '',
    contactInfo: ''
  };

  constructor(private agendaService: AgendaService, private router: Router) { }

  ngOnInit(): void {
    this.loadAgendas();
  }

  loadAgendas(): void {
    const teacherId = 1; 
    this.agendaService.getAgendasByTeacherId(teacherId).subscribe((data) => {
      this.agendas = data;
    });
  }

  addAgenda(newAgenda: Agenda): void {
    this.agendaService.createAgenda(newAgenda).subscribe(() => {
      this.loadAgendas();
      this.showSuccessAlert(newAgenda);
      this.resetForm(); 
    });
  }

  deleteAgenda(id: number | undefined): void {
    if (id !== undefined) {
      this.agendaService.deleteAgenda(id).subscribe(() => {
        this.loadAgendas();
      });
    } else {
      console.error("El ID de la agenda es undefined y no se puede eliminar.");
    }
  }

  resetForm(): void {
    this.newAgenda = {
      teacherId: 1,
      parentName: '',
      meetingDate: '',
      startTime: '',
      endTime: '',
      contactInfo: ''
    };
  }

  showSuccessAlert(agenda: Agenda): void {
    Swal.fire({
      icon: 'success',
      title: 'Cita Agendada Correctamente',
      text: `La cita ha sido agendada con el profesor ID ${agenda.teacherId} el ${agenda.meetingDate} a las ${agenda.startTime}.`,
      confirmButtonText: 'Aceptar'
    }).then(() => {
      this.router.navigate(['/']);
    });
  }
}
