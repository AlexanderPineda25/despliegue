import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AccesibilityToggleComponent } from "./accesibility-toggle/accesibility-toggle.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ThemeSwitcherComponent, RouterModule, AccesibilityToggleComponent],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet> 
    <app-theme-switcher></app-theme-switcher>
    <app-accesibility-toggle></app-accesibility-toggle> 
    <app-footer></app-footer>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vanguardia';
}
