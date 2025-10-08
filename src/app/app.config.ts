import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { provideAuth0, AuthHttpInterceptor } from '@auth0/auth0-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),

    // HTTP + Interceptor DI (requerido por Auth0 interceptor)
    provideHttpClient(withInterceptorsFromDi()),

    // Interceptor que agrega el Bearer automáticamente
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },

    // Config de Auth0 (login + token + audience)
    provideAuth0({
      domain: 'dev-hhfkytn67g38lwn6.us.auth0.com',         // ← ej. dev-xxxx.us.auth0.com
      clientId: 'XzRAfHImHeIDP9jVm35JSBgUHJuBQ6y6',    // ← tu Client ID de la SPA
      authorizationParams: {
        redirect_uri: window.location.origin,
        scope: 'openid profile email',
        audience: 'https://api.todotech',   // ← ej. https://api.todotech
      },
      httpInterceptor: {
        // A qué URLs adjuntar el access_token automáticamente
        allowedList: [
          {
            uri: 'http://localhost:8080/api/*',
            tokenOptions: {
              authorizationParams: { audience: 'AUTH0_AUDIENCE' }
            }
          }
        ]
      }
    }),
  ],
};
