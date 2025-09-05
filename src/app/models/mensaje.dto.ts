
export interface MensajeDto<T> {
  error: boolean;
  mensaje: string;
  data: T;
}