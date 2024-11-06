import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptor } from '../app/_auth/auth.interceptor';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, // Registro de AuthInterceptor
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(),
    provideRouter(routes), {
      provide: JwtModule,
      useFactory: () =>
        JwtModule.forRoot({
          config: {
            tokenGetter: tokenGetter,
            allowedDomains: ['localhost:9090'], // Cambia a tu dominio
            disallowedRoutes: ['localhost:9090'], // Rutas sin autenticación
          },
        }),
    },
  ]
};
