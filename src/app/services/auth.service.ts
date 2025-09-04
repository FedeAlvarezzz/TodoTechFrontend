// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UsuarioDTO } from '../models/usuario.dto';
import { Observable, of, catchError, tap } from 'rxjs';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/usuarios';
  private usuarioActual: UsuarioDTO | null = null;
  private tiempoExpiracion = 1000 * 60 * 30; // ⏰ 30 minutos

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(username: string, password: string): Observable<UsuarioDTO | null> {
    return this.http.get<UsuarioDTO>(`${this.apiUrl}/login/${username}/${password}`).pipe(
      tap(usuario => {
        this.usuarioActual = usuario;

        const data = {
          usuario,
          exp: Date.now() + this.tiempoExpiracion
        };

        localStorage.setItem('usuario', JSON.stringify(data));
        this.redirigirPorRol(usuario.tipoUsuario);
      }),
      catchError(() => of(null))
    );
  }

  getUsuarioActual(): UsuarioDTO | null {
    const usuarioStr = localStorage.getItem('usuario');
    if (!usuarioStr) return null;

    const data = JSON.parse(usuarioStr);

    if (Date.now() > data.exp) {
      // ⏳ Sesión expirada
      this.logout();
      return null;
    }

    return data.usuario as UsuarioDTO;
  }

  logout(): void {
    this.usuarioActual = null;
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  redirigirPorRol(rol: UsuarioDTO['tipoUsuario']): void {
    switch (rol) {
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

    if (this.usuarioActual) {
      const usuarioService = new UsuarioService(this.http);
      usuarioService.setUsuario(this.usuarioActual);
    }
  }
}
