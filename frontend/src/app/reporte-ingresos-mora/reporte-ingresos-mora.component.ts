import { Component } from '@angular/core';
import { IngresosMora } from '../ingresos-mora';
import { IngresosMoraService } from '../ingresos-mora.service';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-reporte-ingresos-mora',
  standalone: false,
  templateUrl: './reporte-ingresos-mora.component.html',
  styleUrl: './reporte-ingresos-mora.component.css'
})
export class ReporteIngresosMoraComponent {

  filtroBusqueda: string = '';
  p: number = 1;  
  itemsPerPage: number = 5;
  ingresos: IngresosMora[];


  constructor(private ingrresosMoraServicio: IngresosMoraService, private route:Router) { 
    
  }

  ngOnInit(): void {

  this.obtenerIIngresosMora();
  }


  private obtenerIIngresosMora() {
    this.ingrresosMoraServicio.obtenerListaIngresosMora().subscribe(dato => { 

      this.ingresos =dato;
    });


  }
  // Método para filtrar los ingresos por mora
  ingresosFiltrados(): IngresosMora[] {
    if (!this.filtroBusqueda.trim()) {
      return this.ingresos;
    }

    const filtro = this.filtroBusqueda.toLowerCase();

    return this.ingresos.filter(ingreso =>
      ingreso.id_INGRESO?.toString().toLowerCase().includes(filtro) ||
      ingreso.idusuario?.toString().toLowerCase().includes(filtro) ||
      ingreso.carnet?.toString().toLowerCase().includes(filtro) ||
      ingreso.nombreusuario?.toString().toLowerCase().includes(filtro) ||
       ingreso.fecha_PAGO?.toString().toLowerCase().includes(filtro) ||
        ingreso.monto?.toString().toLowerCase().includes(filtro) ||
      // Agrega aquí otros campos que quieras incluir en la búsqueda
      false
    );
  }


  generarPDF(): void {
  const doc = new jsPDF();

  // Título
  doc.setFontSize(18);
  doc.text('Reporte de Ingresos por Mora', 14, 15);

  // Datos para la tabla
  const columnas = ['ID', 'ID Usuario', 'Carnet', 'Nombre Usuario', 'Cantidad', 'Fecha de Pago'];
  const filas = this.ingresosFiltrados().map(ingreso => [
    ingreso.id_INGRESO !== undefined && ingreso.id_INGRESO !== null ? ingreso.id_INGRESO.toString() : '',
    ingreso.idusuario !== undefined && ingreso.idusuario !== null ? ingreso.idusuario.toString() : '',
    ingreso.carnet !== undefined && ingreso.carnet !== null ? ingreso.carnet.toString() : '',
    ingreso.nombreusuario !== undefined && ingreso.nombreusuario !== null ? ingreso.nombreusuario.toString() : '',
    ingreso.monto !== undefined && ingreso.monto !== null ? ingreso.monto.toString() : '',
    ingreso.fecha_PAGO !== undefined && ingreso.fecha_PAGO !== null ? ingreso.fecha_PAGO.toString() : ''
  ]);

  // Tabla
  autoTable(doc, {
    head: [columnas],
    body: filas,
    startY: 25,
  });

  // Guardar el PDF
  doc.save('reporte-ingresos-mora.pdf');
}
}



