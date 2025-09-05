// src/app/services/usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { UsuarioDto } from '../models/usuario.dto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl: string = 'http://localhost:8080/usuarios'; // Cambié la URL según tu endpoint
  private usuarioSubject = new BehaviorSubject<UsuarioDto | null>(null);

  constructor(private http: HttpClient) {}

  // Métodos para la API
  crearUsuario(usuarioDTO: UsuarioDto): Observable<{ mensaje: string }> {
    return this.http.post<{ mensaje: string }>(`${this.apiUrl}/crear`, usuarioDTO);
  }

  obtenerUltimoUsuario(): Observable<UsuarioDto> {
    return this.http.get<UsuarioDto>(`${this.apiUrl}/ultimo`);
  }
  
  obtenerUsuarios(): Observable<UsuarioDto[]> {
    return this.http.get<UsuarioDto[]>(this.apiUrl);
  }

  // Métodos para manipular el usuario actual (mejorados)
  setUsuario(usuario: UsuarioDto): void {
    this.usuarioSubject.next(usuario);
    
    // También guardar en localStorage para persistencia
    if (usuario) {
      localStorage.setItem('usuarioActual', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('usuarioActual');
    }
  }

  getUsuario(): UsuarioDto | null {
    // Primero intentar obtener del BehaviorSubject (más rápido)
    const currentUser = this.usuarioSubject.value;
    if (currentUser) {
      return currentUser;
    }
    
    // Si no hay en el subject, buscar en localStorage
    const usuarioStorage = localStorage.getItem('usuarioActual');
    if (usuarioStorage) {
      try {
        const usuario = JSON.parse(usuarioStorage) as UsuarioDto;
        this.usuarioSubject.next(usuario); // Sincronizar el subject
        return usuario;
      } catch (error) {
        console.error('Error parsing usuario from localStorage:', error);
        this.limpiarUsuario();
        return null;
      }
    }
    
    return null;
  }

  getUsuarioObservable(): Observable<UsuarioDto | null> {
    return this.usuarioSubject.asObservable();
  }

  limpiarUsuario(): void {
    this.usuarioSubject.next(null);
    localStorage.removeItem('usuarioActual');
  }

  // Método adicional para verificar si hay usuario logueado
  isUsuarioLogueado(): boolean {
    return this.getUsuario() !== null;
  }

  // Método para actualizar datos del usuario actual
  actualizarUsuario(usuario: UsuarioDto): void {
    const currentUser = this.getUsuario();
    if (currentUser && currentUser.id === usuario.id) {
      this.setUsuario(usuario);
    }
  }
}