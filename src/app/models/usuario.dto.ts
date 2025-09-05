
export interface UsuarioDto {
  id: number;
  nombre: string;
  cedula: string;
  correo: string;
  telefono: string;
  nombreUsuario: string;
  contrasena: string;
  tipoUsuario: string;
  fechaCreacion: Date;
  estado: boolean;
}