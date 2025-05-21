import { Component } from '@angular/core';
import { PrestamoService } from '../prestamo.service';
import { Router } from '@angular/router';
import { Prestamo } from '../prestamo';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-reporte-prestamos-activos',
  standalone: false,
  templateUrl: './reporte-prestamos-activos.component.html',
  styleUrl: './reporte-prestamos-activos.component.css'
})
export class ReportePrestamosActivosComponent {

  prestamo: Prestamo[];
  filtroBusqueda: string = '';
  filtroTipoFecha: string = '';
  filtroAnio: string = '';
  filtroMes: string = '';

  p: number = 1;
  itemsPerPage: number = 10;

  // Lista de meses para el selector
  mesesDisponibles: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Años disponibles (se calcularán automáticamente)
  aniosDisponibles: number[] = [];

  constructor(private prestamoServicio: PrestamoService, private route: Router) { }

  ngOnInit(): void {
    this.obtenerPretamosActivos();
  }

  private obtenerPretamosActivos() {
    this.prestamoServicio.obtenerListaPrestamosActivos().subscribe(dato => {
      this.prestamo = dato;
      this.calcularAniosDisponibles();
    });
  }

  // Calcular años disponibles a partir de los datos
  private calcularAniosDisponibles() {
    const aniosUnicos = new Set<number>();

    this.prestamo.forEach(item => {
      if (item.fecha_prestamo) {
        const fecha = new Date(item.fecha_prestamo);
        aniosUnicos.add(fecha.getFullYear());
      }

      if (item.fecha_devolucion) {
        const fecha = new Date(item.fecha_devolucion);
        aniosUnicos.add(fecha.getFullYear());
      }

      if (item.FECHA_DEVOLUCION_REAL) {
        const fecha = new Date(item.FECHA_DEVOLUCION_REAL);
        aniosUnicos.add(fecha.getFullYear());
      }
    });

    this.aniosDisponibles = Array.from(aniosUnicos).sort((a, b) => b - a); // Orden descendente
  }

  HistorialPrestamoFiltrado(): Prestamo[] {
    let filtrados = this.prestamo;

    // Aplicar filtro de búsqueda general
    if (this.filtroBusqueda.trim()) {
      const filtro = this.filtroBusqueda.toLowerCase();
      filtrados = filtrados.filter(cate =>
        cate.id_Prestamo?.toString().toLowerCase().includes(filtro) ||
        cate.id_usuario?.toString().toLowerCase().includes(filtro) ||
        cate.usuario.carnet?.toString().toLowerCase().includes(filtro) ||
        cate.materialEntity?.titulo?.toString().toLowerCase().includes(filtro) ||
        cate.fecha_prestamo?.toString().toLowerCase().includes(filtro) ||
        cate.fecha_devolucion?.toString().toLowerCase().includes(filtro) ||
        cate.FECHA_DEVOLUCION_REAL?.toString().toLowerCase().includes(filtro)
      );
    }

    // Aplicar filtros de fecha
    if (this.filtroAnio) {
      const anio = parseInt(this.filtroAnio);

      if (this.filtroMes) {
        const mes = parseInt(this.filtroMes) - 1; // Los meses en JavaScript son 0-11

        filtrados = filtrados.filter(item => {
          // Verificar en cualquiera de las fechas (prestamo, devolución o devolución real)
          const fechaPrestamo = item.fecha_prestamo ? new Date(item.fecha_prestamo) : null;
          const fechaDevolucion = item.fecha_devolucion ? new Date(item.fecha_devolucion) : null;
          const fechaDevolucionReal = item.FECHA_DEVOLUCION_REAL ? new Date(item.FECHA_DEVOLUCION_REAL) : null;

          return (
            (fechaPrestamo && fechaPrestamo.getFullYear() === anio && fechaPrestamo.getMonth() === mes) ||
            (fechaDevolucion && fechaDevolucion.getFullYear() === anio && fechaDevolucion.getMonth() === mes) ||
            (fechaDevolucionReal && fechaDevolucionReal.getFullYear() === anio && fechaDevolucionReal.getMonth() === mes)
          );
        });
      } else {
        // Solo filtro por año
        filtrados = filtrados.filter(item => {
          const fechaPrestamo = item.fecha_prestamo ? new Date(item.fecha_prestamo) : null;
          const fechaDevolucion = item.fecha_devolucion ? new Date(item.fecha_devolucion) : null;
          const fechaDevolucionReal = item.FECHA_DEVOLUCION_REAL ? new Date(item.FECHA_DEVOLUCION_REAL) : null;

          return (
            (fechaPrestamo && fechaPrestamo.getFullYear() === anio) ||
            (fechaDevolucion && fechaDevolucion.getFullYear() === anio) ||
            (fechaDevolucionReal && fechaDevolucionReal.getFullYear() === anio)
          );
        });
      }
    }

    return filtrados;
  }




  generarPDF(): void {
    // filtra los datos si hay una busqueda
    const datos = this.HistorialPrestamoFiltrado();

    // crear un nuevo documento PDF
    const doc = new jsPDF('landscape');

    // titulo del reporte
    doc.setFontSize(18);
    doc.text('Historial de Préstamos Devueltos', 14, 20);

    // fecha de generacion
    doc.setFontSize(10);
    doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 14, 30);

    // configurar tabla
    const headers = [
      ['ID prestamp', 'Usuario', 'Carnet', 'Título Material', 'Fecha Préstamo', 'Fecha Devolución', 'Fecha Registro']
    ];

    const data = datos.map(item => [
      item.id_Prestamo || '',
      item.id_usuario || '',
      item.usuario.carnet || '',
      item.materialEntity?.titulo || '',
      item.fecha_prestamo || '',
      item.fecha_devolucion || '',
      item.FECHA_DEVOLUCION_REAL || ''
    ]);

    // se genera la  tabla
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

    // se guarda el pdf
    doc.save('historial_prestamos_activos.pdf');

    Swal.fire({
      title: 'PDF Generado',
      text: 'El historial de préstamos activos se ha exportado correctamente a PDF.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }

  limpiarFiltros(): void {
  this.filtroBusqueda = '';
  this.filtroTipoFecha = '';
  this.filtroAnio = '';
  this.filtroMes = '';
}
}
