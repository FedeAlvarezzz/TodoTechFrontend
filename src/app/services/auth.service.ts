// src/app/services/auth.service.ts (actualizado)
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, catchError, tap, map } from 'rxjs';

import { LoginResponse } from '../models/login-response.dto';
import { UsuarioService } from './usuario.service';
import { MensajeDto } from '../models/mensaje.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/usuarios';
  private tiempoExpiracion = 1000 * 60 * 30; // ⏰ 30 minutos

  constructor(
    private http: HttpClient,
    private router: Router,
    private usuarioService: UsuarioService // Inyectar UsuarioService
  ) {}

  login(nombreUsuario: string, contrasena: string): Observable<boolean> {
    const params = new HttpParams()
      .set('nombreUsuario', nombreUsuario)
      .set('contrasena', contrasena);

    return this.http.post<MensajeDto<LoginResponse>>(
      `${this.apiUrl}/login`, 
      null,
      { params }
    ).pipe(
      map(response => {
        if (response.error) {
          throw new Error(response.mensaje);
        }
        
        // Crear objeto UsuarioDto a partir de la respuesta
        const usuario = {
          id: 0,
          nombre: response.data.nombre,
          cedula: '',
          correo: '',
          telefono: '',
          nombreUsuario: response.data.nombreUsuario,
          contrasena: '',
          tipoUsuario: response.data.tipoUsuario,
          fechaCreacion: new Date(),
          estado: true
        };

        // Guardar en el servicio de usuario
        this.usuarioService.setUsuario(usuario);

        // Guardar en localStorage para persistencia
        const data = {
          usuario,
          exp: Date.now() + this.tiempoExpiracion
        };
        localStorage.setItem('usuario', JSON.stringify(data));

        this.redirigirPorRol(usuario.tipoUsuario);
        return true;
      }),
      catchError(error => {
        console.error('Error en login:', error);
        return of(false);
      })
    );
  }

  getUsuarioActual() {
    return this.usuarioService.getUsuario();
  }

  logout(): void {
    this.usuarioService.limpiarUsuario();
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  redirigirPorRol(tipoUsuario: string): void {
    switch (tipoUsuario) {
      case 'ADMIN':
        this.router.navigate(['/admin']);
        break;
      case 'VENDEDOR':
        this.router.navigate(['/ordenVenta']);
        break;
      case 'CAJERO':
        this.router.navigate(['/caja']);
        break;
      case 'DESPACHADOR':
        this.router.navigate(['/despacho']);
        break;
      default:
        this.router.navigate(['/']);
        break;
    }
  }

  isLoggedIn(): boolean {
    const usuarioStr = localStorage.getItem('usuario');
    if (!usuarioStr) return false;

    try {
      const data = JSON.parse(usuarioStr);
      return Date.now() <= data.exp;
    } catch {
      return false;
    }
  }
}