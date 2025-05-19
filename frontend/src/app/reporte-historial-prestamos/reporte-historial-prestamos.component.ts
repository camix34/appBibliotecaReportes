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
 
  p: number = 1;  
  itemsPerPage: number = 10;
  HistorialPrestamos: Historial[];
pHistorialMasPrestamos: number = 1;  
itemsPerPageHistorialMasPrestamos: number = 10;
  constructor(private HistorialPrestamosService: HistorialService, private route: Router) {

  }

  ngOnInit(): void {

    this.obtenerMateriales();
    this.obtenerUsuarioMasPrestamos();
  }
  
  private obtenerMateriales() {
    this.HistorialPrestamosService.obtenerListaHistorial().subscribe(dato => {

      this.HistorialPrestamos = dato;

    });
  }

  HistorialPrestamoFiltrado(): Historial[] {
      if (!this.filtroBusqueda.trim()) {
        return this.HistorialPrestamos;  
      }
    
      const filtro = this.filtroBusqueda.toLowerCase();
    
      return this.HistorialPrestamos.filter(cate =>
        cate.idHistorial?.toString().toLowerCase().includes(filtro) ||
        cate.idPrestamo?.toString().toLowerCase().includes(filtro) ||
        cate.nombreUsuario?.toString().toLowerCase().includes(filtro)||
        cate.material?.titulo?.toString().toLowerCase().includes(filtro)||
        cate.fechaPrestamo?.toString().toLowerCase().includes(filtro)||
         cate.fechaDevolucion?.toString().toLowerCase().includes(filtro)||
         cate.fechaRegistro?.toString().toLowerCase().includes(filtro)
      
      );
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
    
    // Generar tabla
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
    
    // Guardar PDF
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
  // Crear nuevo documento PDF
  const doc = new jsPDF('landscape');

  // Título del reporte
  doc.setFontSize(18);
  doc.text('Historial del Usuario con Más Préstamos', 14, 20);

  // Fecha de generación
  doc.setFontSize(10);
  doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 14, 30);

  // Encabezados de la tabla
  const headers = [
    ['ID Historial', 'Carnet Usuario', 'Material', 'Fecha Préstamo', 'Fecha Vencimiento Devolución', 'Fecha Registro']
  ];

  // Datos del historial
  const data = this.historial.map(item => [
    item.idHistorial || '',
    item.nombreUsuario || '',
    item.tituloMaterial || '',
    item.fechaPrestamo ? new Date(item.fechaPrestamo).toLocaleDateString() : '',
    item.fechaDevolucion ? new Date(item.fechaDevolucion).toLocaleDateString() : '',
    item.fechaRegistro ? new Date(item.fechaRegistro).toLocaleDateString() : ''
  ]);

  // Generar tabla
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
      fillColor: [23, 162, 184], // Color azul Bootstrap
      textColor: 255,
      fontStyle: 'bold'
    }
  });

  // Guardar PDF
  doc.save('historial_usuario_mas_prestamos.pdf');

  // Alerta de éxito
  Swal.fire({
    title: 'PDF Generado',
    text: 'El historial del usuario con más préstamos fue exportado correctamente.',
    icon: 'success',
    confirmButtonText: 'Aceptar'
  });
}

}
