package com.example.sistemabiblioteca.Model;

import java.sql.Date;



import lombok.Getter;

import lombok.Setter;



@Getter
@Setter
public class PrestamoMultaDTO {

    
    private Long idPrestamo;
    private Date fechaDevolucion;
    private Date fechaDevolucionReal;
    private boolean estaRetrasado;
    private boolean tieneMulta;
    private boolean penalizado;

    // Getters y Setters

}
