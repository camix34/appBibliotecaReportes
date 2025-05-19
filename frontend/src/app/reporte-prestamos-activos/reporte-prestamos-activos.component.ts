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
  p: number = 1;  
  itemsPerPage: number = 10;


   constructor(private prestamoServicio: PrestamoService, private route:Router) { 
    
  }
  //cuando inicie 
   ngOnInit(): void {

  this.obtenerPretamosActivos();
  }

  // metodo para cargar categorias, llama al metodo obtenerListaCategoria en categoria service
  private obtenerPretamosActivos() {
    this.prestamoServicio.obtenerListaPrestamosActivos().subscribe(dato => { 

      this.prestamo =dato;
    });
  }


   HistorialPrestamoFiltrado(): Prestamo[] {
        if (!this.filtroBusqueda.trim()) {
          return this.prestamo;  
        }
      
        const filtro = this.filtroBusqueda.toLowerCase();
      
        return this.prestamo.filter(cate =>
          cate.id_Prestamo?.toString().toLowerCase().includes(filtro) ||
          cate.id_usuario?.toString().toLowerCase().includes(filtro) ||
          cate.usuario.carnet?.toString().toLowerCase().includes(filtro)||
          cate.materialEntity?.titulo?.toString().toLowerCase().includes(filtro)||
          cate.fecha_prestamo?.toString().toLowerCase().includes(filtro)||
           cate.fecha_devolucion?.toString().toLowerCase().includes(filtro)||
           cate.FECHA_DEVOLUCION_REAL?.toString().toLowerCase().includes(filtro)
        
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
            ['ID prestamp', 'Usuario', 'Carnet','Título Material', 'Fecha Préstamo', 'Fecha Devolución', 'Fecha Registro']
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
}
