import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RestapiService } from './restapi.service';
import { HttpClientModule } from '@angular/common/http';
import { MatOptionModule } from '@angular/material/core'; 
import { LayoutComponent } from './layout/layout.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AgregarUsuariosComponent } from './agregar-usuarios/agregar-usuarios.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { ActualizarUsuariosComponent } from './actualizar-usuarios/actualizar-usuarios.component';
import { UsuarioDetallesComponent } from './usuario-detalles/usuario-detalles.component';
import { CrearRolComponent } from './crear-rol/crear-rol.component';
import { AgregarUsuarioBiblioComponent } from './agregar-usuario-biblio/agregar-usuario-biblio.component';
import { ActualizarUsuarioBiblioComponent } from './actualizar-usuario-biblio/actualizar-usuario-biblio.component';
import { PerfilComponent } from './perfil/perfil.component';
import { DashboardUsuarioComponent } from './dashboard-usuario/dashboard-usuario.component';
import { ListaIdiomasComponent } from './lista-idiomas/lista-idiomas.component';
import { AgregarIdiomasComponent } from './agregar-idiomas/agregar-idiomas.component';
import { ActualizarIdiomasComponent } from './actualizar-idiomas/actualizar-idiomas.component';
import { IdiomaDetalleComponent } from './idioma-detalle/idioma-detalle.component';
import { ListaMaterialesComponent } from './lista-materiales/lista-materiales.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AgregarMaterialesComponent } from './agregar-materiales/agregar-materiales.component';
import { ActualizarMaterialesComponent } from './actualizar-materiales/actualizar-materiales.component';
import { MaterialDetalleComponent } from './material-detalle/material-detalle.component';
import { PrestarMaterialComponent } from './prestar-material/prestar-material.component';
import { DevolverPrestamoComponent } from './devolver-prestamo/devolver-prestamo.component';
import { MisPrestamosComponent } from './mis-prestamos/mis-prestamos.component';
import { PagarMultasComponent } from './pagar-multas/pagar-multas.component';
import { UsuariosMoraComponent } from './usuarios-mora/usuarios-mora.component';
import { RenovarCarnetComponent } from './renovar-carnet/renovar-carnet.component';
import { AgregarCategoriasComponent } from './agregar-categorias/agregar-categorias.component';
import { ListaCategoriasComponent } from './lista-categorias/lista-categorias.component';
import { ActualizarCategoriaComponent } from './actualizar-categoria/actualizar-categoria.component';
import { DetalleCategoriaComponent } from './detalle-categoria/detalle-categoria.component';
import { ReporteHistorialPrestamosComponent } from './reporte-historial-prestamos/reporte-historial-prestamos.component';
import { ReporteIngresosMoraComponent } from './reporte-ingresos-mora/reporte-ingresos-mora.component';
import { NotificacionComponent } from './notificacion/notificacion.component';
import { ReportePrestamosActivosComponent } from './reporte-prestamos-activos/reporte-prestamos-activos.component';
import { AprobarSolicitudesComponent } from './aprobar-solicitudes/aprobar-solicitudes.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LayoutComponent,
    AgregarUsuariosComponent,
    ListaUsuariosComponent,
    ActualizarUsuariosComponent,
    UsuarioDetallesComponent,
    CrearRolComponent,
    AgregarUsuarioBiblioComponent,
    ActualizarUsuarioBiblioComponent,
    PerfilComponent,
    DashboardUsuarioComponent,
    ListaIdiomasComponent,
    AgregarIdiomasComponent,
    ActualizarIdiomasComponent,
    IdiomaDetalleComponent,
    ListaMaterialesComponent,
    AgregarMaterialesComponent,
    ActualizarMaterialesComponent,
    MaterialDetalleComponent,
    PrestarMaterialComponent,
    DevolverPrestamoComponent,
    MisPrestamosComponent,
    PagarMultasComponent,
    UsuariosMoraComponent,
    RenovarCarnetComponent,
    AgregarCategoriasComponent,
    ListaCategoriasComponent,
    ActualizarCategoriaComponent,
    DetalleCategoriaComponent,
    ReporteHistorialPrestamosComponent,
    ReporteIngresosMoraComponent,
    NotificacionComponent,
    ReportePrestamosActivosComponent,
    AprobarSolicitudesComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
   ReactiveFormsModule,
   NgxPaginationModule,
  ],
  providers: [RestapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
