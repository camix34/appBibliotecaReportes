import { Component } from '@angular/core';
import { Historial } from '../historial';
import { HistorialService } from '../historial.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-reporte-historial-prestamos',
  standalone: false,
  templateUrl: './reporte-historial-prestamos.component.html',
  styleUrl: './reporte-historial-prestamos.component.css'
})
export class ReporteHistorialPrestamosComponent {

  filtroBusqueda: string = '';
  filtroTipoFecha: string = '';
  filtroAnio: string = '';
  filtroMes: string = '';
  
  p: number = 1;  
  itemsPerPage: number = 10;
  HistorialPrestamos: Historial[];
  pHistorialMasPrestamos: number = 1;  
  itemsPerPageHistorialMasPrestamos: number = 10;
  
  // Lista de meses para el selector
  mesesDisponibles: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  // Años disponibles (se calcularán automáticamente)
  aniosDisponibles: number[] = [];
  
  constructor(private HistorialPrestamosService: HistorialService, private route: Router) {}

  ngOnInit(): void {
    this.obtenerMateriales();
    this.obtenerUsuarioMasPrestamos();
  }
  
  private obtenerMateriales() {
    this.HistorialPrestamosService.obtenerListaHistorial().subscribe(dato => {
      this.HistorialPrestamos = dato;
      this.calcularAniosDisponibles();
    });
  }
  
  // Calcular años disponibles a partir de los datos
  private calcularAniosDisponibles() {
    const aniosUnicos = new Set<number>();
    
    this.HistorialPrestamos.forEach(item => {
      if (item.fechaPrestamo) {
        const fecha = new Date(item.fechaPrestamo);
        aniosUnicos.add(fecha.getFullYear());
      }
      
      if (item.fechaDevolucion) {
        const fecha = new Date(item.fechaDevolucion);
        aniosUnicos.add(fecha.getFullYear());
      }
      
      if (item.fechaRegistro) {
        const fecha = new Date(item.fechaRegistro);
        aniosUnicos.add(fecha.getFullYear());
      }
    });
    
    this.aniosDisponibles = Array.from(aniosUnicos).sort((a, b) => b - a); // Orden descendente
  }
  
  HistorialPrestamoFiltrado(): Historial[] {
    let filtrados = this.HistorialPrestamos;
    
    // Aplicar filtro de búsqueda general
    if (this.filtroBusqueda.trim()) {
      const filtro = this.filtroBusqueda.toLowerCase();
      filtrados = filtrados.filter(cate =>
        cate.idHistorial?.toString().toLowerCase().includes(filtro) ||
        cate.idPrestamo?.toString().toLowerCase().includes(filtro) ||
        cate.nombreUsuario?.toString().toLowerCase().includes(filtro) ||
        cate.material?.titulo?.toString().toLowerCase().includes(filtro) ||
        cate.fechaPrestamo?.toString().toLowerCase().includes(filtro) ||
        cate.fechaDevolucion?.toString().toLowerCase().includes(filtro) ||
        cate.fechaRegistro?.toString().toLowerCase().includes(filtro)
      );
    }
    
    // Aplicar filtros de fecha
    if (this.filtroAnio) {
      const anio = parseInt(this.filtroAnio);
      
      if (this.filtroMes) {
        const mes = parseInt(this.filtroMes) - 1; // Los meses en JavaScript son 0-11
        
        filtrados = filtrados.filter(item => {
          // Verificar en cualquiera de las fechas (prestamo, devolución o registro)
          const fechaPrestamo = item.fechaPrestamo ? new Date(item.fechaPrestamo) : null;
          const fechaDevolucion = item.fechaDevolucion ? new Date(item.fechaDevolucion) : null;
          const fechaRegistro = item.fechaRegistro ? new Date(item.fechaRegistro) : null;
          
          return (
            (fechaPrestamo && fechaPrestamo.getFullYear() === anio && fechaPrestamo.getMonth() === mes) ||
            (fechaDevolucion && fechaDevolucion.getFullYear() === anio && fechaDevolucion.getMonth() === mes) ||
            (fechaRegistro && fechaRegistro.getFullYear() === anio && fechaRegistro.getMonth() === mes)
          );
        });
      } else {
        // Solo filtro por año
        filtrados = filtrados.filter(item => {
          const fechaPrestamo = item.fechaPrestamo ? new Date(item.fechaPrestamo) : null;
          const fechaDevolucion = item.fechaDevolucion ? new Date(item.fechaDevolucion) : null;
          const fechaRegistro = item.fechaRegistro ? new Date(item.fechaRegistro) : null;
          
          return (
            (fechaPrestamo && fechaPrestamo.getFullYear() === anio) ||
            (fechaDevolucion && fechaDevolucion.getFullYear() === anio) ||
            (fechaRegistro && fechaRegistro.getFullYear() === anio)
          );
        });
      }
    }
    
    return filtrados;
  }

          generarPDF(): void {
    // Filtrar datos si hay búsqueda
    const datos = this.HistorialPrestamoFiltrado();
    
    // crear nuevo documento PDF
    const doc = new jsPDF('landscape');
    
    // titulo del reporte
    doc.setFontSize(18);
    doc.text('Historial de Préstamos Devueltos', 14, 20);
    
    // fecha de generación
    doc.setFontSize(10);
    doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 14, 30);
    
    // configurar tabla
    const headers = [
      ['ID Historial', 'Usuario', 'ID Préstamo', 'Título Material', 'Fecha Préstamo', 'Fecha Devolución', 'Fecha Registro']
    ];
    
    const data = datos.map(item => [
      item.idHistorial || '',
      item.idUsuario || '',
      item.prestamo || '',
      item.material?.titulo || '',
      item.fechaPrestamo || '',
      item.fechaDevolucion || '',
      item.fechaRegistro || ''
    ]);
    
  
    autoTable(doc, {
      head: headers,
      body: data,
      startY: 40,
      theme: 'grid',
      styles: {
        fontSize: 8,
        cellPadding: 2,
        overflow: 'linebreak'
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      }
    });
    
    // se guarda el PDF
    doc.save('historial_prestamos.pdf');
    
    Swal.fire({
      title: 'PDF Generado',
      text: 'El historial de préstamos se ha exportado correctamente a PDF.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }


    historial: Historial[] = [];
  cargando: boolean = true;
  error: boolean = false;

  obtenerUsuarioMasPrestamos(){
  this.HistorialPrestamosService.obtenerHistorialDelUsuarioConMasPrestamos().subscribe({
      next: data => {
        this.historial = data;
        this.cargando = false;
      },
      error: err => {
        console.error('Error al obtener historial', err);
        this.error = true;
        this.cargando = false;
      }
    });
  }

//generar pdfs para el usuario con mas prestamos devueltos
  generarPDFUsuarioConMasPrestamos(): void {
  // crear nuevo documento PDF
  const doc = new jsPDF('landscape');

  // titulo del reporte
  doc.setFontSize(18);
  doc.text('Historial del Usuario con Más Préstamos', 14, 20);

  // fecha de generacion
  doc.setFontSize(10);
  doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 14, 30);


  const headers = [
    ['ID Historial', 'Carnet Usuario', 'Material', 'Fecha Préstamo', 'Fecha Vencimiento Devolución', 'Fecha Registro']
  ];

 
  const data = this.historial.map(item => [
    item.idHistorial || '',
    item.nombreUsuario || '',
    item.tituloMaterial || '',
    item.fechaPrestamo ? new Date(item.fechaPrestamo).toLocaleDateString() : '',
    item.fechaDevolucion ? new Date(item.fechaDevolucion).toLocaleDateString() : '',
    item.fechaRegistro ? new Date(item.fechaRegistro).toLocaleDateString() : ''
  ]);

  // se genera la tabla
  autoTable(doc, {
    head: headers,
    body: data,
    startY: 40,
    theme: 'grid',
    styles: {
      fontSize: 8,
      cellPadding: 2,
      overflow: 'linebreak'
    },
    headStyles: {
      fillColor: [23, 162, 184], 
      textColor: 255,
      fontStyle: 'bold'
    }
  });

  // se guardar PDF
  doc.save('historial_usuario_mas_prestamos.pdf');

 
  Swal.fire({
    title: 'PDF Generado',
    text: 'El historial del usuario con más préstamos fue exportado correctamente.',
    icon: 'success',
    confirmButtonText: 'Aceptar'
  });
}

//limpia los filtros de año y mes
limpiarFiltros(): void {
  this.filtroBusqueda = '';
  this.filtroTipoFecha = '';
  this.filtroAnio = '';
  this.filtroMes = '';
}

}
