import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Calendar } from '../_model/calendar.model';
import { CalendarService } from '../_services/calendar.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-academic-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './academic-calendar.component.html',
  styleUrl: './academic-calendar.component.css'
})
export class AcademicCalendarComponent implements OnInit {
  events: Calendar[] = [];
  selectedEvent: Calendar | null = null;
  isEditing: boolean = false;
  isAdmin: boolean = false;

  constructor(private CalendarService: CalendarService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.hasRole('ADMIN');
    this.loadEvents();
  }

  loadEvents(): void {
    this.CalendarService.getAllEvents().subscribe(data => this.events = data);
  }

  selectEvent(event: Calendar): void {
    this.selectedEvent = { ...event };
    this.isEditing = true;
  }

  clearSelection(): void {
    this.selectedEvent = null;
    this.isEditing = false;
  }

  addNewEvent(): void {
    this.selectedEvent = {
      activity: '',
      dateRange: ''
    };
    this.isEditing = false;
  }

  saveEvent(): void {
    if (this.isEditing && this.selectedEvent?.id) {
      this.CalendarService.updateEvent(this.selectedEvent.id, this.selectedEvent).subscribe(() => {
        this.loadEvents();
        this.clearSelection();
      });
    } else if (this.selectedEvent) {
      this.CalendarService.createEvent(this.selectedEvent).subscribe(() => {
        this.loadEvents();
        this.clearSelection();
      });
    }
  }

  deleteEvent(id: number): void {
    this.CalendarService.deleteEvent(id).subscribe(() => this.loadEvents());
  }

}
