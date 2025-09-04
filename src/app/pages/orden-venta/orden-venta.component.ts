// src/app/components/orden-venta/orden-venta.component.ts
import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../../services/usuario.service';
import { OrdenVentaService } from '../../services/orden-venta.service';
import { Router } from '@angular/router';

import { ClienteDTO } from '../../models/cliente.dto';
import { UsuarioDTO } from '../../models/usuario.dto';
import { CrearOrdenDTO } from '../../models/CrearOrden.dto';
import { OrdenVentaDTO } from '../../models/ordenventa.dto';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orden-venta',
  templateUrl: './orden-venta.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./orden-venta.component.css']
})
export class OrdenVentaComponent implements OnInit, AfterViewInit {
  fechaHora: string = '';
  currentTheme: string = 'light';
  private hasSwapped: boolean = false;

  cliente: ClienteDTO = {
    nombre: '',
    correo: '',
    telefono: '',
    clave: ''
  };

  private crearOrdenUrl = 'http://localhost:8080/api/ordenes/crear';
  ordenes: OrdenVentaDTO[] = [];

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService,
    private ordenVentaService: OrdenVentaService,
    private router: Router,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.actualizarFechaHora();
    setInterval(() => this.actualizarFechaHora(), 1000);
    this.cargarOrdenes();
    
    // Cargar el tema guardado al inicializar el componente
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.setTheme(savedTheme);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initSmoothSwap();
    }, 500);
  }

  private initSmoothSwap(): void {
    const ordenVentaContainer = this.elementRef.nativeElement.querySelector('.orden-venta-container');
    
    if (ordenVentaContainer && !this.hasSwapped) {
      // Primero preparamos la animación
      ordenVentaContainer.classList.add('swap-init');
      
      // Luego ejecutamos la transición completa
      setTimeout(() => {
        ordenVentaContainer.classList.remove('swap-init');
        ordenVentaContainer.classList.add('swap-completed');
        this.hasSwapped = true;
        
        // Activamos efectos secundarios
        this.activateSecondaryEffects();
      }, 1200);
    }
  }

  private activateSecondaryEffects(): void {
    this.activateWaves();
    this.activateOrbitalDots();
  }

  private activateWaves(): void {
    const waveCircles = this.elementRef.nativeElement.querySelectorAll('.wave-circle');
    
    waveCircles.forEach((circle: HTMLElement, index: number) => {
      setTimeout(() => {
        circle.style.animationPlayState = 'running';
      }, index * 400);
    });
  }

  private activateOrbitalDots(): void {
    const dots = this.elementRef.nativeElement.querySelectorAll('.dot');
    const orbitContainer = this.elementRef.nativeElement.querySelector('.orbit-dots');
    
    if (orbitContainer) {
      orbitContainer.style.animationPlayState = 'running';
    }
    
    dots.forEach((dot: HTMLElement, index: number) => {
      setTimeout(() => {
        dot.style.animationPlayState = 'running';
      }, index * 200);
    });
  }

  setTheme(theme: string): void {
    this.currentTheme = theme;
    
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      console.log('Tema oscuro activado');
    } else {
      document.body.classList.remove('dark-theme');
      console.log('Tema claro activado');
    }
    
    // Guardar preferencia del tema
    localStorage.setItem('theme', theme);
  }

  cargarOrdenes() {
    this.ordenVentaService.obtenerOrdenes().subscribe({
      next: (data) => this.ordenes = data,
      error: (err) => {
        console.error('Error al obtener órdenes:', err);
        alert('Error al cargar las órdenes');
      }
    });
  }

  actualizarFechaHora(): void {
    const ahora = new Date();
    const opciones: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    this.fechaHora = ahora.toLocaleDateString('es-ES', opciones);
  }

  onSubmit(): void {
    const vendedor: UsuarioDTO | null = this.usuarioService.getUsuario();

    if (!vendedor || !vendedor.nombreUsuario) {
      alert('Error: no se encontró el usuario autenticado.');
      return;
    }

    const request: CrearOrdenDTO = {
      cliente: this.cliente,
      vendedor: vendedor.nombreUsuario
    };

    this.http.post<OrdenVentaDTO>(this.crearOrdenUrl, request).subscribe({
      next: (ordenCreada) => {
        console.log('Orden creada:', ordenCreada);

        // Guardar la orden en el servicio y en localStorage
        this.ordenVentaService.setOrden(ordenCreada);
        this.ordenVentaService.setOrdenIdEnLocalStorage(ordenCreada.id);

        // Redirigir
        this.router.navigate(['/inicio']);
      },
      error: (error) => {
        console.error('Error al crear la orden:', error);
        alert('Error al crear la orden');
      }
    });
  }
}