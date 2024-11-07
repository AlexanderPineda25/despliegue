import { Component, OnInit } from '@angular/core';
import { Event } from '../_model/event.model';
import { EventService } from '../_services/event.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe(data => this.events = data);
  }

  selectEvent(event: Event) {
    this.selectedEvent = { ...event }; // Cargar el evento seleccionado en el formulario
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

  saveEvent() {
    if (this.isEditing && this.selectedEvent?.id) {
      this.eventService.updateEvent(this.selectedEvent.id, this.selectedEvent).subscribe(() => {
        this.loadEvents();
        this.clearSelection();
      });
    } else if (this.selectedEvent) {
      this.eventService.createEvent(this.selectedEvent).subscribe(() => {
        this.loadEvents();
        this.clearSelection();
      });
    }
  }

  deleteEvent(id: number) {
    this.eventService.deleteEvent(id).subscribe(() => this.loadEvents());
  }
}
