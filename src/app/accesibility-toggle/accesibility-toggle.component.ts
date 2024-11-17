import { Component } from '@angular/core';
import { AccessibilityService } from '../_services/accesibility.service';

@Component({
  selector: 'app-accesibility-toggle',
  standalone: true,
  imports: [],
  templateUrl: './accesibility-toggle.component.html',
  styleUrl: './accesibility-toggle.component.css'
})
export class AccesibilityToggleComponent {

  private isHighContrast = false;

  toggleContrast(): void {
    this.isHighContrast = !this.isHighContrast;
    if (this.isHighContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }
}
