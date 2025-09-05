// src/app/models/vendedor.dto.ts

import { UsuarioDto } from "./usuario.dto";

export interface VendedorDTO {
  id: number;
  nombre: string;
  correo: string;
  telefono: string;
  usuario: UsuarioDto;
}
