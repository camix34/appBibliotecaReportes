import { Component } from '@angular/core';
import { MultaService } from '../services/multa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagar-multas',
  standalone: false,
  templateUrl: './pagar-multas.component.html',
  styleUrl: './pagar-multas.component.css'
})
export class PagarMultasComponent {

 metodoPagoSeleccionado: string = '';

  tipoTarjetaCredito: string | null = null;
  tipoTarjetaDebito: string | null = null;
   idUsuario: number = Number(localStorage.getItem('idusuario'));

  constructor(
    private multaService:MultaService,
    private route:Router
  ){}
  
  seleccionarMetodo(metodo: string) {
    this.metodoPagoSeleccionado = metodo;
  }
  confirmarPago(): void {
    this.multaService.pagarMultas(this.idUsuario).subscribe({
      next: (res) => {
        alert('✅ Pago realizado y multas eliminadas.');
        
        this.irAlaLista();
      },
      error: (err) => {
        alert('❌ Error al pagar multas.');
        console.error(err);
      }
    });
  }

  irAlaLista(){
    this.route.navigate(['/devolver_prestamo']);
  }

  onNumeroTarjetaInput(event: any, tipo: 'credito' | 'debito' = 'credito') {
    const valor = event.target.value.replace(/\s+/g, '');

    // Visa empieza con 4
    if (/^4/.test(valor)) {
      if (tipo === 'credito') this.tipoTarjetaCredito = 'Visa';
      else this.tipoTarjetaDebito = 'Visa';
    }
    // Mastercard empieza con 51-55 o 2221-2720
    else if (/^(5[1-5]|2(2[2-9][1-9]|[3-6][0-9]{2}|7([01][0-9]|20)))\d{0,}$/.test(valor)) {
      if (tipo === 'credito') this.tipoTarjetaCredito = 'Mastercard';
      else this.tipoTarjetaDebito = 'Mastercard';
    } else {
      if (tipo === 'credito') this.tipoTarjetaCredito = null;
      else this.tipoTarjetaDebito = null;
    }
  }
}
