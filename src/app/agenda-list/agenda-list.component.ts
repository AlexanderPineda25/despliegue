import { Component, OnInit } from '@angular/core';
import { AgendaService } from '../_services/agenda.service';
import { CommonModule } from '@angular/common';
import { Agenda } from '../_model/agenda.model';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../_services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agenda-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './agenda-list.component.html',
  styleUrls: ['./agenda-list.component.css']
})
export class AgendaListComponent implements OnInit {
  agendas: Agenda[] = [];
  selectedDate: string = '';
  teacherId: number = 4;

  constructor(private agendaService: AgendaService, private userService: UserService) {}

  ngOnInit(): void {
    this.loadAgendasByTeacher();
  }

  loadAgendasByTeacher(): void {
    if (this.isAdmin()) {
      this.agendaService.getAgendasByTeacher(0, 'ADMIN').subscribe(
        (data: Agenda[]) => this.handleAgendaResponse(data),
        (error) => this.handleAgendaError(error, 'Error al cargar todas las agendas.')
      );
    } else if (this.isTeacher() && this.teacherId) {
      this.agendaService.getAgendasByTeacher(this.teacherId, 'TEACHER').subscribe(
        (data: Agenda[]) => this.handleAgendaResponse(data),
        (error) => this.handleAgendaError(error, 'Error al cargar las agendas del profesor.')
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Rol desconocido o ID del profesor no válido.',
        confirmButtonText: 'Cerrar',
      });
    }
  }

  loadAgendasByDate(): void {
    if (!this.selectedDate) {
      Swal.fire({
        icon: 'warning',
        title: 'Fecha requerida',
        text: 'Por favor, selecciona una fecha para buscar agendas.',
        confirmButtonText: 'Entendido',
      });
      return;
    }

    this.agendaService.getAgendasByDate(this.selectedDate).subscribe(
      (data: Agenda[]) => this.handleAgendaResponse(data),
      (error) => this.handleAgendaError(error, 'Error al cargar las agendas por fecha.')
    );
  }

  deleteAgenda(agendaId: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Esta acción no se puede deshacer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.agendaService.deleteAgenda(agendaId).subscribe(
          () => {
            this.agendas = this.agendas.filter((agenda) => agenda.id !== agendaId);
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'La agenda ha sido eliminada con éxito.',
              confirmButtonText: 'Aceptar',
            });
          },
          (error) => {
            console.error('Error al eliminar la agenda:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar la agenda.',
              confirmButtonText: 'Cerrar',
            });
          }
        );
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Operación cancelada',
          text: 'La eliminación fue cancelada.',
          confirmButtonText: 'Cerrar',
        });
      }
    });
  }
  

  changeStatus(agendaId: number | undefined, status: string): void {
    if (!agendaId) {
      console.error('El ID de la agenda no es válido:', agendaId);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El ID de la agenda no es válido.',
        confirmButtonText: 'Cerrar',
      });
      return;
    }
  
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres cambiar el estado de la agenda a ${status}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Sí, cambiar a ${status}`,
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.agendaService.changeAgendaStatus(agendaId, status).subscribe(
          () => {
            this.loadAgendasByTeacher();
            Swal.fire({
              icon: 'success',
              title: 'Estado actualizado',
              text: `La agenda fue marcada como ${status}.`,
              confirmButtonText: 'Aceptar',
            });
          },
          (error) => {
            console.error('Error al cambiar el estado de la agenda:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo actualizar el estado de la agenda.',
              confirmButtonText: 'Cerrar',
            });
          }
        );
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Operación cancelada',
          text: 'El cambio de estado fue cancelado.',
          confirmButtonText: 'Cerrar',
        });
      }
    });
  }
  

  private handleAgendaResponse(data: Agenda[]): void {
    this.agendas = data;
    if (data.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Sin resultados',
        text: 'No se encontraron agendas.',
        confirmButtonText: 'Aceptar',
      });
    }
  }

  private handleAgendaError(error: any, message: string): void {
    console.error(message, error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      confirmButtonText: 'Cerrar',
    });
  }

  public isAdmin(): boolean {
    return this.userService.roleMatch(['ADMIN']);
  }

  public isTeacher(): boolean {
    return this.userService.roleMatch(['TEACHER']);
  }
}
