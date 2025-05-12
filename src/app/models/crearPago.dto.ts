// crearPago.dto.ts
import { OrdenVentaDTO } from "./ordenventa.dto";

export enum MetodoPago {
  TARJETA_BANCARIA = 'TARJETA_BANCARIA',
  REDCOMPRA = 'REDCOMPRA',
  EFECTIVO = 'EFECTIVO'
}

export interface CrearPagoDTO {
  ordenId: number;
  monto: number;
  metodoPago: MetodoPago; // Ahora usa el enum
}