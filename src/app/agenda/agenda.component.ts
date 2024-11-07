import { Component, OnInit } from '@angular/core';
import { AgendaService } from '../_services/agenda.service';
import { Agenda } from '../_model/agenda.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css'
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

  constructor(private agendaService: AgendaService) { }

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

}
