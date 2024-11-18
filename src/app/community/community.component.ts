import { Component, OnInit } from '@angular/core';
import { Event } from '../_model/event.model';
import { EventService } from '../_services/event.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../_services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {
  events: Event[] = [];
  selectedEvent: Event | null = null;
  isEditing = false;

  constructor(
    private eventService: EventService,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe(data => this.events = data);
  }

  selectEvent(event: Event) {
    this.selectedEvent = { ...event }; 
    this.isEditing = true;
  }

  clearSelection() {
    this.selectedEvent = null;
    this.isEditing = false;
  }

  addNewEvent() {
    this.selectedEvent = {
      date: '',
      title: '',
      description: '',
      category: ''
    };
    this.isEditing = false;
  }

  onFormSubmit(event: SubmitEvent): void {
    event.preventDefault(); // Detiene el envío predeterminado del formulario
  
    if (
      !this.selectedEvent?.title ||
      !this.selectedEvent?.date ||
      !this.selectedEvent?.category ||
      !this.selectedEvent?.description
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Formulario incompleto',
        text: 'Por favor, completa todos los campos antes de guardar.',
        confirmButtonText: 'OK'
      });
      return; // Salir sin guardar
    }
  
    this.saveEvent(); // Llamar al método de guardar evento
  }
  
  

  saveEvent() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: this.isEditing ? '¿Quieres actualizar este evento?' : '¿Quieres crear este evento?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.isEditing && this.selectedEvent!.id) {
          // Actualizar evento existente
          this.eventService.updateEvent(this.selectedEvent!.id, this.selectedEvent!).subscribe(
            () => {
              this.loadEvents();
              this.clearSelection();
              Swal.fire({
                icon: 'success',
                title: 'Evento actualizado',
                text: 'El evento se ha actualizado correctamente.',
                confirmButtonText: 'OK'
              });
            },
            (error) => {
              Swal.fire({
                icon: 'error',
                title: 'Error al actualizar',
                text: 'Ocurrió un problema al actualizar el evento.',
                confirmButtonText: 'OK'
              });
              console.error(error);
            }
          );
        } else {
          // Crear un nuevo evento
          this.eventService.createEvent(this.selectedEvent!).subscribe(
            () => {
              this.loadEvents();
              this.clearSelection();
              Swal.fire({
                icon: 'success',
                title: 'Evento creado',
                text: 'El evento se ha creado correctamente.',
                confirmButtonText: 'OK'
              });
            },
            (error) => {
              Swal.fire({
                icon: 'error',
                title: 'Error al crear',
                text: 'Ocurrió un problema al crear el evento.',
                confirmButtonText: 'OK'
              });
              console.error(error);
            }
          );
        }
      }
    });
  }

  deleteEvent(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el evento de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eventService.deleteEvent(id).subscribe(
          () => {
            this.loadEvents();
            Swal.fire({
              icon: 'success',
              title: 'Evento eliminado',
              text: 'El evento se ha eliminado correctamente.',
              confirmButtonText: 'OK'
            });
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar',
              text: 'Ocurrió un problema al eliminar el evento.',
              confirmButtonText: 'OK'
            });
            console.error(error);
          }
        );
      }
    });
  }

  public isAdmin(): boolean {
    return this.userService.roleMatch(['ADMIN']);
  }

  public isUser(): boolean {
    return this.userService.roleMatch(['USER']);
  }
}
