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
  totalMora: number = 0;


  constructor(private ingrresosMoraServicio: IngresosMoraService, private route:Router) { 
    
  }

  ngOnInit(): void {

  this.obtenerIIngresosMora();
  }


  private obtenerIIngresosMora() {
    this.ingrresosMoraServicio.obtenerListaIngresosMora().subscribe(dato => { 
      this.ingresos =dato;
      this.calcularTotalMora();
    });
  }


    // calcular el total de ingresos por mora
  calcularTotalMora(): void {
    this.totalMora = this.ingresos.reduce((total, ingreso) => {
      return total + (Number(ingreso.monto) || 0);
    }, 0);
  }

  // Metodo para filtrar los ingresos por mora
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
      ingreso.monto?.toString().toLowerCase().includes(filtro)
    );
  }


 generarPDF(): void {
    const doc = new jsPDF();
    const datosFiltrados = this.ingresosFiltrados();
    const totalFiltrado = datosFiltrados.reduce((total, ingreso) => total + (Number(ingreso.monto) || 0), 0);

    // Titulo
    doc.setFontSize(18);
    doc.text('Reporte de Ingresos por Mora', 14, 15);
    
    // fecha de generación
    doc.setFontSize(10);
    doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 14, 22);

    // Datos para la tabla
    const columnas = ['ID', 'ID Usuario', 'Carnet', 'Nombre Usuario', 'Cantidad', 'Fecha de Pago'];
    const filas = datosFiltrados.map(ingreso => [
      ingreso.id_INGRESO?.toString() || '',
      ingreso.idusuario?.toString() || '',
      ingreso.carnet?.toString() || '',
      ingreso.nombreusuario?.toString() || '',
      `$${ingreso.monto !== undefined && ingreso.monto !== null ? Number(ingreso.monto).toFixed(2) : '0.00'}`,
      ingreso.fecha_PAGO?.toString() || ''
    ]);

    // Tabla
    autoTable(doc, {
      head: [columnas],
      body: filas,
      startY: 30,
      didDrawPage: (data) => {
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'bold');
        doc.text(`Total de ingresos por mora: $${totalFiltrado.toFixed(2)}`, 
                 data.settings.margin.left, 
                 doc.internal.pageSize.height - 10);
      }
    });

    // se guarda el PDF
    doc.save('reporte-ingresos-mora.pdf');
  }
}



