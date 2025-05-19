import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { guardGuard } from './auth/guard.guard';
import { LayoutComponent } from './layout/layout.component';
import { AgregarUsuariosComponent } from './agregar-usuarios/agregar-usuarios.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { UsuarioDetallesComponent } from './usuario-detalles/usuario-detalles.component';
import { ActualizarUsuariosComponent } from './actualizar-usuarios/actualizar-usuarios.component';
import { CrearRolComponent } from './crear-rol/crear-rol.component';
import { AgregarUsuarioBiblioComponent } from './agregar-usuario-biblio/agregar-usuario-biblio.component';
import { ActualizarUsuarioBiblioComponent } from './actualizar-usuario-biblio/actualizar-usuario-biblio.component';
import { PerfilComponent } from './perfil/perfil.component';
import { adminGuard } from './guards/admin.guard';
import { DashboardUsuarioComponent } from './dashboard-usuario/dashboard-usuario.component';
import { ListaIdiomasComponent } from './lista-idiomas/lista-idiomas.component';
import { AgregarIdiomasComponent } from './agregar-idiomas/agregar-idiomas.component';
import { ActualizarIdiomasComponent } from './actualizar-idiomas/actualizar-idiomas.component';
import { IdiomaDetalleComponent } from './idioma-detalle/idioma-detalle.component';
import { ListaMaterialesComponent } from './lista-materiales/lista-materiales.component';
import { AgregarMaterialesComponent } from './agregar-materiales/agregar-materiales.component';
import { ActualizarMaterialesComponent } from './actualizar-materiales/actualizar-materiales.component';
import { MaterialDetalleComponent } from './material-detalle/material-detalle.component';
import { PrestarMaterialComponent } from './prestar-material/prestar-material.component';
import { DevolverPrestamoComponent } from './devolver-prestamo/devolver-prestamo.component';
import { MisPrestamosComponent } from './mis-prestamos/mis-prestamos.component';
import { PagarMultasComponent } from './pagar-multas/pagar-multas.component';
import { UsuariosMoraComponent } from './usuarios-mora/usuarios-mora.component';
import { RenovarCarnetComponent } from './renovar-carnet/renovar-carnet.component';
import { ListaCategoriasComponent } from './lista-categorias/lista-categorias.component';
import { AgregarCategoriasComponent } from './agregar-categorias/agregar-categorias.component';
import { ActualizarCategoriaComponent } from './actualizar-categoria/actualizar-categoria.component';
import { DetalleCategoriaComponent } from './detalle-categoria/detalle-categoria.component';
import { ReporteHistorialPrestamosComponent } from './reporte-historial-prestamos/reporte-historial-prestamos.component';
import { ReporteIngresosMoraComponent } from './reporte-ingresos-mora/reporte-ingresos-mora.component';
import { NotificacionComponent } from './notificacion/notificacion.component';
import { ReportePrestamosActivosComponent } from './reporte-prestamos-activos/reporte-prestamos-activos.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [guardGuard],
    children: [
      { path: 'home', component: HomeComponent, canActivate: [adminGuard] },
      { path: 'add_user', component: AgregarUsuariosComponent, canActivate: [adminGuard] },
      { path: 'list_users', component: ListaUsuariosComponent, canActivate: [adminGuard] },
      { path: 'details_user/:id', component: UsuarioDetallesComponent, canActivate: [adminGuard] },
      { path: 'update_user/:id', component: ActualizarUsuariosComponent, canActivate: [adminGuard] },
      { path: 'add_rol', component: CrearRolComponent, canActivate: [adminGuard] },
      { path: 'add_user_biblio', component: AgregarUsuarioBiblioComponent, canActivate: [adminGuard] },
      { path: 'update_user_biblio/:id', component: ActualizarUsuarioBiblioComponent, canActivate: [adminGuard] },
      { path: 'update_user_docente/:id', component: ActualizarUsuarioBiblioComponent, canActivate: [adminGuard] },
      { path: 'see_profile', component: PerfilComponent },
      { path: 'dashboard_user', component: DashboardUsuarioComponent },
      { path: 'list_idiomas', component: ListaIdiomasComponent, canActivate: [adminGuard] },
      { path: 'add_idioma', component: AgregarIdiomasComponent, canActivate: [adminGuard] },
      { path: 'update_idioma/:id', component: ActualizarIdiomasComponent, canActivate: [adminGuard] },
      { path: 'details_idioma/:id', component: IdiomaDetalleComponent, canActivate: [adminGuard] },
      { path: 'list_materiales', component: ListaMaterialesComponent, canActivate: [adminGuard] },
      { path: 'add_material', component: AgregarMaterialesComponent, canActivate: [adminGuard] },
      { path: 'update_material/:id', component: ActualizarMaterialesComponent, canActivate: [adminGuard] },
      { path: 'details_material/:id', component: MaterialDetalleComponent, canActivate: [adminGuard] },
      { path: 'list_materiales_prestar', component: PrestarMaterialComponent },
      { path: 'devolver_prestamo', component: DevolverPrestamoComponent },
      { path: 'mis_prestamos', component: MisPrestamosComponent },
      { path: 'pagar_multa', component: PagarMultasComponent },
      { path: 'usuarios_mora', component: UsuariosMoraComponent, canActivate: [adminGuard] },
      { path: 'renovar_carnet', component: RenovarCarnetComponent, canActivate: [adminGuard] },

      { path: 'list_categorias', component: ListaCategoriasComponent, canActivate: [adminGuard] },
      { path: 'add_categoria', component: AgregarCategoriasComponent, canActivate: [adminGuard] },
      { path: 'update_categoria/:id', component: ActualizarCategoriaComponent, canActivate: [adminGuard] },
      { path: 'details_categoria/:id', component: DetalleCategoriaComponent, canActivate: [adminGuard] },
      { path: 'historial_prestamos_devueltos', component: ReporteHistorialPrestamosComponent, canActivate: [adminGuard] },
      { path: 'historial_prestamos_activos', component: ReportePrestamosActivosComponent, canActivate: [adminGuard] },
      { path: 'Ingresos_por_mora', component: ReporteIngresosMoraComponent, canActivate: [adminGuard] },
      { path: 'notificacion_user',component:NotificacionComponent},
      

      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]

  },



  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' } // manejo de rutas no válidas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
