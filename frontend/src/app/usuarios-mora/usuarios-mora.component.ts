import { Component, OnInit } from '@angular/core';
import { UsuariosMoraService } from '../services/usuarios-mora.service';
import { UsuariosMora } from '../dto/usuarios-mora';
import { MultaService } from '../services/multa.service';
import { MultaDto } from '../dto/multa-dto';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-usuarios-mora',
  standalone: false,
  templateUrl: './usuarios-mora.component.html',
  styleUrl: './usuarios-mora.component.css'
})





export class UsuariosMoraComponent implements OnInit{
    usuariosMora: UsuariosMora[] = [];
  usuariosMoraResumen: UsuarioMultaResumen[] = [];
  multa: MultaDto[] = [];
  mostrarModal: boolean = false;
  usuarioSeleccionado: UsuarioFactura | null = null;
 

  constructor(private usuariosMoraService: UsuariosMoraService, private usuarioMulta: MultaService) {}

  ngOnInit(): void {
   this.usuariosMoraService.getUsuariosMora().subscribe(data => {
    this.usuariosMora = data;

    const mapa = new Map<number, {
      idusuario: number;
      carnet: string;
      nombreCompleto: string;
      montoTotal: number;
      diasTotalesRetraso: number;
      materiales: Set<string>; // usamos Set para evitar duplicados
    }>();

    this.usuariosMora.forEach(item => {
      const usuario = item.multa.prestamo.usuario;
      const monto = item.multa.monto;
      const dias = item.multa.diasRetraso;
      const titulo = item.multa.prestamo.materialEntity.titulo;

      if (mapa.has(usuario.idusuario)) {
        const existente = mapa.get(usuario.idusuario)!;
        existente.montoTotal += monto;
        existente.diasTotalesRetraso += dias;
        existente.materiales.add(titulo); // agregamos material al set
      } else {
        mapa.set(usuario.idusuario, {
          idusuario: usuario.idusuario,
          carnet: usuario.carnet,
          nombreCompleto: `${usuario.nombre} ${usuario.apellido1}`,
          montoTotal: monto,
          diasTotalesRetraso: dias,
          materiales: new Set([titulo])
        });
      }
    });

    // Convertimos el set a string separado por comas
    this.usuariosMoraResumen = Array.from(mapa.values()).map(item => ({
      idusuario: item.idusuario,
      carnet: item.carnet,
      nombreCompleto: item.nombreCompleto,
      montoTotal: item.montoTotal,
      diasTotalesRetraso: item.diasTotalesRetraso,
      nombreMaterial: Array.from(item.materiales).join(', ')
    }));
  });
}

cargarMoras(){
   this.usuariosMoraService.getUsuariosMora().subscribe(data => {
    this.usuariosMora = data;

    const mapa = new Map<number, {
      idusuario: number;
      carnet: string;
      nombreCompleto: string;
      montoTotal: number;
      diasTotalesRetraso: number;
      materiales: Set<string>; // usamos Set para evitar duplicados
    }>();

    this.usuariosMora.forEach(item => {
      const usuario = item.multa.prestamo.usuario;
      const monto = item.multa.monto;
      const dias = item.multa.diasRetraso;
      const titulo = item.multa.prestamo.materialEntity.titulo;

      if (mapa.has(usuario.idusuario)) {
        const existente = mapa.get(usuario.idusuario)!;
        existente.montoTotal += monto;
        existente.diasTotalesRetraso += dias;
        existente.materiales.add(titulo); // agregamos material al set
      } else {
        mapa.set(usuario.idusuario, {
          idusuario: usuario.idusuario,
          carnet: usuario.carnet,
          nombreCompleto: `${usuario.nombre} ${usuario.apellido1}`,
          montoTotal: monto,
          diasTotalesRetraso: dias,
          materiales: new Set([titulo])
        });
      }
    });

    // Convertimos el set a string separado por comas
    this.usuariosMoraResumen = Array.from(mapa.values()).map(item => ({
      idusuario: item.idusuario,
      carnet: item.carnet,
      nombreCompleto: item.nombreCompleto,
      montoTotal: item.montoTotal,
      diasTotalesRetraso: item.diasTotalesRetraso,
      nombreMaterial: Array.from(item.materiales).join(', ')
    }));
  });
}
pagarMulta(idusuario: number){
    this.usuarioMulta.pagarPenalizacionMultas(idusuario).subscribe((data: MultaDto[]) => {
        this.multa = data;
      });
}



abrirModalQuitarPenalizacion(usuario: UsuarioMultaResumen) {
  this.usuarioSeleccionado = {
    idusuario: usuario.idusuario,
    carnet: usuario.carnet,
    nombre: usuario.nombreCompleto,
    monto: usuario.montoTotal,
    montoTotal: usuario.montoTotal
  };
  this.mostrarModal = true;
}

generarFactura() {
  if (this.usuarioSeleccionado) {
    const usuarioId = this.usuarioSeleccionado.idusuario;

    this.usuarioMulta.pagarPenalizacionMultas(usuarioId).subscribe({
      next: () => {
        this.crearPdfFactura(this.usuarioSeleccionado!);
        this.cancelarModal();
        // Refrescar tabla
        this.cargarMoras();
      },
      error: (err) => console.error('Error al pagar penalización:', err)
    });
  }
}

crearPdfFactura(usuario: UsuarioFactura) {
  const doc = new jsPDF();

  // Título
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text('Biblioteca Centroamericana', 105, 20, { align: 'center' });
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text('Factura de Pago de Multa Penalizada', 105, 30, { align: 'center' });

  // Línea separadora
  doc.line(10, 35, 200, 35);

  // Cuerpo de la factura
  doc.setFontSize(12);
  let y = 50;

  doc.text(`Nombre: ${usuario.nombre}`, 10, y);
  y += 10;
  doc.text(`Carnet: ${usuario.carnet}`, 10, y);
  y += 10;
  doc.text(`ID Usuario: ${usuario.idusuario}`, 10, y);
  y += 10;
  doc.text(`Fecha de Pago: ${new Date().toLocaleString()}`, 10, y);
  y += 10;
  doc.text(`Monto Pagado: $ ${usuario.montoTotal.toFixed(2)} doláres.`, 10, y);

  // Mensaje final
  y += 30;
  doc.text('Gracias por cumplir con sus obligaciones.', 10, y);
  y += 10;
  doc.text('Atentamente, Administración de Biblioteca', 10, y);

  // Guardar
  doc.save(`factura_${usuario.carnet}.pdf`);
}
cancelarModal() {
  this.mostrarModal = false;
  this.usuarioSeleccionado = null;
}
  
}

interface UsuarioMultaResumen {
  idusuario: number;
  carnet: string;
  nombreCompleto: string;
  montoTotal: number;
  diasTotalesRetraso: number;
  nombreMaterial: string;
}

interface UsuarioFactura {
  idusuario: number;
  carnet: string;
  nombre: string;
  monto: number;
  montoTotal: number;
}