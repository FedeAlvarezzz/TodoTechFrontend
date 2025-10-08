// app.component.ts
import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  template: `
    <div style="padding:1rem">
      <button *ngIf="!(auth.isAuthenticated$ | async)" (click)="auth.loginWithRedirect()">
        Iniciar sesión
      </button>

      <button *ngIf="auth.isAuthenticated$ | async" (click)="auth.logout({ logoutParams: { returnTo: window.location.origin }})">
        Cerrar sesión
      </button>

      <div *ngIf="auth.user$ | async as user" style="margin-top:1rem">
        <strong>Login OK:</strong> {{ user.name }} ({{ user.email }})
      </div>
    </div>

    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(public auth: AuthService) {}
}
