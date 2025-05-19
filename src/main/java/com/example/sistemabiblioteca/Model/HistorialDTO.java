package com.example.sistemabiblioteca.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

import com.example.sistemabiblioteca.persistence.entity.HistorialEntity;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistorialDTO {
    private Long idHistorial;
    private Long idPrestamo;
    private Long idUsuario;
    private Long idMaterial;
    private String tituloMaterial;
    private LocalDate fechaPrestamo;
    private LocalDate fechaDevolucion;
    private LocalDate fechaRegistro;
    private String nombreUsuario;
    
    
    
    
    // Constructor que transforma la entidad a DTO
    public HistorialDTO(HistorialEntity historial, String nombreUsuario, String tituloMaterial) {
        this.idHistorial = historial.getIdHistorial();
        this.idPrestamo = historial.getPrestamo();
        this.idUsuario = historial.getIdUsuario();
        this.idMaterial = historial.getMaterial() != null ? historial.getMaterial().getId_material() : null;
        this.tituloMaterial = tituloMaterial;
        this.fechaPrestamo = historial.getFechaPrestamo();
        this.fechaDevolucion = historial.getFechaDevolucion();
        this.fechaRegistro = historial.getFechaRegistro();
        this.nombreUsuario = nombreUsuario;

    }
}