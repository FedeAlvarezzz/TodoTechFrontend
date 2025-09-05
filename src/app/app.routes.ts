import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { AdminComponent } from './pages/admin/admin.component';
import { PhoneComponent } from './pages/phone/phone.component';
import { GamingComponent } from './pages/gaming/gaming.component';
import { LaptopsComponent } from './pages/laptops/laptops.component';
import { AccesoriosComponent } from './pages/accesorios/accesorios.component';
import { OrdenVentaComponent } from './pages/orden-venta/orden-venta.component';
import { CajaComponent } from './pages/caja/caja.component';
import { DespachoComponent } from './pages/despacho/despacho.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
   { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirigir a login al inicio
   { path: 'login', component: LoginComponent },
   //{ path: 'inicio', component: InicioComponent , canActivate: [AuthGuard]},
   { path: 'admin', component: AdminComponent },
   { path: 'phone', component: PhoneComponent },
   { path: 'gaming', component: GamingComponent },
   { path: 'laptops', component: LaptopsComponent },
   { path: 'accesorios', component: AccesoriosComponent },
   { path: 'caja', component: CajaComponent },
   { path: 'despacho', component: DespachoComponent },
   //{ path: 'ordenVenta', component: OrdenVentaComponent, canActivate: [AuthGuard] },
   { path: 'ordenVenta', component: OrdenVentaComponent },
   

   { path: '**', redirectTo: 'login', pathMatch: 'full' } // Rutas no encontradas -> login
];
