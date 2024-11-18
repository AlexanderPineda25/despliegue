import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccessibilityService {
  private highContrastClass = 'high-contrast';
  private lowContrastClass = 'low-contrast';
  private nightModeClass = 'night-mode';
  private targetElement = document.querySelector('main') || document.body;

  toggleHighContrast() {
    this.targetElement.classList.toggle(this.highContrastClass);
  }

  toggleLowContrast() {
    this.targetElement.classList.toggle(this.lowContrastClass);
  }

  toggleNightMode() {
    this.targetElement.classList.toggle(this.nightModeClass);
  }

  reset() {
    this.targetElement.classList.remove(this.highContrastClass, this.lowContrastClass, this.nightModeClass);
  }
}
