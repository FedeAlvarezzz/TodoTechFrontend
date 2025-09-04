export interface UsuarioDTO {
  id: number;
  nombre: string;
  cedula: string;
  correo: string;
  telefono: string;
  nombreUsuario: string;  // Cambiado de 'usuario' a 'nombreUsuario'
  contrasena: string;     // Cambiado de 'password' a 'contrasena'
  tipoUsuario: 'ADMIN' | 'VENDEDOR' | 'CAJERO' | 'DESPACHADOR'; // Valores actualizados
  fechaCreacion: Date;
  estado: boolean;
}