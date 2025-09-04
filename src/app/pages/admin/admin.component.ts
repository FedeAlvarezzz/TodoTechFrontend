import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UsuarioDTO } from '../../models/usuario.dto';
import { UsuarioService } from '../../services/usuario.service';
import { PersonaDTO } from '../../models/persona.dto';
import { ProductoService } from '../../services/producto.service';
import { ProductoDTO } from '../../models/producto.dto';
import { CrearProductoDTO } from '../../models/crearProducto.dto';
import { OrdenVentaService } from '../../services/orden-venta.service';
import { OrdenVentaDTO } from '../../models/ordenventa.dto';
import { ReporteService } from '../../services/reporte.service';
import { ReporteRendimientoDTO } from '../../models/reporteRendimiento.dto';
import { VendedorService } from '../../services/vendedor.service';
import { DespachadorService } from '../../services/despachador.service';
import { CajeroService } from '../../services/cajero.service';
import { Router } from '@angular/router';
import { ProductoReporteRequest } from '../../models/productoReporteRequest.dto';

export interface CrearUsuarioDTO {
  nombre: string;
  cedula: string;
  correo: string;
  telefono: string;
  nombreUsuario: string;
  contrasena: string;
  tipoUsuario: 'ADMIN' | 'VENDEDOR' | 'CAJERO' | 'DESPACHADOR';
  estado?: boolean;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @ViewChild('formUsuario') formUsuario!: NgForm;
  
  nombre: string = '';
  correo: string = '';
  telefono: string = '';
  seccionActiva: string = 'bienvenida';

  usuarios: UsuarioDTO[] = [];
  productos: ProductoDTO[] = [];
  ordenes: OrdenVentaDTO[] = [];
  reportesPorVendedor: ReporteRendimientoDTO[] = [];
  productosReporte: ProductoReporteRequest[] = [];
  ordenesFiltradas: OrdenVentaDTO[] = [];
  terminoBusqueda: string = '';

  usuario: CrearUsuarioDTO = {
    nombre: '',
    cedula: '',
    correo: '',
    telefono: '',
    nombreUsuario: '',
    contrasena: '',
    tipoUsuario: 'VENDEDOR',
    estado: true
  };

  nuevoProducto: CrearProductoDTO = {
    id: 0,
    nombre: '',
    codigo: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    categoria: '',
    imagen: ''
  };

  constructor(
    private usuarioService: UsuarioService,
    private productoService: ProductoService,
    private ordenVentaService: OrdenVentaService,
    private reporteService: ReporteService,
    private vendedorService: VendedorService,
    private despachadorService: DespachadorService,
    private cajeroService: CajeroService,
    private router: Router
  ) {}

  ngOnInit() {}

  mostrarSeccion(seccion: string) {
    this.seccionActiva = seccion;
    switch (seccion) {
      case 'usuarios':
        this.cargarUsuarios();
        break;
      case 'productos':
        this.cargarProductos();
        break;
      case 'ordenes':
        this.cargarOrdenes();
        break;
      case 'reportes':
        this.cargarReportePorVendedor();
        break;
    }
  }

  cargarUsuarios() {}

  cargarProductos() {}

  cargarProductosReporte() {}

  cargarOrdenes() {}

  cargarReportePorVendedor() {}

  guardarProducto() {}

  filtrarOrdenes(tipo?: string) {}

  aplicarFiltroBusqueda() {}

  editarProducto(producto: ProductoDTO) {}

  eliminarProducto(producto: ProductoDTO) {}

  verDetallesProducto(producto: ProductoDTO) {}

  verDetallesOrden(orden: OrdenVentaDTO) {}

  guardarUsuario() {}

  limpiarFormulario() {}

  actualizarProducto() {}

  editarUsuario(usuario: UsuarioDTO) {}

  cambiarEstadoUsuario(usuario: UsuarioDTO) {}
}