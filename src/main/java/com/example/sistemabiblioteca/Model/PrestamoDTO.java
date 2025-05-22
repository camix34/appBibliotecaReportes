package com.example.sistemabiblioteca.Model;

import java.util.Date;

import com.example.sistemabiblioteca.persistence.entity.PrestamoEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PrestamoDTO {

  
    private Long idPrestamo;
    private Date fechaDevolucion;
    private Date fechaDevolucionReal;
    private boolean estaRetrasado;
    private boolean tieneMulta;
    private boolean penalizado;
    private String tituloMaterial;
    private Date fechaPrestamo;
    private double Monto;
    private int dias_retraso;
    private String nombreUsuario;

    public PrestamoDTO(PrestamoEntity prestamo, boolean tieneMulta, boolean penalizado,double monto, int dias_retraso, String nombreUsuario) {
        this.idPrestamo = prestamo.getId_Prestamo();
        this.fechaDevolucion = prestamo.getFecha_devolucion();
        this.fechaDevolucionReal = prestamo.getFechaDevolucionReal();
        this.tituloMaterial = prestamo.getMaterialEntity().getTitulo();
        this.fechaPrestamo = prestamo.getFecha_prestamo();
        this.Monto = monto;
        this.dias_retraso = dias_retraso;
        this.nombreUsuario = nombreUsuario;

        Date fechaComparacion = (fechaDevolucionReal != null) ? fechaDevolucionReal : new Date();
        this.estaRetrasado = fechaComparacion.after(fechaDevolucion);
        this.tieneMulta = tieneMulta;
        this.penalizado = penalizado;
    }
    
     
    }
    



